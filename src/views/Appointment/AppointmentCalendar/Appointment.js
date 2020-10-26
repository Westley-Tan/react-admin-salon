import React from 'react'
import Query from 'devextreme/data/query'
import 'devextreme/localization/date'

export default function Appointment(model) {
    const { appointmentData } = model.data
    return (
        <div className='showtime-preview'>
            <div>
                <h4>
                    <b>{appointmentData.name}</b>
                </h4>
                <h4>
                    <b>{appointmentData.subCategory}</b>
                </h4>
                <h4>
                    <b>{appointmentData.duration} minutes</b>
                </h4>
            </div>
        </div>
    )
}
