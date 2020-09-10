import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import moment from 'moment'

class DateInput extends Component {

    handleChangeDate(date) {
        let { name } = this.props
        this.props.changeDate(date, name)
    }

    render() {
        return (
            <DatePicker
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                selected={this.props.timeInput ? moment(this.props.timeInput) : moment()}
                onChange={this.handleChangeDate.bind(this)}
                className="form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                readOnly={this.props.readOnly}
            />
        );
    }
}

export default DateInput;