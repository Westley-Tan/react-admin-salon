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
    constructor(props) {
        super(props)

        let employee = JSON.parse(localStorage.getItem('employee'))
        if (employee.edit) {
            this.state = {
                confirmDirty: false,
                autoCompleteResult: [],
                visible: true,
                categoryList: [],

                id: employee.employeeid,
                username: employee.employeeName,
                email: employee.employeeEmail,
                phone: employee.employeePhone,
                address: employee.employeeAddress,
                employeeAdminid: employee.employeeAdminid,
                categoryId: employee.categoryId,
                edit: true
            }
        } else {
            this.state = {
                edit: false,

                confirmDirty: false,
                autoCompleteResult: [],
                visible: true,
                categoryList: []
            }
        }
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
                    this.setState({ categoryList: data })
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

            if (this.state.edit) {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
                var postData = {
                    _id: this.state._id,
                    name: this.state.username,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    categoryId: this.state.categoryId
                }
                axios
                    .post(`${API}/employee/updateEmployee`, postData, axiosConfig)
                    .then(res => {
                        if (res.status === 200) {
                            message.success('Edit Success!')
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                let { username, email, password, address, phone, categoryId } = values

                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                }
                var postData = {
                    name: username,
                    email: email,
                    password: password,
                    address: address ? address : '',
                    phone: phone ? phone : '',
                    categoryId: categoryId ? categoryId : ''
                }
                axios
                    .post(`${API}/admin/addEmployee`, postData, axiosConfig)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.form.resetFields()
                            // const { form } = this.props
                            message.success('Add Success!')
                        } else {
                            console.log(res)
                            // 这里处理一些错误信息
                        }
                    })
                    .catch(err => {
                        message.error(err.response.data)
                    })
            }
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!')
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['@gmail.com', '@icloud.com', '@hotmail.com'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
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
                    <CustomBreadcrumb arr={['Employees', 'Add Employee']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input name' }],
                                        initialValue: this.state.username
                                    })(<Input placeholder='Please input name' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label='Email'>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'Please input correct email!'
                                            },
                                            {
                                                required: true,
                                                message: 'Please input email!'
                                            }
                                        ],
                                        initialValue: this.state.email
                                    })(
                                        <AutoComplete
                                            dataSource={websiteOptions}
                                            onChange={this.handleWebsiteChange}
                                            placeholder='Please input email'>
                                            <Input />
                                        </AutoComplete>
                                    )}
                                </Form.Item>
                                {this.state.edit ? null : (
                                    <Form.Item label='Password' hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input password!'
                                                },
                                                {
                                                    validator: this.validateToNextPassword
                                                }
                                            ]
                                        })(<Input.Password placeholder='Please input password' />)}
                                    </Form.Item>
                                )}
                                {this.state.edit ? null : (
                                    <Form.Item label='Confirm Password' hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please confirm password!'
                                                },
                                                {
                                                    validator: this.compareToFirstPassword
                                                }
                                            ]
                                        })(
                                            <Input.Password
                                                onBlur={this.handleConfirmBlur}
                                                placeholder='Please confirm password'
                                            />
                                        )}
                                    </Form.Item>
                                )}

                                <Form.Item label='Address'>
                                    {getFieldDecorator('address', { initialValue: this.state.address })(
                                        <Input placeholder='Please input address' />
                                    )}
                                </Form.Item>
                                <Form.Item label='Phone'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: false, message: 'Please input phone number!' }],
                                        initialValue: this.state.phone
                                    })(<Input placeholder='Please input phone number' />)}
                                </Form.Item>

                                <Form.Item label='Category'>
                                    {getFieldDecorator('categoryId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please choose a group'
                                            }
                                        ],
                                        initialValue: this.state.categoryId
                                    })(
                                        <Select name='categoryId' id='categoryId'>
                                            {this.state.categoryList.map(entry => (
                                                <option value={entry._id} key={entry._id}>
                                                    {entry.name}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type='primary' htmlType='submit'>
                                        {this.state.edit ? 'Save' : 'Add'}
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
