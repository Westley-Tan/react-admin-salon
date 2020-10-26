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

class EditMerchandiseView extends Component {
    constructor(props) {
        super(props)

        let _id, name, price, stock, note
        _id = this.props.location.state._id
        name = this.props.location.state.name
        price = this.props.location.state.price
        stock = this.props.location.state.stock
        note = this.props.location.state.note
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: true,
            _id: _id,
            name: name,
            price: price,
            stock: stock,
            note: note,
            img: null
        }
        console.log(this.state)
    }

    onChange = e => {
        this.setState({ img: e.target.files[0] })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            let { name, price, stock, note } = fieldsValue

            let axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=fffffffff',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }

            var data = {
                _id: this.state._id,
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
                .put(`${API}/Merchandise/updateMerchandise`, postData, axiosConfig)
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
                    <CustomBreadcrumb arr={['Service Management', 'Edit Merchandise']} />
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label={<span>Name</span>}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input name' }],
                                        initialValue: `${this.state.name}`
                                    })(<Input placeholder='Please input name' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Price</span>}>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Please input price' }],
                                        initialValue: `${this.state.price}`
                                    })(<Input placeholder='Please input price' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Stock</span>}>
                                    {getFieldDecorator('stock', {
                                        rules: [{ required: true, message: 'Please input stock' }],
                                        initialValue: `${this.state.stock}`
                                    })(<Input placeholder='Please input stock' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Note</span>}>
                                    {getFieldDecorator('note', {
                                        initialValue: `${this.state.note}`
                                    })(<Input placeholder='Please input note' value={'fsdfs'} />)}
                                </Form.Item>

                                <Form.Item label={<span>Picture</span>}>
                                    {getFieldDecorator('img', {})(<Input type='file' onChange={this.onChange} />)}
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(EditMerchandiseView)

export default WrappedNormalLoginForm
