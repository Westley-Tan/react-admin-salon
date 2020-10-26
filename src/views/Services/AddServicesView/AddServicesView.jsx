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
    message
} from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

class FromView extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        visible: true,
        categoryList: [],
        roomList: []
    }

    componentDidMount = () => {
        this.fetchHRSCategoryList()
        this.fetchRoomList()
    }

    fetchHRSCategoryList = () => {
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

    fetchRoomList = () => {
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

            let { name, duration, price, description, categoryId, roomId } = values

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            var postData = {
                name: name,
                duration: duration,
                price: price,
                description: description,
                categoryId: categoryId,
                roomId: roomId
            }
            axios
                .post(`${API}/service/addService`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('Add Success!')
                    } else {
                        console.log(res)
                        // 这里处理一些错误信息
                    }
                })
                .catch(err => {
                    console.log(err)
                    //message.error(err.response.data)
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
                    <CustomBreadcrumb arr={['Services', 'Add Services']}></CustomBreadcrumb>
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
                                        ]
                                    })(<Input placeholder='Please input name' />)}
                                </Form.Item>

                                <Form.Item label={<span>Duration</span>}>
                                    {getFieldDecorator('duration', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input service duration (minutes)'
                                            }
                                        ]
                                    })(<Input placeholder='Please input service duration (minutes)' />)}
                                </Form.Item>

                                <Form.Item label={<span>Price</span>}>
                                    {getFieldDecorator('price', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input service price'
                                            }
                                        ]
                                    })(<Input placeholder='Please input service price' />)}
                                </Form.Item>

                                <Form.Item label={<span>Description</span>}>
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input service description'
                                            }
                                        ]
                                    })(<Input placeholder='Please input service description' />)}
                                </Form.Item>

                                <Form.Item label='Category'>
                                    {getFieldDecorator('categoryId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please choose a category'
                                            }
                                        ]
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
                                        // ]
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
                                        Add
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
