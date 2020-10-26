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

class AddMerchandiseView extends Component {
    state = {
        confirmDirty: false,
        AutoCompleteResult: [],
        visible: true,
        img: null
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return

            let { name, price, stock, note } = fieldsValue

            let axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=fffff',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            let data = {
                name: name,
                price: price,
                stock: stock,
                note: note
            }
            const postData = new FormData()
            postData.append('img', this.state.img)
            Object.keys(data).forEach(entry => {
                postData.append(entry, data[entry])
            })

            axios
                .post(`${API}/Merchandise/addMerchandise`, postData, axiosConfig)
                .then(res => {
                    if (res.status === 200) {
                        message.success('Add Success!')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    onChange = e => {
        this.setState({ img: e.target.files[0] })
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !value })
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
                    <CustomBreadcrumb arr={['Service Management', 'Add Merchandise']} />
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input name' }]
                                    })(<Input placeholder='Please input name' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Price</span>}>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Please input price' }]
                                    })(<Input placeholder='Please input price' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Stock</span>}>
                                    {getFieldDecorator('stock', {
                                        rules: [{ required: true, message: 'Please input stock' }]
                                    })(<Input placeholder='Please input stock' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Note</span>}>
                                    {getFieldDecorator('note', {
                                        //rules: [{ required: true, message: 'Please input note' }]
                                    })(<Input placeholder='Please input note' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Picture</span>}>
                                    {getFieldDecorator('img', {
                                        //rules: [{ required: true, message: 'Please input note' }]
                                    })(<Input type='file' onChange={this.onChange} />)}
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddMerchandiseView)

export default WrappedNormalLoginForm
