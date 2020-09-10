import React, { Component } from 'react';

class SelectForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || ''
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value != this.state.value) {
            return true
        }

        return false
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })

        this.props.handleChange(e.target.name, e.target.value)
    }

    renderOpts = () => {
        let { dataOpts } = this.props
        key = key || 'value'
        label = label || 'label'

        return dataOpts.map((opts, idx) => {
            return <option value={opts[value]} key={idx}>{opts[label]}</option>
        })
    }

    render() {
        let { icon } = this.props ;
        return (
            <div className="input-group">
                <span className="input-group-addon"><i className={icon}></i></span>
                <select name={this.props.name} className="form-control" value={this.state.value} onChange={this.handleChange}>
                    {this.renderOpts()}
                </select>
            </div>
        );
    }
}

export default SelectForm;