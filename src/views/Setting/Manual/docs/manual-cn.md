<h1 style='text-align: center'>月报小助手操作手册</h1> 

## 导出数据文档

1. 查询需要生成文档的数据

<document-image name="query" :common="true" max-width="100%"></document-image>

2. 设置导出列

<document-image name="column" :common="true"></document-image>

3. 导出数据

<document-image name="export-btn" :common="true"></document-image>

## 配置项目

使用前需要先配置项目，点击左下角<carbon-settings></carbon-settings>按钮，选择`系统设置`菜单进入设置页面。

<document-image name="setting"></document-image>

点击项目配置右侧<carbon-arrow-right></carbon-arrow-right>进入项目配置页面。

<document-image name="project-config"></document-image>

点击右上角<el-button size="small" type="success">新增</el-button>打开新增弹窗添加项目。

<document-image name="create-project"></document-image>

填写相关项目信息后点击<el-button size="small" type="primary">确认</el-button>。

<document-image name="project-list"></document-image>

新增后项目会显示在项目列表中。

若需编辑或删除项目，点击右侧 <el-button link type="primary" size="small">编辑</el-button>或<el-button link type="danger"
size="small">删除</el-button>即可。

## 数据处理

在程序首页点击项目信息框

<p style="user-select: none">
    <el-alert type="error" :closable='false'>
        <carbon-close-filled style="color: var(--el-color-error)"></carbon-close-filled>
        <span style='margin-left: 8px'>未配置项目</span>
    </el-alert>
    <span style="padding: 0 4px">或</span>
    <el-alert type="success" :closable='false'>
        <carbon-checkmark-filled style="color: var(--el-color-success)"></carbon-checkmark-filled>
        <span style='margin-left: 8px'>XXX项目</span>
    </el-alert>
</p>

后会弹出项目选择框，可以选择已配置的项目。

<document-image name="project-select"></document-image>

选择完后点击或将数据文档拖拽到上传框中即可处理相关项目数据。
 <div class='upload-container'>
    <el-upload drag :disabled='true' :show-file-list='false'>
        <carbon-cloud-upload style='font-size: 64px;color: var(--el-color-primary)'></carbon-cloud-upload>
        <div class='el-upload__text'>
            点击或将文件拖拽到此区域进行上传
        </div>
        <div class='el-upload__text_sub'>
            仅支持 csv 文件
        </div>
    </el-upload>
</div>

数据处理完毕后会进入数据统计页

<document-image name="review"></document-image>

确认无误后点击右侧<el-button size="small" type="primary">导出</el-button>按钮即可导出月报数据。

<document-image name="export-success"></document-image>