import zh_cn from './langs/zh-cn';
import en_us from './langs/en-us';
import el_zh_cn from 'element-plus/dist/locale/zh-cn'
import el_en_us from 'element-plus/dist/locale/en'

const locale= {
  'zh-cn': {
    name: '中文',
    system: zh_cn,
    element: el_zh_cn
  },
  'en-us': {
    name: 'English',
    system: en_us,
    element: el_en_us
  }
};

export default locale;