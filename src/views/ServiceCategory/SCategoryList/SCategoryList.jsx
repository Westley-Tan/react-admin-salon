import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Table, Button, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'

class SCategoryList extends Component {
    state = {
        entryList: []
    }

    editCategory(text) {
        this.props.history.push({
            pathname: '/services/EditSCategory',
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
            .delete(`${API}/HRSCategory/deleteHRSCategory/${_id}`, {
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
            pathname: '/services/addSCategory'
        })
    }

    componentDidMount = () => {
        axios
            .get(`${API}/HRSCategory/getAllHRSCategory`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = []
                    res.data.forEach(entry => {
                        data.push({
                            _id: entry._id,
                            name: entry.name
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
                    <CustomBreadcrumb arr={['Service Management', 'Category List']} />
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

export default SCategoryList
