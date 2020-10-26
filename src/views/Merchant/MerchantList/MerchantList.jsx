import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'

const { Column } = Table
const { Link } = Anchor

class Tables extends Component {
    state = {
        data: []
    }

    editMerchant(text) {
        this.props.history.push({
            pathname: '/merchant/editMerchant',
            search: '?_id=' + text.id,
            state: {
                _id: text.id,
                userName: text.userName,
                address: text.address,
                email: text.email
            }
        })
    }

    componentDidMount = () => {
        axios
            .get(`${API}/admin/getAllMerchant`, {
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
                            userName: res.data[i].userName,
                            email: res.data[i].email,
                            address: res.data[i].address
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
                    <CustomBreadcrumb arr={['通用', '按钮']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Table
                                columns={[
                                    {
                                        title: 'Shop name',
                                        dataIndex: 'userName',
                                        key: 'userName',
                                        render: text => <Button type='link'>{text}</Button>
                                    },
                                    // {
                                    //     title: 'Id',
                                    //     dataIndex: 'id',
                                    //     key: 'id'
                                    // },
                                    {
                                        title: 'Address',
                                        dataIndex: 'address',
                                        key: 'address'
                                    },
                                    {
                                        title: 'Email',
                                        dataIndex: 'email',
                                        key: 'email'
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                            <span>
                                                <Divider type='vertical' />
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editMerchant(text)
                                                    }}>
                                                    Edit
                                                </Button>
                                                <Button type='link'>Delete</Button>
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

export default Tables
