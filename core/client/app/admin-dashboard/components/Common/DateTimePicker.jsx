import React, { Component } from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { Button } from 'react-bootstrap'
import moment from 'moment'

class DateTimePicker extends Component {

    render() {
        let { start, end } = this.props;
        let label = start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY');
        let now = new Date();
        let ranges = {
            "Today Only": [moment(now).startOf("day"), moment(now).endOf("day")],
            "Yesterday Only": [moment(now).subtract(1, "days").startOf("day"), moment(now).subtract(1, "days").endOf("day")],
            "Last 7 Days": [moment(now).subtract(7, "days").startOf("day"), moment(now).subtract(1, "days").endOf("day")],
            "Last 30 Days": [moment(now).subtract(30, "days").startOf("day"), moment(now).subtract(1, "days").endOf("day")],
            "Last month": [moment(now).subtract(1, "month").startOf("month").startOf('day'), moment(now).subtract(1, "month").endOf("month").endOf('day')]
        }
        let local = {
            "format": "DD-MM-YYYY HH:mm",
            "sundayFirst": false
        }
        let maxDate = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).add(1, "days").subtract(1, "seconds")
        return (
            <div className="form-group">
                <DateTimeRangeContainer
                    ranges={ranges}
                    start={start}
                    end={end}
                    local={local}
                    maxDate={maxDate}
                    applyCallback={this.props.applyCallback}
                >
                    <div className="input-group">
                        <input type="text" className="form-control" value={label} />

                        <span className="input-group-btn">
                            <Button className="default date-range-toggle">
                                <i className="icon-calendar" />
                            </Button>
                        </span>
                    </div>
                </DateTimeRangeContainer>
            </div>
        );
    }
}

export default DateTimePicker;