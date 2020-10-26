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

class EditMerchantView extends Component {
    constructor(props) {
        super(props)

        let _id, userName, address, email
        _id = this.props.location.state._id
        userName = this.props.location.state.userName
        address = this.props.location.state.address
        email = this.props.location.state.email
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: true,
            _id: _id,
            userName: userName,
            address: address,
            email: email
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            let { userName, address, email } = fieldsValue

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }

            var postData = {
                _id: this.state._id,
                userName: userName,
                address: address,
                email: email
            }
            axios
                .put(`${API}/admin/updateMerchant`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('edit Success!')
                    } else {
                        console.log(res)
                    }
                    console.log(postData)
                })
                .catch(err => {
                    console.log(postData)
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

        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Shop', 'Edit Shop']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Shop Name</span>}>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input name' }],
                                        initialValue: `${this.state.userName}`
                                    })(<Input placeholder='Please input name' value={'fsdfs'} />)}
                                </Form.Item>
                                <Form.Item label={<span>Address</span>}>
                                    {getFieldDecorator('address', {
                                        rules: [{ required: true, message: 'Please input address' }],
                                        initialValue: `${this.state.address}`
                                    })(<Input placeholder='Please input address' value={'fsdfs'} />)}
                                </Form.Item>
                                <Form.Item label={<span>Email</span>}>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'Please input correct email!'
                                            },
                                            {
                                                required: true,
                                                message: 'Please input email'
                                            }
                                        ],
                                        initialValue: `${this.state.email}`
                                    })(
                                        <AutoComplete
                                            dataSource={websiteOptions}
                                            onChange={this.handleWebsiteChange}
                                            placeholder='Please input email'>
                                            <Input />
                                        </AutoComplete>
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(EditMerchantView)

export default WrappedNormalLoginForm
