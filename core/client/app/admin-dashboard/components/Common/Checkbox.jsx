import React, { Component } from 'react';

class Checkbox extends Component {
    onChange() {
        this.props.onChange({ isCheck: !this.props.isCheck, id: this.props.id });
    }

    render() {
        return (
            <div className="checkbox" style={{ fontSize: 16, marginTop: 0 }}>
                <label>
                    <div className="checker">
                        <span className={this.props.isCheck ? 'checked' : ''}>
                            <input type="checkbox" className="styled" checked={this.props.isCheck || false} onChange={this.onChange.bind(this)} />
                        </span>
                    </div>
                    {this.props.title}
                </label>
            </div>
        );
    }
}

export default Checkbox;