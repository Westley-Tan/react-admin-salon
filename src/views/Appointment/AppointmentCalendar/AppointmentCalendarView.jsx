import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import {
    Alert,
    Layout,
    Row,
    Col,
    Divider,
    Form,
    Button,
    Icon,
    Input,
    InputNumber,
    Checkbox,
    Tooltip,
    Cascader,
    Select,
    DatePicker,
    Radio,
    Rate,
    Switch,
    Slider,
    AutoComplete,
    Table,
    Typography,
    Calendar,
    message
} from 'antd'
import moment from 'moment'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
import Scheduler, { Resource } from 'devextreme-react/scheduler'
import Query from 'devextreme/data/query'

import Appointment from './Appointment.js'
import AppointmentTooltip from './AppointmentTooltip.js'

let currentDate = new Date()
let previousDate = new Date()
const views = ['day', 'week', 'timelineDay']
const groups = ['employeeId']

let currentSelected = 0
let nameGroupList = []
const { Option } = Select

class AppointmentCalendarView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeData: [],
            serviceData: [],
            data: [],
            selectnameGroupIdx: 0,
            nameGroup: []
        }
    }

    componentWillMount() {
        this.setState({
            serviceData: [
                {
                    id: 1,
                    text: '',
                    director: '',
                    year: '',
                    image: '',
                    duration: '0',
                    color: ''
                }
            ]
        })
        this.setState({
            employeeData: [
                {
                    text: 'Employee1',
                    id: 0
                }
            ]
        })
        this.setState({
            nameGroup: [
                {
                    employeeId: 0,
                    serviceId: 3,
                    price: 10,
                    startDate: new Date(2020, 9, 19, 9, 10),
                    endDate: new Date(2020, 9, 19, 11, 1)
                }
            ]
        })
        this.setState({
            nameGroup: []
        })
    }

    componentDidMount() {
        this.getGroupName()
        this.getService()
        this.getData()
    }

    getService = () => {
        let serviceList = []
        axios
            .post(
                `${API}/appointment/getAllServices`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            serviceList.push({
                                id: res.data[i]._id,
                                text: res.data[i].name,
                                director: res.data[i].price,
                                year: res.data[i].desc,
                                image: '',
                                duration: res.data[i].duration,
                                color: ''
                            })
                        }
                        this.setState({
                            serviceData: serviceList
                        })
                    } else {
                        this.setState({
                            serviceData: []
                        })
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getData = () => {
        let eventList = []
        let searchDateStart
        let searchDateEnd

        searchDateStart = new Date(currentDate)
        if (searchDateStart.getDay != 1) {
            while (searchDateStart.getDay() != 1) {
                searchDateStart.setDate(searchDateStart.getDate() - 1)
            }
        }
        searchDateEnd = new Date(currentDate)
        if (searchDateEnd.getDay != 0) {
            while (searchDateEnd.getDay() != 0) {
                searchDateEnd.setDate(searchDateEnd.getDate() + 1)
            }
        }
        axios
            .post(
                `${API}/appointment/getWeekEvents`,
                {
                    weekstart:
                        searchDateStart.getFullYear() +
                        '-' +
                        ('0' + (searchDateStart.getMonth() + 1)).slice(-2) +
                        '-' +
                        ('0' + searchDateStart.getDate()).slice(-2),
                    weekend:
                        searchDateEnd.getFullYear() +
                        '-' +
                        ('0' + (searchDateEnd.getMonth() + 1)).slice(-2) +
                        '-' +
                        ('0' + searchDateEnd.getDate()).slice(-2)
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].docServices.length > 0) {
                                eventList.push({
                                    employeeId: res.data[i].employeeId,
                                    serviceId: res.data[i].serviceId,
                                    price: 0,
                                    startDate: res.data[i].start,
                                    endDate: res.data[i].end,
                                    name: res.data[i].docServices[0].name,
                                    category: res.data[i].docServices[0].category,
                                    subCategory: res.data[i].docServices[0].subCategory,
                                    duration: res.data[i].duration,
                                    empChangeTime: res.data[i].docServices[0].empChangeTime,
                                    roomCleanupTime: res.data[i].docServices[0].roomCleanupTime,
                                    showInOnlineMenu: res.data[i].docServices[0].showInOnlineMenu,
                                    categoryId: res.data[i].docServices[0].categoryId,
                                    eventId: res.data[i]._id
                                })
                            } else {
                                eventList.push({
                                    employeeId: res.data[i].employeeId,
                                    serviceId: res.data[i].serviceId,
                                    price: 0,
                                    startDate: res.data[i].start,
                                    endDate: res.data[i].end,
                                    name: '',
                                    category: '',
                                    subCategory: '',
                                    duration: '',
                                    empChangeTime: '',
                                    roomCleanupTime: '',
                                    showInOnlineMenu: '',
                                    categoryId: '',
                                    eventId: ''
                                })
                            }
                        }
                        this.setState({
                            data: eventList
                        })
                    } else {
                        this.setState({
                            data: []
                        })
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getGroupName = () => {
        nameGroupList = []
        axios
            .post(
                `${API}/appointment/getAllEmployeeGroup`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        nameGroupList.push('All Staff')
                        for (let i = 0; i < res.data.length; i++) {
                            nameGroupList.push(res.data[i].name)
                        }
                        this.setState({
                            nameGroup: nameGroupList
                        })
                        currentSelected = 0
                        this.getEmployeeNameInGroup()
                    } else {
                        this.setState({
                            nameGroup: []
                        })
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getEmployeeNameInGroup = () => {
        let dataList = []
        let searchEmployeeEvent
        let searchEmployeeQuery

        if (nameGroupList[currentSelected] === 'All Staff') {
            searchEmployeeEvent = `${API}/appointment/getAllEmployeeEvent`
        } else {
            searchEmployeeEvent = `${API}/appointment/getAllEmployeeInGroupEvent`
            searchEmployeeQuery = {
                categoryName: nameGroupList[currentSelected]
            }
        }
        axios
            .post(searchEmployeeEvent, searchEmployeeQuery, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j = 0; j < res.data[i].docEmployee.length; j++) {
                                dataList.push({
                                    text: res.data[i].docEmployee[j].name,
                                    id: res.data[i].docEmployee[j]._id
                                })
                            }
                        }
                        this.setState({
                            employeeData: dataList
                        })
                    } else {
                        this.setState({
                            employeeData: []
                        })
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    changeNameGroup = selectNameGroupIdx => {
        this.setState({
            selectnameGroupIdx: selectNameGroupIdx
        })
        currentSelected = selectNameGroupIdx
        this.getEmployeeNameInGroup()
    }

    getServiceById = id => {
        return Query(this.state.serviceData)
            .filter(['id', id])
            .toArray()[0]
    }

    onOptionChanged = e => {
        if (e.name === 'currentDate') {
            currentDate = e.value
            this.getData()
        }
    }

    onAppointmentDeleted = e => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        var postData = {
            eventId: e.appointmentData.eventId
        }
        axios
            .post(`${API}/appointment/deleteAppointmentEvent`, postData, axiosConfig)
            .then(res => {
                if (res.status === 200) {
                    message.success('Delete Success!')
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Select
                    value={this.state.selectnameGroupIdx}
                    onChange={this.changeNameGroup}
                    dropdownMatchSelectWidth={false}>
                    {this.state.nameGroup.map((data, index) => {
                        return (
                            <Option key={index} value={index}>
                                {data}
                            </Option>
                        )
                    })}
                </Select>
                <Scheduler
                    dataSource={this.state.data}
                    views={views}
                    defaultCurrentView='day'
                    defaultCurrentDate={currentDate}
                    groups={groups}
                    height={600}
                    firstDayOfWeek={1}
                    startDayHour={9}
                    endDayHour={20}
                    showAllDayPanel={false}
                    crossScrollingEnabled={true}
                    cellDuration={15}
                    editing={{ allowAdding: false, allowDeleting: false, allowUpdating: false }}
                    appointmentComponent={Appointment}
                    onContentReady={this.onContentReady}
                    onAppointmentFormOpening={this.onAppointmentFormOpening}
                    showCurrentTimeIndicator={this.state.showCurrentTimeIndicator}
                    shadeUntilCurrentTime={this.state.shadeUntilCurrentTime}
                    onOptionChanged={this.onOptionChanged}
                    onAppointmentDeleted={this.onAppointmentDeleted}>
                    <Resource dataSource={this.state.serviceData} fieldExpr='serviceId' />
                    <Resource dataSource={this.state.employeeData} fieldExpr='employeeId' />
                </Scheduler>
            </div>
        )
    }

    onAppointmentFormOpening = data => {
        let form = data.form,
            serviceInfo = this.getServiceById(data.appointmentData.serviceId) || {},
            startDate = data.appointmentData.startDate
        console.log(data)

        form.option('items', [
            {
                label: {
                    text: 'Service'
                },
                name: 'service',
                editorType: 'dxTextBox',
                editorOptions: {
                    value: data.appointmentData.name,
                    readOnly: true
                }
            },
            {
                label: {
                    text: 'SubCategory'
                },
                name: 'subcategory',
                editorType: 'dxTextBox',
                editorOptions: {
                    value: data.appointmentData.subCategory,
                    readOnly: true
                }
            },
            {
                label: {
                    text: 'Duration'
                },
                name: 'duration',
                editorType: 'dxTextBox',
                editorOptions: {
                    value: data.appointmentData.duration,
                    readOnly: true
                }
            }
        ])
    }
}

export default AppointmentCalendarView
