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

class EditRoomView extends Component {
    constructor(props) {
        super(props)

        let _id, name
        _id = this.props.location.state._id
        name = this.props.location.state.name
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: true,
            _id: { _id },
            name: { name }
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            let { name } = fieldsValue

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }

            var postData = {
                _id: this.state._id,
                name: name
            }
            axios
                .put(`${API}/room/updateRoom`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('edit Success!')
                    } else {
                        console.log(res)
                    }
                    console.log(postData)
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

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Service Management', 'Edit Room']} />
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input name' }],
                                        initialValue: `${this.state.name.name}`
                                    })(<Input placeholder='Please input name' value={'fsdfs'} />)}
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(EditRoomView)

export default WrappedNormalLoginForm
