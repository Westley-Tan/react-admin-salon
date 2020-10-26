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
    message
} from 'antd'
import moment from 'moment'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'

let shopName, shopTel, addressLine1, addressLine2, addressLine3
let primaryContactEmail, primaryContactName, primaryContactTel
let secondaryContactEmail, secondaryContactName, secondaryContactTel
let currentSelected
let timePeriodList = []
const { Option } = Select

const weekDaysName = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']

let columnHoursOperation = [
    {
        title: '',
        dataIndex: 'week',
        key: 'week'
    },
    {
        title: 'Open Time',
        dataIndex: 'open',
        key: 'open'
    },
    {
        title: 'Close Time',
        dataIndex: 'close',
        key: 'close'
    }
]

let columnClosingDay = [
    {
        title: '',
        dataIndex: 'closedate',
        key: 'closedate'
    },
    {
        title: '',
        dataIndex: 'closeday',
        key: 'closeday'
    },
    {
        title: '',
        dataIndex: 'closedesc',
        key: 'closedesc'
    }
]

class LocationInfoView extends Component {
    constructor(props) {
        super()
        this.state = {
            selectTimePeriod: 0,
            timePeriod: [],
            dataHoursOperation: [
                {
                    key: '1',
                    week: 'Monday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '2',
                    week: 'Tuesday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '3',
                    week: 'Wednesday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '4',
                    week: 'Thursday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '5',
                    week: 'Friday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '6',
                    week: 'Satuarday',
                    open: '-',
                    close: '-'
                },
                {
                    key: '7',
                    week: 'Sunday',
                    open: '-',
                    close: '-'
                }
            ],
            dataClosingDay: [
                {
                    key: '1',
                    closedate: '',
                    closeday: '',
                    closedesc: ''
                }
            ]
        }
    }

    componentDidMount() {
        this.getLocationInfo()
        this.setWeekSelection()
        this.getWeekOperation()
        this.getAllCloseDate()
    }

    setWeekSelection = () => {
        let currentDate = new Date()
        let dateSetWeekFrom = new Date()
        let dateSetWeekTo = new Date()
        let currentWeek
        let firstWeek
        timePeriodList = []
        if (currentDate.getDay != 1) {
            while (currentDate.getDay() != 1) {
                currentDate.setDate(currentDate.getDate() - 1)
            }
        }
        for (let i = 1; i < 5; i++) {
            dateSetWeekFrom = currentDate
            dateSetWeekTo.setDate(dateSetWeekFrom.getDate() + 6)
            currentWeek =
                dateSetWeekFrom.getFullYear().toString() +
                '/' +
                (dateSetWeekFrom.getMonth() + 1).toString().padStart(2, '0') +
                '/' +
                dateSetWeekFrom
                    .getDate()
                    .toString()
                    .padStart(2, '0') +
                ' ~ ' +
                dateSetWeekTo.getFullYear().toString() +
                '/' +
                (dateSetWeekTo.getMonth() + 1).toString().padStart(2, '0') +
                '/' +
                dateSetWeekTo
                    .getDate()
                    .toString()
                    .padStart(2, '0')
            timePeriodList.push(currentWeek)
            if (i === 1) firstWeek = currentWeek
            currentDate.setDate(dateSetWeekFrom.getDate() + 7)
        }
        this.setState({
            selectTimePeriod: 0,
            timePeriod: timePeriodList
        })
        currentSelected = 0
    }

    getLocationInfo = () => {
        axios
            .get(`${API}/admin/getLocationInfo`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        shopName = res.data[0].shopName
                        shopTel = res.data[0].shopTel
                        addressLine1 = res.data[0].addressLine1
                        addressLine2 = res.data[0].addressLine2
                        addressLine3 = res.data[0].addressLine3
                        primaryContactEmail = res.data[0].primaryContactEmail
                        primaryContactName = res.data[0].primaryContactName
                        primaryContactTel = res.data[0].primaryContactTel
                        secondaryContactEmail = res.data[0].secondaryContactEmail
                        secondaryContactName = res.data[0].secondaryContactName
                        secondaryContactTel = res.data[0].secondaryContactTel
                        this.setState({
                            aa: res.data[0].shopName
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

    getWeekOperation = () => {
        let dateSearch = timePeriodList[currentSelected].split(' ~ ')
        let dataList = []
        let dataDate = new Date()

        axios
            .post(
                `${API}/admin/getWeekOperation`,
                {
                    dateFrom: dateSearch[0],
                    dateTo: dateSearch[1]
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
                            dataDate = new Date(res.data[i].shopDate)
                            dataList.push({
                                key: i + 1,
                                week: weekDaysName[dataDate.getDay()],
                                open: res.data[i].shopOpenTime,
                                close: res.data[i].shopCloseTime
                            })
                        }
                        this.setState({
                            dataHoursOperation: dataList
                        })
                    } else {
                        this.setState({
                            dataHoursOperation: [
                                {
                                    key: '1',
                                    week: 'Monday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '2',
                                    week: 'Tuesday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '3',
                                    week: 'Wednesday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '4',
                                    week: 'Thursday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '5',
                                    week: 'Friday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '6',
                                    week: 'Satuarday',
                                    open: '-',
                                    close: '-'
                                },
                                {
                                    key: '7',
                                    week: 'Sunday',
                                    open: '-',
                                    close: '-'
                                }
                            ]
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

    getAllCloseDate = () => {
        let dataList = []
        let dataDate = new Date()

        axios
            .post(
                `${API}/admin/getShopCloseDate`,
                {
                    shopOpen: 'close'
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
                            dataDate = new Date(res.data[i].shopDate)
                            dataList.push({
                                key: i + 1,
                                closedate: res.data[i].shopDate,
                                closeday: weekDaysName[dataDate.getDay()],
                                closedesc: res.data[i].shopCloseDesc
                            })
                        }
                        this.setState({
                            dataClosingDay: dataList
                        })
                    } else {
                        this.setState({
                            dataClosingDay: [
                                {
                                    key: '1',
                                    closedate: '',
                                    closeday: '',
                                    closedesc: ''
                                }
                            ]
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

    changeTimePeriod = selectTimePeriod => {
        this.setState({ selectTimePeriod })
        currentSelected = selectTimePeriod
        this.getWeekOperation()
    }

    render() {
        return (
            <Layout className='animated fadeIn'>
                <div className='base-style'>
                    <h2>Location Info</h2>
                    <Row gutter={8}>
                        <Col span={8}>
                            <div className='base-style'>
                                <h5>
                                    <b>{shopName}</b>
                                </h5>
                                <br />
                                {addressLine1}
                                <br />
                                {addressLine2}
                                <br />
                                {addressLine3}
                                <br />
                                <br />
                                {shopTel}
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='base-style'>
                                <h5>
                                    <b>Primary Contact</b>
                                </h5>
                                <br />
                                {primaryContactName}
                                <br />
                                {primaryContactEmail}
                                <br />
                                {primaryContactTel}
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='base-style'>
                                <h5>
                                    <b>Secondary Contact</b>
                                </h5>
                                <br />
                                {secondaryContactName}
                                <br />
                                {secondaryContactEmail}
                                <br />
                                {secondaryContactTel}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <div className='base-style'>
                                <Row gutter={8}>
                                    <Col span={8}>
                                        <h5>
                                            <b>Hours Of Operation</b>
                                        </h5>
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            value={this.state.selectTimePeriod}
                                            onChange={this.changeTimePeriod}
                                            dropdownMatchSelectWidth={false}>
                                            {this.state.timePeriod.map((data, index) => {
                                                return (
                                                    <Option key={index} value={index}>
                                                        {data}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    </Col>
                                </Row>
                                <Table
                                    dataSource={this.state.dataHoursOperation}
                                    columns={columnHoursOperation}
                                    pagination={{
                                        hideOnSinglePage: true
                                    }}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='base-style'>
                                <h5>
                                    <b>Closed Dates</b>
                                </h5>
                                <Table
                                    dataSource={this.state.dataClosingDay}
                                    columns={columnClosingDay}
                                    pagination={{
                                        hideOnSinglePage: true
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

export default LocationInfoView
