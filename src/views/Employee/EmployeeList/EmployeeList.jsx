import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'
import Moment from 'moment'

const { Column } = Table
const { Link } = Anchor

class EmployeesTables extends Component {
    state = {
        data: []
    }
    deleteEmployee = id => {
        if (!window.confirm('Please confirm the delete operation!')) {
            return
        }
        axios
            .post(
                `${API}/admin/deleteEmployee`,
                {
                    id: id
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
                    console.log(res)
                    message.success(res.data, 1, () => window.location.reload())
                } else {
                    console.log(res)
                    // 这里处理一些错误信息
                }
            })
            .catch(err => {
                message.error(err)
            })
    }
    editEmployee(text) {
        let employeeData = {
            employeeid: text.id,
            employeeName: text.name,
            employeeEmail: text.email,
            employeePhone: text.phone,
            employeeAddress: text.address,
            employeeAdminid: text.adminid,
            categoryId: text.categoryId,
            edit: true
        }
        localStorage.setItem('employee', JSON.stringify(employeeData))
        this.props.history.push({
            pathname: '/employee/add'
        })
    }
    editSchedule(text) {
        let employeeData = {
            employeeid: text.id,
            employeeName: text.name,
            employeeEmail: text.email,
            employeePhone: text.phone,
            employeeAddress: text.address,
            employeeAdminid: text.adminid,
            categoryId: text.categoryId
        }
        localStorage.setItem('employee', JSON.stringify(employeeData))
        this.props.history.push({
            pathname: '/employee/edit'
        })
    }

    addButton = () => {
        let employeeData = {
            edit: false
        }
        localStorage.setItem('employee', JSON.stringify(employeeData))
        this.props.history.push({
            pathname: '/employee/add'
        })
    }
    componentDidMount = () => {
        axios
            .get(`${API}/admin/getAllMyEmployee`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    var data = []
                    for (let i = 0; i < res.data.length; i++) {
                        data.push({
                            key: i,
                            id: res.data[i]._id,
                            name: res.data[i].name,
                            email: res.data[i].email,
                            phone: res.data[i].phone,
                            address: res.data[i].address,
                            categoryId: res.data[i].categoryId,
                            datecreated: Moment(res.data[i].createTime).format('l, h:mm a'),
                            adminid: res.data[i].adminid
                        })
                    }
                    this.setState({ data: data })
                } else {
                    console.log(res)
                    // 这里处理一些错误信息
                }
            })
            .catch(err => {
                message.error(err)
            })
    }
    render() {
        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Employees', 'Employees List']}></CustomBreadcrumb>
                    <Button type='primary' htmlType='submit' onClick={this.addButton}>
                        Add Employee
                    </Button>
                </div>
                {/* <div style={{ float: 'right' }}>
                    <Button style={{}} type='primary' htmlType='submit' onClick={this.addButton}>
                        Add Employee
                    </Button>
                </div> */}
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Table
                                columns={[
                                    {
                                        title: 'Name',
                                        dataIndex: 'name',
                                        key: 'name',
                                        render: text => <Button type='link'>{text}</Button>
                                    },
                                    {
                                        title: 'Email',
                                        dataIndex: 'email',
                                        key: 'email'
                                    },
                                    {
                                        title: 'Phone',
                                        dataIndex: 'phone',
                                        key: 'phone'
                                    },
                                    {
                                        title: 'Address',
                                        dataIndex: 'address',
                                        key: 'address'
                                    },
                                    {
                                        title: 'Date Created',
                                        dataIndex: 'datecreated',
                                        key: 'datecreated'
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                            <span>
                                                {/* <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.scheduleEmployee(text)
                                                    }}>
                                                    Schedule
                                                </Button>
                                                <Divider type='vertical' /> */}
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editEmployee(text)
                                                    }}>
                                                    Edit
                                                </Button>
                                                <Divider type='vertical' />
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editSchedule(text)
                                                    }}>
                                                    Schedule and Services
                                                </Button>
                                                <Divider type='vertical' />
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.deleteEmployee(text.id)
                                                    }}>
                                                    Delete
                                                </Button>
                                            </span>
                                        )
                                    }
                                ]}
                                dataSource={this.state.data}
                            />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}
export default EmployeesTables
