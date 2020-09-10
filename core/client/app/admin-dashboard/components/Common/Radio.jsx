import React, { Component } from 'react';

class Radio extends Component {

    changeRadio = (e) => {
        let { name } = this.props
        let isCheck = e.target.checked
        let value = e.target.value
        this.props.changeRadio(name, value, isCheck)
    }

    renderTitle() {
        let { dataSelect, value,name } = this.props ;
        return dataSelect.map((tit, idx) => {
            let isCheck = parseInt(value) == tit.value ? true : false
            return (
                <div className="radio" key={`${name}_${idx}`}>
                <label>
                        <span className={isCheck ? 'checked' : ''}>
                            <input type="radio" className="styled" name={this.props.name} checked={isCheck} value={tit.value} onChange={this.changeRadio.bind(this)} />
                        </span>
                    {tit.label}
                </label>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                {this.renderTitle()}
            </div>
        );
    }
}

export default Radio;