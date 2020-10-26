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
    PageHeader,
    Descriptions,
    message
} from 'antd'
import moment from 'moment'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'

let employeeData = []
let serviceData = []

class ListReservationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataReservations: [
                {
                    reservations: []
                }
            ],
            dataEvents: []
        }
    }

    componentDidMount() {
        this.setReservationsData()
        this.getEmployeeData()
        this.getServiceData()
    }

    setReservationsData = () => {
        let type, userId, shopId, email, shopName
        let data = []
        this.setState({
            dataReservations: []
        })
        axios
            .get(`${API}/appointment/getAllReservation`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        type = res.data[i]._id.type
                        if (res.data[i]._id.type === 'user') {
                            userId = res.data[i]._id.userId
                            shopId = ''
                            shopName = ''
                            if (res.data[i].docUser.length > 0) {
                                email = res.data[i].docUser[0].email
                            } else {
                                email = ''
                            }
                        } else {
                            userId = ''
                            shopId = res.data[i]._id.shopId
                            shopName = res.data[i].docAdmin[0].shopName
                            email = res.data[i].docAdmin[0].email
                        }

                        data.push({
                            key: i,
                            type: type,
                            userId: userId,
                            shopId: shopId,
                            shopName: shopName,
                            email: email,
                            reservations: res.data[i].reservations
                        })
                    }
                    this.setState({ dataReservations: data })
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getEmployeeData = () => {
        axios
            .get(`${API}/appointment/getAllEmployee`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        employeeData.push({
                            _id: res.data[i]._id,
                            name: res.data[i].name,
                            email: res.data[i].email,
                            phone: res.data[i].phone,
                            adminid: res.data[i].adminid
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

    getServiceData = () => {
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
                            serviceData.push({
                                _id: res.data[i]._id,
                                name: res.data[i].name,
                                duration: res.data[i].duration,
                                price: res.data[i].price,
                                description: res.data[i].description,
                                adminid: res.data[i].adminid
                            })
                        }
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    listReservations = text => {
        let data = []
        let day, start, end
        let employee
        let service

        for (let i = 0; i < text.reservations.length; i++) {
            if (text.reservations[i].event.length > 0) {
                employee = employeeData.find(element => element._id === text.reservations[i].event[0].employeeId)
                service = serviceData.find(element => element._id === text.reservations[i].event[0].serviceId)
                day = new Date(text.reservations[i].event[0].day)
                start = new Date(text.reservations[i].event[0].start)
                end = new Date(text.reservations[i].event[0].end)
                data.push({
                    username: text.reservations[i].event[0].username,
                    userId: text.reservations[i].event[0].userId,
                    shopId: text.reservations[i].event[0].shopId,
                    message: text.reservations[i].event[0].message,
                    employeeName: employee.name,
                    serviceName: service.name,
                    duration: text.reservations[i].event[0].duration,
                    day:
                        day.getFullYear() +
                        '-' +
                        ('0' + (day.getMonth() + 1)).slice(-2) +
                        '-' +
                        ('0' + day.getDate()).slice(-2),
                    start: ('0' + start.getHours()).slice(-2) + ':' + ('0' + start.getMinutes()).slice(-2),
                    end: ('0' + end.getHours()).slice(-2) + ':' + ('0' + end.getMinutes()).slice(-2)
                })
            }
        }
        this.setState({
            dataEvents: data
        })
    }

    render() {
        let columns = [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Shop Name',
                dataIndex: 'shopName',
                key: 'shopName'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button
                            type='link'
                            onClick={() => {
                                this.listReservations(text)
                            }}>
                            List Reservation
                        </Button>
                    </span>
                )
            }
        ]

        let columnsEvent = [
            {
                title: 'User Name',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'Message',
                dataIndex: 'message',
                key: 'message'
            },
            {
                title: 'Employee',
                dataIndex: 'employeeName',
                key: 'employeeName'
            },
            {
                title: 'Service',
                dataIndex: 'serviceName',
                key: 'serviceName'
            },
            {
                title: 'Day',
                dataIndex: 'day',
                key: 'day'
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start'
            },
            {
                title: 'End',
                dataIndex: 'end',
                key: 'end'
            }
        ]

        return (
            <div>
                <Layout className='animated fadeIn'>
                    <div>
                        <CustomBreadcrumb arr={['Appointment', 'Reservation List']}></CustomBreadcrumb>
                    </div>
                    <div className='base-style'>
                        <Row>
                            <Col span={24}>
                                <Table
                                    dataSource={this.state.dataReservations}
                                    columns={columns}
                                    pagination={{ hideOnSinglePage: true }}
                                />
                            </Col>
                        </Row>
                    </div>
                    <h3>Reservations</h3>
                    <div className='base-style'>
                        <Row>
                            <Col span={24}>
                                <Table
                                    dataSource={this.state.dataEvents}
                                    columns={columnsEvent}
                                    pagination={{ hideOnSinglePage: true }}
                                />
                            </Col>
                        </Row>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default ListReservationView
