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
    Space,
    message
} from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
import moment from 'moment'
import { start } from 'nprogress'

const { Option } = Select
const dateFormat = 'YYYY/MM/DD'

let selectedEmployeeId
let selectedServiceId
let selectedDate = new Date()
let selectedStartHour
let selectedStartMinius
let selectedScheduleDate

class FromView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            service: [],
            employeeScheduleDate: [],
            hour: [],
            minius: []
        }
    }

    componentDidMount() {
        // this.getEmployeeList()
        this.getServiceList()
        this.initSelectValue()
    }

    initSelectValue = () => {
        let dataHour = []
        let dataMinius = []
        for (let i = 9; i < 22; i++) dataHour.push(('0' + i).slice(-2))
        for (let i = 0; i < 60; i++) dataMinius.push(('0' + i).slice(-2))
        this.setState({
            hour: dataHour,
            minius: dataMinius
        })
    }

    getEmployeeList = () => {
        let employeeList = []
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        axios
            .get(`${API}/user/getEmployeeByService/?serviceid=${selectedServiceId}`, axiosConfig)
            .then(res => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        for (let j = 0; j < res.data[i].employee.length; j++) {
                            employeeList.push({
                                employeeId: res.data[i].employee[j]._id,
                                name: res.data[i].employee[j].name
                            })
                        }
                    }
                    this.setState({
                        employee: employeeList
                    })
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getServiceList = () => {
        let serviceList = []
        this.setState({ employee: [] })
        let adminId = JSON.parse(localStorage.getItem('user')).userId
        axios
            .get(`${API}/user/getAllServicesByAdminId?id=${adminId}`, {
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
                            serviceList.push({
                                serviceId: res.data[i]._id,
                                name: res.data[i].name,
                                duration: res.data[i].duration
                            })
                        }
                        this.setState({
                            service: serviceList
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

    getEmployeeScheduleById = () => {
        let empScheduleDate = []
        let scheduleDate
        let scheduleStartTime
        let scheduleEndTime
        axios
            .get(`${API}/user/getEmployeeScheduleById/${selectedEmployeeId}`, {
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
                            scheduleDate = new Date(res.data[i].day)
                            scheduleStartTime = new Date(res.data[i].startTime)
                            scheduleEndTime = new Date(res.data[i].endTime)
                            empScheduleDate.push({
                                scheduleId: res.data[i]._id,
                                textDate:
                                    scheduleDate.getFullYear() +
                                    '-' +
                                    ('0' + (parseInt(scheduleDate.getMonth()) + 1)).slice(-2) +
                                    '-' +
                                    ('0' + scheduleDate.getDate()).slice(-2) +
                                    ' (' +
                                    ('0' + scheduleStartTime.getHours()).slice(-2) +
                                    ':' +
                                    ('0' + scheduleStartTime.getMinutes()).slice(-2) +
                                    '~' +
                                    ('0' + scheduleEndTime.getHours()).slice(-2) +
                                    ':' +
                                    ('0' + scheduleEndTime.getMinutes()).slice(-2) +
                                    ')'
                            })
                        }
                        this.setState({
                            employeeScheduleDate: empScheduleDate
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

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            let startDate
            let duration
            let { username, notes } = fieldsValue
            let event = []
            let payload
            let adminId = JSON.parse(localStorage.getItem('user')).userId
            let scheduleDateString
            let endHour
            let endMinius
            let endDate
            let dataDay
            let checkData = false

            if (err) return

            checkData = false
            for (let i = 0; i < this.state.employee.length; i++) {
                if (selectedEmployeeId === this.state.employee[i].employeeId) {
                    checkData = true
                    break
                }
            }
            if (checkData === false) {
                message.error('Invalid employee, please select again')
                return
            }

            checkData = false
            for (let i = 0; i < this.state.employeeScheduleDate.length; i++) {
                if (selectedScheduleDate === this.state.employeeScheduleDate[i].scheduleId) {
                    checkData = true
                    break
                }
            }
            if (checkData === false) {
                message.error('Invalid date, please select again')
                return
            }

            for (let i = 0; i < this.state.service.length; i++) {
                if (this.state.service[i].serviceId === selectedServiceId) {
                    duration = this.state.service[i].duration
                }
            }

            for (let i = 0; i < this.state.employeeScheduleDate.length; i++) {
                if (this.state.employeeScheduleDate[i].scheduleId === selectedScheduleDate) {
                    scheduleDateString = this.state.employeeScheduleDate[i].textDate
                    scheduleDateString = scheduleDateString.split(' ')[0]
                }
            }
            dataDay = new Date(scheduleDateString)
            dataDay = new Date(dataDay.getFullYear(), dataDay.getMonth(), dataDay.getDate() + 1)
            startDate = new Date(
                dataDay.getFullYear(),
                dataDay.getMonth(),
                dataDay.getDate(),
                parseInt(selectedStartHour),
                parseInt(selectedStartMinius),
                0
            )

            if (parseInt(selectedStartMinius) + parseInt(duration) > 59) {
                endHour = parseInt(selectedStartHour) + 1
                endMinius = 60 - (parseInt(selectedStartMinius) + parseInt(duration))
            } else {
                endHour = parseInt(selectedStartHour)
                endMinius = parseInt(selectedStartMinius) + parseInt(duration)
            }
            endDate = new Date(
                dataDay.getFullYear(),
                dataDay.getMonth(),
                dataDay.getDate(),
                parseInt(endHour),
                parseInt(endMinius),
                0
            )
            event.push({
                username: username,
                userId: selectedEmployeeId,
                shopId: adminId,
                message: notes,
                employeeId: selectedEmployeeId,
                serviceId: selectedServiceId,
                duration: duration,
                day: dataDay,
                start: startDate,
                end: endDate
            })

            payload = {
                shopId: adminId,
                events: event,
                type: 'shop'
            }

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            axios
                .post(`${API}/user/makeReservation`, payload, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('Add Success!')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    onEmployeeChange = value => {
        selectedEmployeeId = value
        this.getEmployeeScheduleById()
    }

    onServiceChange = value => {
        selectedServiceId = value
        this.getEmployeeList()
    }

    onScheduleChange = value => {
        selectedScheduleDate = value
    }

    onStartHourChange = value => {
        selectedStartHour = value
    }

    onStartMiniusChange = value => {
        selectedStartMinius = value
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const layout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 8
            }
        }
        const tailLayout = {
            wrapperCol: {
                offset: 6,
                span: 8
            }
        }

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Appointment', 'New Appointment']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col span={24}>
                        <div className='base-style'>
                            <Form {...layout} name='basic' onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>User Name</span>}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input user name' }]
                                    })(<Input placeholder='Please input user name' />)}
                                </Form.Item>
                                <Form.Item name='service' label='Service' rules={[{ required: true }]}>
                                    <Select onChange={this.onServiceChange} placeholder='Select service'>
                                        {this.state.service.map((data, index) => {
                                            return (
                                                <Option value={data.serviceId} key={data.serviceId}>
                                                    {data.name}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='employee' label='Employee' rules={[{ required: true }]}>
                                    <Select onChange={this.onEmployeeChange} placeholder='Select employee'>
                                        {this.state.employee.map((data, index) => {
                                            return (
                                                <Option value={data.employeeId} key={data.employeeId}>
                                                    {data.name}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>

                                <Form.Item name='appointmentDate' label='Date' rules={[{ required: true }]}>
                                    <Select onChange={this.onScheduleChange} placeholder='Schedule'>
                                        {this.state.employeeScheduleDate.map((data, index) => {
                                            return (
                                                <Option value={data.scheduleId} key={data.scheduleId}>
                                                    {data.textDate}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='appointmentDuration' label='Start' rules={[{ required: true }]}>
                                    <Row>
                                        <Col span={6}>
                                            <Select onChange={this.onStartHourChange} placeholder='Hour'>
                                                {this.state.hour.map((data, index) => {
                                                    return (
                                                        <Option value={data} key={data}>
                                                            {data}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select onChange={this.onStartMiniusChange} placeholder='Minius'>
                                                {this.state.minius.map((data, index) => {
                                                    return (
                                                        <Option value={data} key={data}>
                                                            {data}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label={<span>Notes</span>}>
                                    {getFieldDecorator('notes', {})(<Input placeholder='Please input notes' />)}
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        Add
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'new_appointment_view' })(FromView)

export default WrappedNormalLoginForm
