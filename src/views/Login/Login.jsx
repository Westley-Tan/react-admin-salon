import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '@/api'
import { API } from '@/api/config'
import '@/style/view-style/login.scss'

class Login extends Component {
    state = {
        loading: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password } = values

                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                var postData = {
                    email: username,
                    password: password
                }
                axios
                    .post(`${API}/admin/login`, postData, axiosConfig)
                    .then(res => {
                        if (res.status === 200) {
                            // localStorage.setItem('user', JSON.stringify(res.data.data.user))
                            // localStorage.setItem('token', res.data.data.token)
                            if (res.data.data.superAdmin) {
                                values.auth = 0
                            } else {
                                values.auth = 1
                            }
                            values.userId = res.data.data._id
                            localStorage.setItem('user', JSON.stringify(values))
                            localStorage.setItem('jwt', res.data.jwt)
                            this.enterLoading()
                            message.success('Login Success!')
                            this.props.history.push('/')
                        } else {
                            console.log(res)
                            // 这里处理一些错误信息
                        }
                    })
                    .catch(err => {
                        //message.error(err.response.data)
                        console.log(err)
                    })
                // localStorage.setItem('user', JSON.stringify(values))
                // this.enterLoading()
                // this.timer = setTimeout(() => {
                //     message.success('登录成功!')
                //     this.props.history.push('/')
                // }, 2000)
            }
        })
    }

    componentDidMount() {
        notification.open({
            message: '欢迎使用后台管理平台',
            duration: null,
            description: '账号 admin(管理员) 其他(游客) 密码随意'
        })
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>Backstage Management System </h3>
                        <Divider />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Username'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(
                                    <Input
                                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type='password'
                                        placeholder='Password'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    loading={this.state.loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Login))
