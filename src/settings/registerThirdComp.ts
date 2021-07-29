import type {App} from 'vue';

//vexTable组件
import VXETable from 'vxe-table'
import 'xe-utils'
import 'vxe-table/lib/style.css'
//vexTable(antd插件)
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import 'vxe-table-plugin-antd/dist/style.css'
export function registerThirdComp(app: App) {
    VXETable.use(VXETablePluginAntd)
    app.use(VXETable);
}
