import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Select, message, AutoComplete, Table } from 'antd'
import '@/style/view-style/form.scss'
import axios from '@/api'
import { API } from '@/api/config'
import Moment from 'moment'

const { Option } = Select
const weekArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
class ScheduleWeekRow extends Component {
    constructor(props) {
        super()
    }

    state = {
        data: [],
        dayArray: {}
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ data: nextProps.data, dayArray: nextProps.dayArray })
        }
    }

    render() {
        return (
            <Table
                columns={[
                    {
                        title: 'Name',
                        key: 'name',
                        render: (data, data1, index) => {
                            return (
                                <div>
                                    <div style={{ float: 'left' }}> {data.name}</div>
                                </div>
                            )
                        }
                    },
                    {
                        title: 'Hours for week',
                        key: 'hour',
                        render: (data, data1, index) => {
                            return (
                                <div>
                                    <div> {data.hours}</div>
                                </div>
                            )
                        }
                    },
                    {
                        title: this.state.dayArray[weekArray[0]],
                        render: (data, data1, index) => <div>{data.Monday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[1]],
                        render: (data, data1, index) => <div>{data.Tuesday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[2]],
                        render: (data, data1, index) => <div>{data.Wednesday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[3]],
                        render: (data, data1, index) => <div>{data.Thursday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[4]],
                        render: (data, data1, index) => <div>{data.Friday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[5]],
                        render: (data, data1, index) => <div>{data.Saturday}</div>
                    },
                    {
                        title: this.state.dayArray[weekArray[6]],
                        render: (data, data1, index) => <div>{data.Sunday}</div>
                    }
                ]}
                dataSource={this.state.data}
                pagination={false}
            />
        )
    }
}
class ScheduleEmployeeWeekView extends Component {
    constructor(props) {
        super()
        this.persons = []
        axios
            .get(`${API}/admin/getEmployeeListByGroup`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.persons = res.data.docs

                    let dt = 24 * 60 * 60 * 1000
                    // let offset = (new Date().getTimezoneOffset()) * 60 * 1000
                    let curDate = new Date()
                    curDate.setHours(12)
                    let timestamp = curDate.getTime() - 4 * dt
                    timestamp -= timestamp % (60 * 60 * 1000)
                    let tmpDays = parseInt((timestamp % (28 * dt)) / dt)

                    let timePeriod = []
                    // timestamp = timestamp - timestamp % (28 * dt) + 56 * dt + 3 * dt + offset
                    timestamp = timestamp - tmpDays * dt + 4 * dt

                    for (let i = 1; i < 11; i++) {
                        let endTimeStamp = timestamp + 28 * dt * i
                        timePeriod.push({
                            start: Moment(timestamp + 28 * dt * i - 27 * dt).format('LL'),
                            end: Moment(timestamp + 28 * dt * i).format('LL'),
                            startTimeStamp: endTimeStamp - 27 * dt,
                            endTimeStamp: endTimeStamp
                        })
                    }

                    this.setState({
                        timePeriod: timePeriod,
                        selectTimePeriod: 0
                    })
                    this.setPeriodData(timePeriod[this.state.selectTimePeriod])
                } else {
                    console.log(res)
                    // 这里处理一些错误信息
                }
            })
            .catch(err => {
                message.error(err)
            })
    }
    state = {
        data1: [],
        timePeriod: [],
        selectTimePeriod: 0,
        dayArray1: [],
        dayArray2: [],
        dayArray3: [],
        dayArray4: []
    }
    setPeriodData(tmpData) {
        let tmpdata1 = []
        let tmpdata2 = []
        let tmpdata3 = []
        let tmpdata4 = []

        let startTimeStamp = tmpData['startTimeStamp']
        let dt = 24 * 60 * 60 * 1000

        let dayArray1 = {}
        let dayArray2 = {}
        let dayArray3 = {}
        let dayArray4 = {}
        for (let i = 0; i < 28; i++) {
            let currentDay = dt * i + startTimeStamp
            let value_ = Moment(currentDay).format('dddd MMM Do')
            if (i < 7) {
                dayArray1[weekArray[i % 7]] = value_
            } else if (i < 14) {
                dayArray2[weekArray[i % 7]] = value_
            } else if (i < 21) {
                dayArray3[weekArray[i % 7]] = value_
            } else {
                dayArray4[weekArray[i % 7]] = value_
            }
        }

        for (let i = 0; i < this.persons.length; i++) {
            let groupData = this.persons[i]
            let data1_ = {}
            let data2_ = {}
            let data3_ = {}
            let data4_ = {}

            data1_['name'] = groupData.employee[0].name
            data1_['hours'] = 0
            data2_['name'] = groupData.employee[0].name
            data2_['hours'] = 0
            data3_['name'] = groupData.employee[0].name
            data3_['hours'] = 0
            data4_['name'] = groupData.employee[0].name
            data4_['hours'] = 0

            for (let j = 0; j < 28; j++) {
                let defaultValue = '-Day Off-'
                let defaultHour = 0.0
                let currentDay = dt * j + startTimeStamp //当天时间
                for (let k = 0; k < groupData.children.length; k++) {
                    let schedule = groupData.children[k]
                    if (currentDay == new Date(schedule.day).getTime() && schedule.scheduleType != 'dayoff') {
                        defaultValue =
                            Moment(schedule.startTime).format('hh:mm A') +
                            ' - ' +
                            Moment(schedule.endTime).format('hh:mm A')
                        defaultHour = this.calculateHour(schedule.startTime, schedule.endTime)
                        break
                    }
                }
                if (j < 7) {
                    data1_[weekArray[j % 7]] = defaultValue
                    data1_['hours'] += defaultHour
                } else if (j < 14) {
                    data2_[weekArray[j % 7]] = defaultValue
                    data2_['hours'] += defaultHour
                } else if (j < 21) {
                    data3_[weekArray[j % 7]] = defaultValue
                    data3_['hours'] += defaultHour
                } else {
                    data4_[weekArray[j % 7]] = defaultValue
                    data4_['hours'] += defaultHour
                }
            }
            tmpdata1.push(data1_)
            tmpdata2.push(data2_)
            tmpdata3.push(data3_)
            tmpdata4.push(data4_)
        }
        this.setState({
            data1: tmpdata1,
            data2: tmpdata2,
            data3: tmpdata3,
            data4: tmpdata4,
            dayArray1: dayArray1,
            dayArray2: dayArray2,
            dayArray3: dayArray3,
            dayArray4: dayArray4
        })
    }
    calculateHour(start, end) {
        let startArray = start.split(':')
        let endArray = end.split(':')
        return (
            (parseInt(endArray[0]) * 60 +
                parseInt(endArray[1]) -
                parseInt(startArray[0]) * 60 -
                parseInt(startArray[1])) /
            60.0
        )
    }
    changeTimePeriod = selectTimePeriod => {
        this.setState({ selectTimePeriod })
        this.setPeriodData(this.state.timePeriod[selectTimePeriod])
    }
    render() {
        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['Employee', 'Employee Schedule']}></CustomBreadcrumb>
                </div>
                <div style={{ float: 'left' }}>
                    <Select
                        value={this.state.selectTimePeriod}
                        onChange={this.changeTimePeriod}
                        dropdownMatchSelectWidth={false}>
                        {this.state.timePeriod.map((data, index) => {
                            return (
                                <Option value={index} key={index}>
                                    {data.start + ' - ' + data.end}
                                </Option>
                            )
                        })}
                    </Select>
                </div>

                <div style={stylesTitle}>
                    {this.state.dayArray1['Monday']
                        ? this.state.dayArray1['Monday'].replace('Monday ', '') +
                          ' - ' +
                          this.state.dayArray1['Sunday'].replace('Sunday ', '')
                        : ''}
                </div>
                <ScheduleWeekRow data={this.state.data1} dayArray={this.state.dayArray1} />
                <div style={stylesTitle}>
                    {this.state.dayArray2['Monday']
                        ? this.state.dayArray2['Monday'].replace('Monday ', '') +
                          ' - ' +
                          this.state.dayArray2['Sunday'].replace('Sunday ', '')
                        : ''}
                </div>
                <ScheduleWeekRow data={this.state.data2} dayArray={this.state.dayArray2} />
                <div style={stylesTitle}>
                    {this.state.dayArray3['Monday']
                        ? this.state.dayArray3['Monday'].replace('Monday ', '') +
                          ' - ' +
                          this.state.dayArray3['Sunday'].replace('Sunday ', '')
                        : ''}
                </div>
                <ScheduleWeekRow data={this.state.data3} dayArray={this.state.dayArray3} />
                <div style={stylesTitle}>
                    {this.state.dayArray4['Monday']
                        ? this.state.dayArray4['Monday'].replace('Monday ', '') +
                          ' - ' +
                          this.state.dayArray4['Sunday'].replace('Sunday ', '')
                        : ''}
                </div>
                <ScheduleWeekRow data={this.state.data4} dayArray={this.state.dayArray4} />
            </Layout>
        )
    }
}
const stylesTitle = {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
}

export default ScheduleEmployeeWeekView
