const menu = [
    {
        key: '/index',
        title: '首页',
        title: 'HomePage',
        icon: 'home',
        auth: [1]
    },
    {
        title: 'Shops',
        key: '/shop',
        icon: 'bars',
        subs: [
            { title: 'Add shop', key: '/merchant/add', icon: '' },
            { title: 'Shop List', key: '/merchant/list', icon: '' }
        ]
    },
    {
        title: 'Employees',
        key: '/employee',
        icon: 'bars',
        subs: [
            { title: 'Group', key: '/employee/CategoryList', icon: '' },
            { title: 'Employees List', key: '/employee/list', icon: '' },
            { title: 'Week Schedule', key: '/employee/scheduleweek', icon: '' }
        ],
        auth: [1]
    },
    {
        title: 'Services',
        key: '/services',
        icon: 'bars',
        subs: [
            { title: 'Services Category', key: '/services/SCategoryList', icon: '' },
            { title: 'Services List', key: '/services/list', icon: '' },
            { title: 'Room List', key: '/services/RoomList', icon: '' }
        ],
        auth: [1]
    },
    {
        title: 'Merchandise',
        key: '/merchandise',
        icon: 'bars',
        subs: [
            { title: 'Merchandise List', key: '/merchandise/MerchandiseList', icon: '' },
            { title: 'Inventory Log', key: '/merchandise/InventoryLog', icon: '' }
        ],
        auth: [1]
    },
    {
        title: 'Appointment',
        key: '/appointment',
        icon: 'bars',
        subs: [
            { title: 'Calendar', key: '/appointment/appointmentcalendar', icon: '' },
            { title: 'New Appointment', key: '/appointment/newappointment', icon: '' },
            { title: 'List Reservation', key: '/appointment/listreservation', icon: '' }
        ],
        auth: [1]
    },
    {
        title: '通用',
        key: '/public',
        icon: 'appstore',
        auth: [1],
        subs: [
            { title: '按钮', key: '/public/button', icon: '' },
            { title: '图标', key: '/public/icon', icon: '' }
        ]
    },
    {
        title: '导航',
        key: '/nav',
        icon: 'bulb',
        subs: [
            { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
            { title: '导航菜单', key: '/nav/menu', icon: '' },
            { title: '步骤条', key: '/nav/steps', icon: '' }
        ]
    },
    {
        title: '表单',
        key: '/form',
        icon: 'form',
        subs: [
            { title: '基础表单', key: '/form/base-form', icon: '' },
            { title: '步骤表单', key: '/form/step-form', icon: '' }
        ],
        auth: [1]
    },
    {
        title: '展示',
        key: '/show',
        icon: 'pie-chart',
        subs: [
            { title: '表格', key: '/show/table', icon: '' },
            { title: '折叠面板', key: '/show/collapse', icon: '' },
            { title: '树形控件', key: '/show/tree', icon: '' },
            { title: '标签页', key: '/show/tabs', icon: '' }
        ]
    },
    {
        title: '其它',
        key: '/others',
        icon: 'paper-clip',
        auth: [1],
        subs: [
            { title: '进度条', key: '/others/progress', icon: '' },
            { title: '动画', key: '/others/animation', icon: '' },
            { title: '上传', key: '/others/upload', icon: '' },
            { title: '富文本', key: '/others/editor', icon: '' },
            { title: '404', key: '/404', icon: '' },
            { title: '500', key: '/500', icon: '' }
        ]
    },
    {
        title: '多级导航',
        key: '/one',
        icon: 'bars',
        subs: [
            {
                title: '二级',
                key: '/one/two',
                icon: '',
                subs: [{ title: '三级', key: '/one/two/three', icon: '' }]
            }
        ]
    },
    {
        title: '关于',
        key: '/about',
        icon: 'user',
        auth: [1]
    }
]

export default menu
