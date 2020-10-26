import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Table, Button, Anchor, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'

class CategoryList extends Component {
    state = {
        data: []
    }

    editCategory(text) {
        this.props.history.push({
            pathname: '/employee/editCategonry',
            search: '?_id=' + text._id,
            state: {
                _id: text._id,
                name: text.name
            }
        })
    }

    deleteCategory = _id => {
        if (!window.confirm('Please confirm the delete operation!')) {
            return
        }
        axios
            .post(
                `${API}/category/deleteCategory`,
                {
                    _id: _id
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer' + localStorage.getItem('jwt')
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
            pathname: '/employee/addCategory'
        })
    }

    componentDidMount = () => {
        axios
            .get(`${API}/category/getAllCategory`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    var data = []
                    for (let i = 0; i < res.data.length; i++) {
                        data.push({
                            key: i,
                            _id: res.data[i]._id,
                            name: res.data[i].name
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
                    <CustomBreadcrumb arr={['Employee Management', 'Category List']} />
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
                                        title: 'Action',
                                        key: 'action',
                                        render: (text, record) => (
                                            <span>
                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.editCategory(text)
                                                    }}>
                                                    Edit
                                                </Button>

                                                <Button
                                                    type='link'
                                                    onClick={() => {
                                                        this.deleteCategory(text._id)
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
                        Add Category
                    </Button>
                </div>
            </Layout>
        )
    }
}

export default CategoryList
