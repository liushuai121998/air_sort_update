// let data = require('../../dataTest.json')

let thLeftData = [{ name: 'index', title: '序号', width: '40px' }, { name: 'operationDate', title: '月/日', width: '69px' }, { name: 'flightNo', title: '航班号', width: '102px' }, { name: 'repeatCount', title: '重复', width: '40px' },
    { name: 'regNo', title: '机号', width: '65px' }, { name: 'dori', title: '类型', width: '65px' }, { name: 'airType', title: '机型', width: '69px' }, { name: 'vip', title: 'VIP', width: '75px' }, { name: 'status', title: '航班状态', width: '100px' }, { name: 'taskcode', title: '任务', width: '70px' }, { name: 'counter', title: '值机柜台', width: '80px' }, { name: 'baggage', title: '行李转盘', width: '80px' }, { name: 'line', title: '航线', width: '88px' }, { name: 'bay', title: '机位', width: '44px' }, { name: 'gate', title: '登机口', width: '54px' },
    { name: 'sta', title: '计到', width: '54px' }, { name: 'eta', title: '预到', width: '54px' }, { name: 'ata', title: '实到', width: '54px' }, { name: 'etd', title: '预离', width: '54px' }, { name: 'std', title: '计离', width: '54px' }, { name: 'atd', title: '实离', width: '54px' }, { name: 'arming', title: '预位', width: '53px' }, { name: 'runway', title: '跑道', width: '53px' }, { name: 'close', title: '协关', width: '70px' }, { name: 'mark', title: '标记', width: '68px' }
]


let cloneLeftData = JSON.parse(JSON.stringify(thLeftData))

let cloneLeftData2 = JSON.parse(JSON.stringify(thLeftData))

let tabComeData = JSON.parse(JSON.stringify(cloneLeftData))
let tabLeaveData = JSON.parse(JSON.stringify(cloneLeftData2))
export default {
    // data: Object.freeze(data),
    inputValue: "",
    thLeftData,
    // thRightData,
    cloneLeftData,
    cloneLeftData2,
    tabComeData,
    tabLeaveData,
    cloneTabComeData: JSON.parse(JSON.stringify(tabComeData)),
    cloneTabLeaveData: JSON.parse(JSON.stringify(tabLeaveData)),
    comeData: [],
    leaveData: [],
    cloneComeData: [],
    cloneLeaveData: [],
    serviceData: [],
    // 搜索的索引
    searchIndexArr: [],
    // 选中tr的索引
    selectIndexArr: [],
    // 选中的tr
    selectTrArr: [],
    // 是否按下删除按钮
    isClickDel: false,
    isFlightClick: false,
    // 排序 降序或升序
    sort: true,
    // 检索到的数据
    searchData: [],
    delRightContent: [],
    isFirst: true,
    isBai: false,
    // 是否分屏显示
    isDiviScreen: false,
    // 是否显示右侧边栏
    isShowRight: true,
    rightContent: null,
    initData: [],
    cloneInitData: [],
    length: {
        comeLength: 0,
        leaveLength: 0,
        mergeLength: 0
    },
    serviceWidth: [],
    // 到港服务型width
    comeServiceWidth: [],
    // 离港服务型width
    leaveServiceWidth: [],
    /** 复制的服务数据
     * 
     */
    cloneServiceData: [],
    /*是否排序
     */
    isSort: true,
    /** 克隆一份合屏的数据
     * 
     */
    cloneMergeData: [],

    /** 内容区是否显示
     * 
     */
    isContentShow: {
        isShow: false
    },
    /**wsUrl websocket地址
     * 
     */
    wsUrl: {
        val: '',
        token: ''
    },
    /**可写权限的数据 */
    authData: null
}