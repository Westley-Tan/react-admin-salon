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
        tabPosition: 'top'
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition })
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

            let { username, email, password, address, phone } = values

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
                phone: phone ? phone : ''
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
                    <CustomBreadcrumb arr={['Employee', 'Schedule Employee']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Divider orientation='left'>Week 1</Divider>
                            <div>
                                <div style={{ marginBottom: 16 }}>
                                    Tab position：
                                    <Select
                                        value={this.state.tabPosition}
                                        onChange={this.changeTabPosition}
                                        dropdownMatchSelectWidth={false}>
                                        <Option value='top'>top</Option>
                                        <Option value='bottom'>bottom</Option>
                                        <Option value='left'>left</Option>
                                        <Option value='right'>right</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input name' }]
                                    })(<Input placeholder='Please input name' />)}
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
                                        ]
                                    })(
                                        <AutoComplete
                                            dataSource={websiteOptions}
                                            onChange={this.handleWebsiteChange}
                                            placeholder='Please input email'>
                                            <Input />
                                        </AutoComplete>
                                    )}
                                </Form.Item>
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

                                <Form.Item label='Address'>
                                    {getFieldDecorator('address', {})(<Input placeholder='Please input address' />)}
                                </Form.Item>
                                <Form.Item label='Phone'>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: false, message: 'Please input phone number!' }]
                                    })(<Input placeholder='Please input phone number' />)}
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
