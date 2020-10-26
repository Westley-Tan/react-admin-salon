import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 通用
const ButtonView = loadable(() => import(/* webpackChunkName: 'button' */ '@/views/PublicView/Button'))
const IconView = loadable(() => import(/* webpackChunkName: 'icon' */ '@/views/PublicView/Icon'))

// 导航
const DropdownView = loadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/NavView/Dropdown'))
const MenuView = loadable(() => import(/* webpackChunkName: 'menu' */ '@/views/NavView/Menu'))
const StepView = loadable(() => import(/* webpackChunkName: 'step' */ '@/views/NavView/Step'))

// 表单
const FormBaseView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/FormView/FormBaseView'))
const FormStepView = loadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/FormView/FormStepView'))

// 展示
const TableView = loadable(() => import(/* webpackChunkName: 'table' */ '@/views/ShowView/Table'))
const CollapseView = loadable(() => import(/* webpackChunkName: 'collapse' */ '@/views/ShowView/Collapse'))
const TreeView = loadable(() => import(/* webpackChunkName: 'tree' */ '@/views/ShowView/Tree'))
const TabsView = loadable(() => import(/* webpackChunkName: 'tabs' */ '@/views/ShowView/Tabs'))

// 其它
const ProgressView = loadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
const AnimationView = loadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
const EditorView = loadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
const UploadView = loadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

const Three = loadable(() => import(/* webpackChunkName: 'three' */ '@/views/TestView'))
const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

//员工分类列表
const CategoryList = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Category/CategoryList'))
//添加员工分类
const AddCategoryFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Category/AddCategoryView')
)
// //编辑员工分类
const EditCategoryFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Category/EditCategoryView')
)

//添加员工
const AddEmployeeFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Employee/AddEmployeeView')
)
//员工列表
const EmployeeList = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Employee/EmployeeList'))
//编辑员工
const EditEmployeeFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Employee/EditEmployeeView')
)
//员工排班
const ScheduleEmployeeView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Employee/ScheduleEmployeeView')
)

//Employee Week Schedule
const ScheduleEmployeeWeekView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Employee/ScheduleEmployeeWeekView')
)

//添加服務
const AddServicesFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Services/AddServicesView')
)
const EditServicesFormView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Services/EditServicesView')
)

const LocationInfoView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Admin/LocationInfo/LocationInfoView')
)

const AppointmentCalendarView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Appointment/AppointmentCalendar/AppointmentCalendarView')
)

const NewAppointmentView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Appointment/NewAppointment/NewAppointmentView')
)

const ListReservationView = loadable(() =>
    import(/* webpackChunkName: 'formBase' */ '@/views/Appointment/ListReservation/ListReservationView')
)

//服務列表
const ServicesList = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Services/ServicesList'))

// Service category list
const SCategoryList = loadable(() => import('@/views/ServiceCategory/SCategoryList'))

// Add entry to Service category list
const AddSCategoryView = loadable(() => import('@/views/ServiceCategory/AddSCategoryView'))

// Update entry to Service category list
const EditSCategoryView = loadable(() => import('@/views/ServiceCategory/EditSCategoryView'))

// Room list
const RoomList = loadable(() => import('@/views/Room/RoomList'))

// Add entry to room list
const AddRoomView = loadable(() => import('@/views/Room/AddRoomView'))

// Update entry to room list
const EditRoomView = loadable(() => import('@/views/Room/EditRoomView'))

// Merchandise list
const MerchandiseList = loadable(() => import('@/views/Merchandise/MerchandiseList'))

// Add Merchandise to Merchandise list
const AddMerchandiseView = loadable(() => import('@/views/Merchandise/AddMerchandiseView'))

// Update entry to Merchandise list
const EditMerchandiseView = loadable(() => import('@/views/Merchandise/EditMerchandiseView'))

// Display the inventory change log
const InventoryLogList = loadable(() => import('@/views/Merchandise/InventoryLogList'))

//添加商家
const AddMerchantView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Merchant/AddMerchantView'))
//商家列表
const MerchantList = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/Merchant/MerchantList'))
//修改商家
const EditMerchantView = loadable(() => import('@/views/Merchant/EditMerchantView'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
    { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
    { path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
    { path: '/nav/menu', exact: false, name: '下拉菜单', component: MenuView },
    { path: '/nav/steps', exact: false, name: '步骤条', component: StepView },
    { path: '/form/base-form', exact: false, name: '表单', component: FormBaseView },
    { path: '/form/step-form', exact: false, name: '表单', component: FormStepView },
    { path: '/show/table', exact: false, name: '表格', component: TableView },
    { path: '/show/collapse', exact: false, name: '折叠面板', component: CollapseView },
    { path: '/show/tree', exact: false, name: '树形控件', component: TreeView },
    { path: '/show/tabs', exact: false, name: '标签页', component: TabsView },
    { path: '/others/progress', exact: false, name: '进度条', component: ProgressView, auth: [1] },
    { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
    { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
    { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
    { path: '/one/two/three', exact: false, name: '三级', component: Three },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] },

    // TODO
    { path: '/employee/CategoryList', exact: false, name: 'Categories List', component: CategoryList, auth: [1] },
    { path: '/employee/addCategory', exact: false, name: 'Add Category', component: AddCategoryFormView, auth: [1] },
    {
        path: '/employee/editCategonry',
        exact: false,
        name: 'Edit Category',
        component: EditCategoryFormView,
        auth: [1]
    },
    { path: '/employee/add', exact: false, name: 'Add Employee', component: AddEmployeeFormView, auth: [1] },
    { path: '/employee/list', exact: false, name: 'Employees List', component: EmployeeList, auth: [1] },
    { path: '/services/add', exact: false, name: 'Add Services', component: AddServicesFormView, auth: [1] },
    { path: '/services/edit', exact: false, name: 'Edit Services', component: EditServicesFormView, auth: [1] },
    { path: '/services/list', exact: false, name: 'Services List', component: ServicesList, auth: [1] },
    {
        path: '/services/SCategoryList',
        exact: false,
        name: 'Service Category List',
        component: SCategoryList,
        auth: [1]
    },
    {
        path: '/services/addSCategory',
        exact: false,
        name: 'Add Service Category',
        component: AddSCategoryView,
        auth: [1]
    },
    {
        path: '/services/EditSCategory',
        exact: false,
        name: 'Edit Service Category',
        component: EditSCategoryView,
        auth: [1]
    },
    {
        path: '/services/RoomList',
        exact: false,
        name: 'Room List',
        component: RoomList,
        auth: [1]
    },
    {
        path: '/services/addRoom',
        exact: false,
        name: 'Add Room',
        component: AddRoomView,
        auth: [1]
    },
    {
        path: '/services/editRoom',
        exact: false,
        name: 'Edit Room',
        component: EditRoomView,
        auth: [1]
    },
    {
        path: '/merchandise/MerchandiseList',
        exact: false,
        name: 'Merchandise List',
        component: MerchandiseList,
        auth: [1]
    },
    {
        path: '/merchandise/addMerchandise',
        exact: false,
        name: 'Add Merchandise',
        component: AddMerchandiseView,
        auth: [1]
    },
    {
        path: '/merchandise/editMerchandise',
        exact: false,
        name: 'Edit Merchandise',
        component: EditMerchandiseView,
        auth: [1]
    },
    {
        path: '/merchandise/InventoryLog',
        exact: false,
        name: 'Inventory Log',
        component: InventoryLogList,
        auth: [1]
    },
    { path: '/employee/edit', exact: false, name: 'Edit Employee', component: EditEmployeeFormView, auth: [1] },
    { path: '/employee/schedule', exact: false, name: 'Schedule Employee', component: ScheduleEmployeeView, auth: [1] },
    {
        path: '/employee/scheduleweek',
        exact: false,
        name: 'Employee Week Schedule',
        component: ScheduleEmployeeWeekView,
        auth: [1]
    },

    { path: '/merchant/add', exact: false, name: 'Add Shop', component: AddMerchantView },
    {
        path: '/merchant/editMerchant',
        exact: false,
        name: 'Edit Shop',
        component: EditMerchantView
    },
    { path: '/merchant/list', exact: false, name: 'Shop List', component: MerchantList },
    { path: '/admin/locationinfo', exact: false, name: 'Location Info', component: LocationInfoView, auth: [1] },

    {
        path: '/appointment/appointmentcalendar',
        exact: false,
        name: 'Appointment Calendar',
        component: AppointmentCalendarView,
        auth: [1]
    },
    {
        path: '/appointment/newappointment',
        exact: false,
        name: 'New Appointment',
        component: NewAppointmentView,
        auth: [1]
    },
    {
        path: '/appointment/listreservation',
        exact: false,
        name: 'List Reservation',
        component: ListReservationView,
        auth: [1]
    }
]

export default routes
