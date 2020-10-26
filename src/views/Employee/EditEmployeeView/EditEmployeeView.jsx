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
    Table,
    Select,
    DatePicker,
    Radio,
    Rate,
    Switch,
    Slider,
    AutoComplete,
    Tabs,
    Tree,
    message
} from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
import DeniReactTreeView from 'deni-react-treeview'
import Moment from 'moment'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const { TabPane } = Tabs
const picktime = 'Pick a time'
const oneDay = 24 * 60 * 60 * 1000

class ScheduleEmployeeRow extends Component {
    constructor(props) {
        super()
        this.timeOption = [picktime]
        // for (let i = 5; i < 22; i++) {
        //     for (let j = 0; j < 60; j += 15) {
        //         this.timeOption.push(i + ':' + (j == 0 ? '00' : j))
        //     }
        // }

        let start = new Date()
        start.setHours(0)
        start.setMinutes(0)
        start.setSeconds(0)

        let end = new Date()
        end.setHours(24)
        end.setMinutes(0)
        end.setSeconds(0)

        let ptr = new Date(start.getTime())

        while (ptr.getTime() < end.getTime()) {
            this.timeOption.push(ptr)
            ptr = new Date(ptr.getTime() + 900000)
        }
    }

    state = {
        data: []
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ data: nextProps.data })
        }
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition })
    }
    changeStartTime = (index, value) => {
        let tmpData = this.state.data
        tmpData[index].startTime = value
        this.setState({ data: tmpData })
    }
    changeEndTime = (index, value) => {
        let tmpData = this.state.data
        tmpData[index].endTime = value
        this.setState({ data: tmpData })
    }
    changeLaunchStartTime = (index, value) => {
        let tmpData = this.state.data
        tmpData[index].launchStart = value
        this.setState({ data: tmpData })
    }
    changeLaunchEndTime = (index, value) => {
        let tmpData = this.state.data
        tmpData[index].launchEnd = value
        this.setState({ data: tmpData })
    }
    changeData = (index, value) => {
        let tmpData = this.state.data
        tmpData[index].scheduleType = value
        this.setState({ data: tmpData })
    }
    render() {
        return (
            <Table
                columns={[
                    {
                        title: this.props.title,
                        key: 0,
                        render: (data, data1, index) => {
                            return (
                                <div>
                                    <div style={{ float: 'left' }}> {data.title}</div>
                                    <div style={{ float: 'right' }}>
                                        <Select
                                            value={data.scheduleType}
                                            index={index}
                                            onChange={this.changeData.bind(this, index)}
                                            dropdownMatchSelectWidth={false}>
                                            <Option value='dayoff'>Day off</Option>
                                            <Option value='workday'>Workday</Option>
                                        </Select>
                                    </div>
                                </div>
                            )
                        }
                    },
                    {
                        title: 'Work Start Time',
                        key: 1,
                        render: (data, data1, index) => (
                            <div style={{ float: 'left' }}>
                                {data.scheduleType == 'workday' ? (
                                    <Select
                                        value={
                                            data.startTime == 'Pick a time'
                                                ? data.startTime
                                                : Moment(data.startTime).format('hh:mm A')
                                        }
                                        onChange={this.changeStartTime.bind(this, index)}
                                        dropdownMatchSelectWidth={false}>
                                        {this.timeOption.map((data, index) => {
                                            return (
                                                <Option value={data} key={index}>
                                                    {data == 'Pick a time' ? data : Moment(data).format('hh:mm A')}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    ''
                                )}
                            </div>
                        )
                    },
                    {
                        title: 'Work End Time',
                        key: 2,
                        render: (data, data1, index) => (
                            <div style={{ float: 'left' }}>
                                {data.scheduleType == 'workday' ? (
                                    <Select
                                        value={
                                            data.endTime == 'Pick a time'
                                                ? data.endTime
                                                : Moment(data.endTime).format('hh:mm A')
                                        }
                                        onChange={this.changeEndTime.bind(this, index)}
                                        dropdownMatchSelectWidth={false}>
                                        {this.timeOption.map((data, index) => {
                                            return (
                                                <Option value={data} key={index}>
                                                    {data == 'Pick a time' ? data : Moment(data).format('hh:mm A')}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    ''
                                )}
                            </div>
                        )
                    },
                    {
                        title: 'Launch Start Time',
                        key: 3,
                        render: (data, data1, index) => (
                            <div style={{ float: 'left' }}>
                                {data.scheduleType == 'workday' ? (
                                    <Select
                                        value={
                                            data.launchStart == 'Pick a time'
                                                ? data.launchStart
                                                : Moment(data.launchStart).format('hh:mm A')
                                        }
                                        onChange={this.changeLaunchStartTime.bind(this, index)}
                                        dropdownMatchSelectWidth={false}>
                                        {this.timeOption.map((data, index) => {
                                            return (
                                                <Option value={data} key={index}>
                                                    {data == 'Pick a time' ? data : Moment(data).format('hh:mm A')}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    ''
                                )}
                            </div>
                        )
                    },
                    {
                        title: 'Launch End Time',
                        key: 4,
                        render: (data, data1, index) => (
                            <div style={{ float: 'left' }}>
                                {data.scheduleType == 'workday' ? (
                                    <Select
                                        value={
                                            data.launchEnd == 'Pick a time'
                                                ? data.launchEnd
                                                : Moment(data.launchEnd).format('hh:mm A')
                                        }
                                        onChange={this.changeLaunchEndTime.bind(this, index)}
                                        dropdownMatchSelectWidth={false}>
                                        {this.timeOption.map((data, index) => {
                                            return (
                                                <Option value={data} key={index}>
                                                    {data == 'Pick a time' ? data : Moment(data).format('hh:mm A')}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    ''
                                )}
                            </div>
                        )
                    }
                ]}
                dataSource={this.state.data}
                pagination={false}
                rowKey={this.props.title}
            />
        )
    }
}
var saveSelected = []
const { TreeNode } = Tree

const { Search } = Input

const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0'
    const tns = _tns || gData

    const children = []
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`
        tns.push({ title: key, key })
        if (i < y) {
            children.push(key)
        }
    }
    if (_level < 0) {
        return tns
    }
    const level = _level - 1
    children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index].children)
    })
}
generateData(z)

const dataList = []
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const { key } = node
        dataList.push({ key, title: key })
        if (node.children) {
            generateList(node.children)
        }
    }
}
generateList(gData)

const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children)
            }
        }
    }
    return parentKey
}

class EditEmployeeView extends Component {
    constructor(props) {
        super(props)

        let employee = JSON.parse(localStorage.getItem('employee'))
        if (employee.employeeid) {
            let employeeid = employee.employeeid
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            axios
                .get(`${API}/admin/getEmployeeSchedule?id=` + employeeid, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)

                        let docs = res.data.docs

                        let dt = 24 * 60 * 60 * 1000
                        // let offset = (new Date().getTimezoneOffset()) * 60 * 1000
                        let curDate = new Date()
                        curDate.setHours(12)
                        let timestamp = curDate.getTime() - 4 * dt
                        timestamp -= timestamp % (60 * 60 * 1000)
                        let tmpDays = parseInt((timestamp % (28 * dt)) / dt)

                        let timePeriod = []
                        // timestamp = timestamp - timestamp % (28 * dt) + 56 * dt + 3 * dt + offset
                        timestamp = timestamp - tmpDays * dt + 4 * dt
                        for (let i = 1; i < 11; i++) {
                            let data = []
                            let endTimeStamp = timestamp + 28 * dt * i
                            for (let j = 0; j < 28; j++) {
                                let day = endTimeStamp - (27 - j) * dt
                                let dayFormat = Moment(day).format('YYYYMMDD')
                                if (docs.length > 0) {
                                    let index = -1
                                    for (let j = 0; j < docs.length; j++) {
                                        if (dayFormat == Moment(docs[j].day).format('YYYYMMDD')) {
                                            index = j
                                            break
                                        }
                                    }
                                    if (index != -1) {
                                        data.push({
                                            scheduleType: docs[index].scheduleType,
                                            day: docs[index].day,
                                            startTime: docs[index].startTime,
                                            endTime: docs[index].endTime,
                                            launchEnd: docs[index].launchEnd,
                                            launchStart: docs[index].launchStart
                                        })
                                    } else {
                                        data.push({
                                            day: day,
                                            scheduleType: 'dayoff'
                                        })
                                    }
                                } else {
                                    data.push({
                                        day: day,
                                        scheduleType: 'dayoff'
                                    })
                                }
                            }
                            timePeriod.push({
                                start: Moment(timestamp + 28 * dt * i - 27 * dt).format('LL'),
                                end: Moment(timestamp + 28 * dt * i).format('LL'),
                                startTimeStamp: endTimeStamp - 27 * dt,
                                endTimeStamp: endTimeStamp,
                                data: data
                            })
                        }

                        this.setState({
                            timePeriod: timePeriod,
                            selectTimePeriod: 0
                        })
                        this.setPeriodData(timePeriod[this.state.selectTimePeriod].data)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => {
                    message.error(err)
                })
        }
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: true,
            tabPosition: 'top',
            _id: [employee.employeeid],
            name: [employee.employeeName],
            nameError: '',
            email: [employee.employeeEmail],
            emailError: '',
            phone: [employee.employeePhone],
            phoneError: '',
            address: [employee.employeeAddress],
            employeeAdminid: employee.employeeAdminid,
            addressError: '',
            categoryId: [employee.categoryId], // Employee type

            timePeriod: [],
            selectTimePeriod: null,

            week1: 'Week 1',
            week2: 'Week 2',
            week3: 'Week 3',
            week4: 'Week 4',

            data1: [],
            data2: [],
            data3: [],
            data4: [],
            loading: false,

            categoryList: [],

            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            searchValue: '',
            gData,

            treeData: []
        }
    }

    componentDidMount() {
        this.getAllServicesCategory()
        this.getCheckedServiceBond()
    }

    getAllServicesCategory = () => {
        let treeData = []
        axios
            .get(`${API}/service/getAllServicesCategory`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let strTitle
                    let strKey
                    for (let i = 0; i < res.data.length; i++) {
                        strTitle = res.data[i].docCategory[0].name
                        strKey = res.data[i].docCategory[0]._id
                        treeData.push({ title: strTitle, key: strKey })
                        if (res.data[i].children.length > 0) treeData[i].children = []
                        for (let j = 0; j < res.data[i].children.length; j++) {
                            strTitle = res.data[i].children[j].title
                            strKey = res.data[i].children[j].key
                            treeData[i].children.push({ title: strTitle, key: strKey })
                        }
                    }
                    this.setState({ treeData: treeData })
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getCheckedServiceBond = () => {
        let employee = JSON.parse(localStorage.getItem('employee'))
        let savedCheckedKey = []
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        var postData = {
            employeeId: employee.employeeid
        }
        axios
            .post(`${API}/service/getCheckedServiceBond`, postData, axiosConfig)
            .then(res => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        savedCheckedKey.push(res.data[i].serviceId)
                    }
                } else {
                    console.log(res)
                }
                this.setState({ checkedKeys: savedCheckedKey })
            })
            .catch(err => {
                console.log(err)
            })
    }

    changeTimePeriod = selectTimePeriod => {
        this.setState({ selectTimePeriod })
        this.setPeriodData(this.state.timePeriod[selectTimePeriod].data)
    }
    setPeriodData(tmpData) {
        let tmpdata1 = []
        let tmpdata2 = []
        let tmpdata3 = []
        let tmpdata4 = []
        for (let i = 0; i < 28; i++) {
            let i_ = i % 7
            let data_ = {}
            data_['scheduleType'] = tmpData[i].scheduleType
            data_['day'] = tmpData[i].day
            data_['startTime'] = tmpData[i].startTime ? tmpData[i].startTime : picktime
            data_['endTime'] = tmpData[i].endTime ? tmpData[i].endTime : picktime
            data_['launchStart'] = tmpData[i].launchStart ? tmpData[i].launchStart : picktime
            data_['launchEnd'] = tmpData[i].launchEnd ? tmpData[i].launchEnd : picktime
            // switch (i_) {
            //     case 0:
            //         {
            //             data_['title'] = 'Monday'
            //         }
            //         break
            //     case 1:
            //         {
            //             data_['title'] = 'Tuesday'
            //         }
            //         break
            //     case 2:
            //         {
            //             data_['title'] = 'Wednesday'
            //         }
            //         break
            //     case 3:
            //         {
            //             data_['title'] = 'Thursday'
            //         }
            //         break
            //     case 4:
            //         {
            //             data_['title'] = 'Friday'
            //         }
            //         break
            //     case 5:
            //         {
            //             data_['title'] = 'Saturday'
            //         }
            //         break
            //     case 6:
            //         {
            //             data_['title'] = 'Sunday'
            //         }
            //         break
            // }
            data_['title'] = Moment(tmpData[i].day).format('dddd MMM Do')
            if (i < 7) {
                tmpdata1.push(data_)
            } else if (i < 14) {
                tmpdata2.push(data_)
            } else if (i < 21) {
                tmpdata3.push(data_)
            } else {
                tmpdata4.push(data_)
            }
        }
        this.setState({
            data1: tmpdata1,
            data2: tmpdata2,
            data3: tmpdata3,
            data4: tmpdata4
        })
    }

    getCurrentDate = (day, date) => {
        day = parseInt(day)
        return day + (date.getTime() % oneDay)
    }

    saveScheduleButton = () => {
        console.log(this.state)
        let uploaddata = []
        let tmpData = this.state.data1.concat(this.state.data2, this.state.data3, this.state.data4)
        for (let i = 0; i < tmpData.length; i++) {
            if (tmpData[i].scheduleType != 'dayoff') {
                if (tmpData[i].startTime == picktime) {
                    message.error('Please select work start time!')
                    return
                }
                if (tmpData[i].endTime == picktime) {
                    message.error('Please select work end time!')
                    return
                }
                if (tmpData[i].launchEnd != picktime && tmpData[i].launchStart == picktime) {
                    message.error('Please select launch start time!')
                    return
                }
                if (tmpData[i].launchEnd == picktime && tmpData[i].launchStart != picktime) {
                    message.error('Please select launch end time!')
                    return
                }

                if (!(tmpData[i].startTime instanceof Date)) {
                    tmpData[i].startTime = new Date(tmpData[i].startTime)
                }
                if (!(tmpData[i].endTime instanceof Date)) {
                    tmpData[i].endTime = new Date(tmpData[i].endTime)
                }
                if (tmpData[i].startTime.getTime() >= tmpData[i].endTime.getTime()) {
                    message.error('The end time must be greater than the start time')
                    return
                }

                uploaddata.push({
                    day: tmpData[i].day,
                    startTime: tmpData[i].startTime.getTime(),
                    endTime: tmpData[i].endTime.getTime(),
                    scheduleType: tmpData[i].scheduleType,
                    launchStart: tmpData[i].launchStart == picktime ? '' : tmpData[i].launchStart,
                    launchEnd: tmpData[i].launchEnd == picktime ? '' : tmpData[i].launchEnd
                })
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        let postData = {
            employeeid: this.state._id[0],
            employeeAdminid: this.state.employeeAdminid,
            data: uploaddata
        }
        this.setState({ loading: true })
        axios
            .post(`${API}/admin/postEmployeeSchedule`, JSON.stringify(postData), axiosConfig)
            .then(res => {
                if (res.status === 200) {
                    message.success('Save Success!')
                } else {
                    console.log(res)
                    // 这里处理一些错误信息
                }
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
                message.error(err.message)
            })
    }
    saveServicesButton = item => {
        let employee = JSON.parse(localStorage.getItem('employee'))
        let success = false
        let b = []
        this.state.treeData.map(data => {
            b.push(data.key)
        })
        let keys = this.state.checkedKeys.filter(v => {
            return b.indexOf(v) == -1
        })
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].length > 1) {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
                var postData = {
                    employeeId: employee.employeeid,
                    serviceId: keys[i]
                }
                axios
                    .post(`${API}/service/addServiceBond`, postData, axiosConfig)
                    .then(res => {
                        if (res.status === 200) {
                            success = true
                        } else {
                            console.log(res)
                            success = false
                        }
                    })
                    .catch(err => {
                        message.error(err.response.data)
                        success = false
                    })
            }
        }
        if (success === false) {
            message.success('Save Success!')
        }
    }

    onSelectItemHandler = item => {
        let employee = JSON.parse(localStorage.getItem('employee'))
        if (item._id === undefined) {
            for (let i = 0; i < item.children.length; i++) {
                if (item.children[i].state === 1) {
                    saveSelected = [
                        ...saveSelected,
                        { employeeId: employee.employeeid, serviceId: item.children[i]._id }
                    ]
                } else {
                    let tempSelected = []
                    tempSelected = [...saveSelected]
                    saveSelected = []
                    for (let i = 0; i < tempSelected.length; i++) {
                        if (tempSelected[i].serviceId != item.children[i]._id) {
                            saveSelected = [
                                ...saveSelected,
                                { employeeId: tempSelected[i].employeeId, serviceId: tempSelected[i].serviceId }
                            ]
                        }
                    }
                }
            }
        } else {
            if (item.state === 1) {
                saveSelected = [...saveSelected, { employeeId: employee.employeeid, serviceId: item._id }]
            } else {
                let tempSelected = []
                tempSelected = [...saveSelected]
                saveSelected = []
                for (let i = 0; i < tempSelected.length; i++) {
                    if (tempSelected[i].serviceId != item._id) {
                        saveSelected = [
                            ...saveSelected,
                            { employeeId: tempSelected[i].employeeId, serviceId: tempSelected[i].serviceId }
                        ]
                    }
                }
            }
        }
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition })
    }
    handleClose = () => {
        this.setState({ visible: false })
    }

    validateFormFields = () => {
        let nameError = ''
        if (this.state.name === '') {
            nameError = 'Please enter the name'
        }
        if (nameError) {
            this.setState({
                nameError: nameError
            })
            return false
        }
        return true
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validateFormFields = () => {
        let nameError = ''
        let emailError = ''
        let phoneError = ''
        let addressError = ''

        if (this.state.name === '') nameError = 'Please enter the name'
        if (!this.state.email.includes('@')) emailError = 'Please enter valid email'
        else if (!this.state.email.includes('.')) emailError = 'Please enter valid email'
        if (this.state.phone === '') phoneError = 'Please enter the phone number'
        if (this.state.address === '') addressError = 'Please enter the address'

        if (nameError || emailError || phoneError || addressError) {
            this.setState({
                nameError: nameError,
                emailError: emailError,
                phoneError: phoneError,
                addressError: addressError
            })
            return false
        }
        return true
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.validateFormFields()) {
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            var postData = {
                _id: this.state._id,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                categoryId: this.state.categoryId
            }
            axios
                .post(`${API}/employee/updateEmployee`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('Edit Success!')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({
                nameError: '',
                emailError: '',
                phoneError: '',
                addressError: ''
            })
        }
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!')
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['@gmail.com', '@icloud.com', '@hotmail.com'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
    }

    onDragEnter = info => {
        console.log(info)
        // expandedKeys 需要受控时设置
        this.setState({
            expandedKeys: info.expandedKeys
        })
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys)
        this.setState({
            expandedKeys,
            autoExpandParent: false
        })
    }

    onDrop = info => {
        console.log(info)
        const dropKey = info.node.props.eventKey
        const dragKey = info.dragNode.props.eventKey
        const dropPos = info.node.props.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr)
                }
                if (item.children) {
                    return loop(item.children, key, callback)
                }
            })
        }
        const data = [...this.state.gData]

        // Find dragObject
        let dragObj
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1)
            dragObj = item
        })

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || []
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj)
            })
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || []
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.unshift(dragObj)
            })
        } else {
            let ar
            let i
            loop(data, dropKey, (item, index, arr) => {
                ar = arr
                i = index
            })
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj)
            } else {
                ar.splice(i + 1, 0, dragObj)
            }
        }

        this.setState({
            gData: data
        })
    }

    onCheck = checkedKeys => {
        this.setState({ checkedKeys })
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info)
        this.setState({ selectedKeys })
    }

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode key={item.key} {...item} />
        })

    onChange = e => {
        const { value } = e.target
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData)
                }
                return null
            })
            .filter((item, i, self) => item && self.indexOf(item) === i)
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        })
    }

    render() {
        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb
                        arr={['Employee', 'Schedule and Services', this.state.name[0]]}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Tabs defaultActiveKey='0' size={'small'}>
                                <TabPane tab='Schedule' key='1'>
                                    <ScheduleEmployeeRow title={this.state.week1} data={this.state.data1} />
                                    <ScheduleEmployeeRow title={this.state.week2} data={this.state.data2} />
                                    <ScheduleEmployeeRow title={this.state.week3} data={this.state.data3} />
                                    <ScheduleEmployeeRow title={this.state.week4} data={this.state.data4} />
                                    <div style={{ float: 'left' }}>
                                        <Select
                                            value={this.state.selectTimePeriod}
                                            onChange={this.changeTimePeriod}
                                            dropdownMatchSelectWidth={false}>
                                            {this.state.timePeriod.map((data, index) => {
                                                return (
                                                    <Option value={index} key={index}>
                                                        {data.start + ' - ' + data.end}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                        <Button
                                            style={{ marginTop: 10, marginLeft: 10 }}
                                            type='primary'
                                            htmlType='submit'
                                            onClick={this.saveScheduleButton}
                                            loading={this.state.loading}>
                                            Save
                                        </Button>
                                    </div>
                                </TabPane>
                                <TabPane tab='Services' key='2'>
                                    <Tree
                                        checkable={true}
                                        onCheck={this.onCheck}
                                        checkedKeys={this.state.checkedKeys}
                                        defaultExpandAll={true}>
                                        {this.renderTreeNodes(this.state.treeData)}
                                    </Tree>
                                    <Button
                                        style={{ marginTop: 10, marginLeft: 10 }}
                                        type='primary'
                                        htmlType='submit'
                                        onClick={this.saveServicesButton}
                                        loading={this.state.loading}>
                                        Save
                                    </Button>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default EditEmployeeView
