import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Table, Button, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'

class MerchandiseList extends Component {
    state = {
        entryList: []
    }

    editMerchandise(text) {
        this.props.history.push({
            pathname: '/merchandise/EditMerchandise',
            search: '?_id=' + text._id,
            state: {
                _id: text._id,
                name: text.name,
                price: text.price,
                stock: text.stock,
                note: text.note
            }
        })
    }

    deleteMerchandise = _id => {
        if (!window.confirm('Please confirm the delete operation!')) {
            return
        }
        console.log(_id)
        axios
            .delete(`${API}/Merchandise/deleteMerchandise/${_id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('jwt')
                }
            })
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
            pathname: '/merchandise/addMerchandise'
        })
    }

    componentDidMount = () => {
        axios
            .get(`${API}/merchandise/getAllMerchandise`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    let data = []
                    res.data.forEach(entry => {
                        data.push({
                            _id: entry._id,
                            name: entry.name,
                            price: entry.price,
                            stock: entry.stock,
                            note: entry.note
                        })
                    })
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
                    <CustomBreadcrumb arr={['Merchandise Management', 'Merchandise List']} />
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
                                    {
                                        title: 'Price',
                                        dataIndex: 'price',
                                        key: 'price'
                                    },
                                    {
                                        title: 'Stock',
                                        dataIndex: 'stock',
                                        key: 'stock'
                                    },
                                    {
                                        title: 'Note',
                                        dataIndex: 'note',
                                        key: 'note'
                                    },
                                    {
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                            <span>
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editMerchandise(text)
                                                    }}>
                                                    Edit
                                                </Button>

                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.deleteMerchandise(text._id)
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
                        Add Merchandise
                    </Button>
                </div>
            </Layout>
        )
    }
}

export default MerchandiseList
