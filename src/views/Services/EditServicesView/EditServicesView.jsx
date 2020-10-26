import React, { Component, useState } from 'react'
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
    message
} from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

class FromView extends Component {
    constructor(props) {
        super(props)
        let _id, name, duration, price, description, categoryId, roomId

        let service = JSON.parse(localStorage.getItem('service'))

        _id = service._id
        name = service.name
        duration = service.duration
        price = service.price
        description = service.description
        categoryId = service.categoryId
        roomId = service.roomId
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: true,
            _id: { _id },
            name: { name },
            price: { price },
            description: { description },
            duration: { duration },
            categoryList: [],
            categoryId: categoryId,
            roomList: [],
            roomId: roomId
        }
    }

    componentDidMount() {
        this.getServiceCategoryList()
        this.getRoomList()
    }

    getServiceCategoryList = () => {
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
                    var data = []
                    for (let i = 0; i < res.data.length; i++) {
                        data.push({
                            key: i,
                            _id: res.data[i]._id,
                            name: res.data[i].name
                        })
                    }
                    this.setState({ categoryList: data })
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    getRoomList = () => {
        axios
            .get(`${API}/room/getAllRoom`, {
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
                    this.setState({ roomList: data })
                } else {
                    console.log(res)
                }
            })
            .catch(err => {
                message.error(err)
            })
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'] ? fieldsValue['date-picker'].format('YYYY-MM-DD') : ''
            }
            let { _id, name, price, description, duration, categoryId, roomId } = values
            _id = this.state._id
            // _id = window.location.href
            // _id = _id.split('=')[1]
            // _id = this.props.location.state._id
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            var postData = {
                _id: _id,
                name: name,
                price: price,
                description: description,
                duration: duration,
                categoryId: categoryId,
                roomId: roomId
            }
            axios
                .post(`${API}/service/updateService`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('Save Success!')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0
                },
                sm: {
                    span: 10,
                    offset: 6
                }
            }
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{ width: 70 }}>
                <Option value='86'>+86</Option>
                <Option value='87'>+87</Option>
            </Select>
        )

        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Services', 'Edit Services']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input name'
                                            }
                                        ],
                                        initialValue: `${this.state.name.name}`
                                    })(<Input placeholder='Please input name' />)}
                                </Form.Item>

                                <Form.Item label={<span>Duration</span>}>
                                    {getFieldDecorator('duration', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input duration'
                                            }
                                        ],
                                        initialValue: `${this.state.duration.duration}`
                                    })(<Input placeholder='Please input duration' />)}
                                </Form.Item>
                                <Form.Item label={<span>Price</span>}>
                                    {getFieldDecorator('price', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input service price'
                                            }
                                        ],
                                        initialValue: `${this.state.price.price}`
                                    })(<Input placeholder='Please input service price' />)}
                                </Form.Item>

                                <Form.Item label={<span>Description</span>}>
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input service description'
                                            }
                                        ],
                                        initialValue: this.state.description.description
                                            ? this.state.description.description
                                            : ''
                                    })(<Input placeholder='Please input service description' />)}
                                </Form.Item>

                                <Form.Item label='Category'>
                                    {getFieldDecorator('categoryId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please choose a category'
                                            }
                                        ],
                                        initialValue: this.state.categoryId
                                    })(
                                        <Select name='categoryId' id='categoryId'>
                                            {this.state.categoryList.map(entry => (
                                                <option value={entry._id}>{entry.name}</option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label='Room'>
                                    {getFieldDecorator('roomId', {
                                        // rules: [
                                        //     {
                                        //         required: true,
                                        //         message: 'Please choose a room'
                                        //     }
                                        // ],
                                        initialValue: this.state.roomId
                                    })(
                                        <Select name='roomId' id='roomId'>
                                            {this.state.roomList.map(entry => (
                                                <option value={entry._id}>{entry.name}</option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FromView)

export default WrappedNormalLoginForm
