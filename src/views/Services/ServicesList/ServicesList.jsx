import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'
import Moment from 'moment'

const { Column } = Table
const { Link } = Anchor

class ServicesList extends Component {
    state = {
        data: []
    }

    deleteService = _id => {
        if (!window.confirm('Please confirm the delete operation!')) {
            return
        }
        axios
            .post(
                `${API}/service/deleteService`,
                {
                    _id: _id
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
                    message.success(res.data)
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }
    addButton = () => {
        this.props.history.push({
            pathname: '/services/add'
        })
    }
    editService(text) {
        localStorage.setItem('service', JSON.stringify(text))
        this.props.history.push({
            pathname: '/services/edit'
        })
    }

    componentDidMount = () => {
        axios
            .get(`${API}/service/getAllService`, {
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
                            _id: res.data[i]._id,
                            name: res.data[i].name,
                            price: res.data[i].price,
                            description: res.data[i].description,
                            duration: res.data[i].duration,
                            categoryId: res.data[i].categoryId,
                            category: res.data[i].categoryId ? res.data[i].CategoryDoc[0].name : undefined,
                            roomId: res.data[i].roomId,
                            room: res.data[i].roomId ? res.data[i].RoomDoc[0].name : undefined
                        })
                    }
                    this.setState({ data: data })
                } else {
                    console.log(res)
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
                    <CustomBreadcrumb arr={['Services', 'Services List']}></CustomBreadcrumb>
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Table
                                columns={[
                                    {
                                        title: 'Name',
                                        dataIndex: 'name',
                                        key: 'name'
                                    },
                                    // {
                                    //     title: 'Category',
                                    //     dataIndex: 'category',
                                    //     key: 'category'
                                    // },
                                    {
                                        title: 'Price',
                                        dataIndex: 'price',
                                        key: 'price'
                                    },
                                    {
                                        title: 'Duration',
                                        dataIndex: 'duration',
                                        key: 'duration'
                                    },
                                    {
                                        title: 'Category',
                                        dataIndex: 'category',
                                        key: 'category'
                                    },
                                    {
                                        title: 'Room',
                                        dataIndex: 'room',
                                        key: 'room'
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                            <span>
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editService(text)
                                                    }}>
                                                    Edit
                                                </Button>

                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.deleteService(text._id)
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
                <div style={{ float: 'right' }}>
                    <Button style={{}} type='primary' htmlType='submit' onClick={this.addButton}>
                        Add Service
                    </Button>
                </div>
            </Layout>
        )
    }
}
export default ServicesList
