import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Table, message } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'

class InventoryLogList extends Component {
    state = {
        entryList: []
    }

    componentDidMount = () => {
        axios
            .get(`${API}/inventoryLog/getAllInventoryLog`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = []
                    console.log(res.data)
                    res.data.forEach(entry => {
                        data.push({
                            _id: entry._id,
                            recorderName: entry.employeeDoc[0].name,
                            merchandiseName: entry.merchandiseDoc[0].name,
                            stockLog: entry.stockLog
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
                    <CustomBreadcrumb arr={['Merchandise Management', 'Inventory Log List']} />
                </div>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <Table
                                columns={[
                                    {
                                        title: 'Recorder Name',
                                        dataIndex: 'recorderName',
                                        key: 'recorderName'
                                    },
                                    {
                                        title: 'Merchandise Name',
                                        dataIndex: 'merchandiseName',
                                        key: 'merchandiseName'
                                    },
                                    {
                                        title: 'Stock Change',
                                        dataIndex: 'stockLog',
                                        key: 'stockLog'
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

export default InventoryLogList
