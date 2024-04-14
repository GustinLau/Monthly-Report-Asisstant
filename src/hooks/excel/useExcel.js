import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import { groupBy, last, round } from 'lodash'
import { $t } from '@/locales'

const Excel = require('exceljs')
const JSZip = require('jszip')

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)

export function useExcel() {

  const COLUMNS = {
    id: 'ID',
    owner: '指派给',
    taskType: '任务类型',
    title: '标题',
    status: '状况',
    startTime: '实际开始时间',
    endTime: '实际结束时间',
    predictWork: 'PM预估工作量',
    finishWork: '已完成工作'
  }

  const STYLE = {
    FONT: {
      name: '宋体', color: { argb: 'FF000000' }, size: 10
    }, ALIGMENT: {
      MC: { vertical: 'middle', horizontal: 'center', wrapText: false },
      ML: { vertical: 'middle', horizontal: 'left', wrapText: false }
    }, BORDER: {
      top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
    }
  }

  // 字段验证
  function verify(worksheet) {
    if (worksheet) {
      const data = worksheet._rows
      if (data.length >= 1) {
        const worksheetsColumn = data[0].values
        return Object.keys(COLUMNS).every(k => worksheetsColumn.includes(COLUMNS[k]))
      }
    }
    return false
  }

  function readExcel(filePath) {
    return new Promise(async (resolve, reject) => {
      const workbook = new Excel.Workbook()
      const worksheet = await workbook.csv.readFile(filePath)
      if (verify(worksheet)) {
        const rows = worksheet._rows
        const worksheetsColumn = rows[0].values
        const columnIndex = {}
        Object.keys(COLUMNS).forEach(k => {
          columnIndex[k] = worksheetsColumn.indexOf(COLUMNS[k])
        })
        // 组装数据
        const list = []
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].values
          const item = {}
          Object.keys(columnIndex).forEach(k => {
            const value = row[columnIndex[k]]
            if (k === 'startTime' || k === 'endTime') {
              item[k] = dayjs(value, 'YYYY/M/D Ah:mm:ss', 'zh-cn').toDate()
            } else if (k === 'owner') {
              const data = row[columnIndex[k]]
              item.owner = data.replace(/<(\w|\\)+>/, '').trim()
              item.ownerId = data.replace(/^\W+\s<PICCAD\\(\d+)>/, '$1')
            } else {
              item[k] = row[columnIndex[k]]
            }
          })
          if (item.owner) {
            list.push(item)
          }
        }

        // 获取涉及的月份
        const monthList = Object.keys(groupBy(list, (item) => dayjs(item.startTime).format('YYYY-MM'))).sort((a, b) => a.localeCompare(b))

        // 分析记录
        const analyses = []
        for (let i = 0; i < monthList.length; i++) {
          const analysis = {}
          analysis.month = monthList[i]
          analysis.data = []
          const maxDate = dayjs(`${analysis.month}-01`).endOf('month')
          const minDate = dayjs(`${analysis.month}-01`).startOf('month')
          const targetItems = list.filter(item => dayjs(item.startTime).isBetween(minDate, maxDate, null, '[]'))
          const targetGroups = groupBy(targetItems, 'ownerId')
          Object.keys(targetGroups).forEach(group => {
            const taskList = targetGroups[group]
            const data = {}
            data.user = {
              id: taskList[0].ownerId, name: taskList[0].owner
            }
            data.items = taskList.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
            data.totalFinishWork = round(data.items.reduce((total, item) => total + item.finishWork, 0), 2)
            data.totalPredictWork = round(data.items.reduce((total, item) => total + item.predictWork, 0), 2)
            analysis.data.push(data)
          })
          analysis.data.sort((a, b) => a.user.id.localeCompare(b.user.id))
          analyses.push(analysis)
        }
        resolve(analyses)
      } else {
        reject($t('error.incorrect_content'))
      }
    })
  }

  // 每月星期分组
  function weekGroups(year, month) {
    const weeks = []
    let week = []
    const lastDate = dayjs(`${year}-${month}-01`).endOf('month').date()
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month - 1, i)
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0) {
        week[6] = date
        weeks.push(week)
        week = []
      } else {
        week[dayOfWeek - 1] = date
        if (i === lastDate) {
          weeks.push(week)
        }
      }
    }
    return weeks
  }

  function exportBuffer(project, analyses) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = []
        for (const analysis of analyses) {
          const result = {}
          const [year, month] = analysis.month.split('-')
          result.month = analysis.month
          result.excels = []
          const weeks = weekGroups(+year, +month)
          for (let i = 0; i < weeks.length; i++) {
            const days = weeks[i].filter(w => w)
            let weekItems = []
            analysis.data.forEach($data => {
              const user = $data.user
              const weekUserItems = $data.items
                .filter(item => {
                  return dayjs(item.startTime).isSameOrAfter(dayjs(days[0])) && dayjs(item.endTime).isSameOrBefore(dayjs(last(days)).endOf('day'))
                })
                .map(item => {
                  return [project.id, project.name, '合作厂商', user.id, user.name, item.taskType, item.id, item.title, item.status, dayjs(item.startTime).add(dayjs().utcOffset(), 'minute').toDate(), dayjs(item.endTime).add(dayjs().utcOffset(), 'minute').toDate(), item.predictWork, item.finishWork, '']
                })
              weekItems = weekItems.concat(weekUserItems)
            })
            const startDate = dayjs(days[0]).format('YYYY年MM月DD日')
            const endDate = dayjs(last(days)).format('YYYY年MM月DD日')
            const fileName = `${project.id}-${project.name}-${startDate}-${endDate} - 开发.xlsx`

            const workbook = new Excel.Workbook()
            const worksheet = workbook.addWorksheet('工时记录')
            worksheet.columns = [{ key: 'projectId', width: 10 },// 系统编号
              { key: 'projectName', width: 24 },// 系统名称
              { key: 'userType', width: 10 },// 人员类型
              { key: 'userId', width: 15 }, // 人员编号
              { key: 'userName', width: 10 }, // 人员姓名
              { key: 'taskType', width: 16 }, // 任务类型
              { key: 'taskId', width: 15 },// 任务编号
              { key: 'taskDesc', width: 24 }, // 任务描述
              { key: 'taskStatus', width: 10 }, // 任务状态
              { key: 'startDate', width: 12 }, // 开始日期
              { key: 'endDate', width: 12 }, // 结束日期
              { key: 'planTime', width: 10 }, // 计划工时
              { key: 'actualTime', width: 10 }, // 实际工时
              { key: 'remark', width: 6 } // 备注
            ]
            const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
            worksheet.addRow(['系统编号', '系统名称', '人员类型', '人员编号', '人员姓名', '任务类型', '任务编号', '任务描述', '任务状态', '开始日期', '结束日期', '计划工时', '实际工时', '备注'])
            cols.forEach((col) => {
              const cell = worksheet.getCell(`${col}1`)
              cell.font = { ...STYLE.FONT, bold: true }
              cell.alignment = STYLE.ALIGMENT.MC
              cell.border = STYLE.BORDER
            })
            weekItems.forEach((item, i) => {
              worksheet.addRow(item)
              cols.forEach((col) => {
                const cell = worksheet.getCell(`${col}${i + 2}`)
                cell.font = STYLE.FONT
                cell.alignment = ['F', 'H'].includes(col) ? STYLE.ALIGMENT.ML : STYLE.ALIGMENT.MC
                cell.border = STYLE.BORDER
              })
            })
            result.excels.push({
              fileName, buffer: await workbook.xlsx.writeBuffer()
            })
          }
          data.push(result)
        }
        const zip = new JSZip()
        data.forEach((item) => {
          const folder = zip.folder(item.month)
          item.excels.forEach((item) => {
            folder.file(item.fileName, item.buffer)
          })
        })
        const month = analyses.map(a => a.month).join(`、`)
        const buffer = await zip.generateAsync({ type: 'nodebuffer' })
        resolve({
          name: `${project.id}-${project.name}周报（${month}）.zip`,
          buffer
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  return { readExcel, exportBuffer }
}