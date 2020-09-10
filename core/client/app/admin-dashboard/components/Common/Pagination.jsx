import React, { Component, Fragment } from 'react';

class Pagination extends Component {

    clickPage(page, e) {
        e.preventDefault();
        this.props.clickPage(page, this.props.number_per_page);
    }

    clickDisabled(e) {
        e.preventDefault();
    }

    changeNumberPerPage(page, e) {
        let number_per_page = e.target.value;
        this.props.clickPage(page, number_per_page);
    }

    render() {
        let { page, number_page, number_per_page, total } = this.props;
        if (number_page < 1) return ''
        return (
            <div className="table-footer">
                <div className="full-left" style={{ display: 'inline-block' }}>
                    <div className="form-inline">
                        <span>Hiển thị:</span>
                        <select className="form-control" onChange={this.changeNumberPerPage.bind(this, page)} value={this.props.number_per_page}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <div className="dataTables_info" id="DataTables_Table_1_info" role="status" aria-live="polite">Hiển thị phần tử từ {(page - 1) * number_per_page + 1} tới {(page * number_per_page <= total) ? (page) * number_per_page : total} trong tổng số {total} phần tử</div>
                </div>
                <div className="pull-right">
                    <ul className="pagination pagination-separated">
                        {page == 1 && (
                            <li className="disabled">
                                <a href="#" onClick={this.clickDisabled.bind(this)}>
                                    <span className="icon-arrow-left5"></span>
                                </a>
                            </li>
                        )}
                        {page > 1 && (
                            <Fragment>
                                <li>
                                    <a href="#" onClick={this.clickPage.bind(this, page - 1)}>
                                        <span className="icon-arrow-left5"></span>
                                    </a>
                                </li>
                                {page > 2 && <li><a href="#" onClick={this.clickPage.bind(this, page - 2)}>{page - 2}</a></li>}
                                <li><a href="#" onClick={this.clickPage.bind(this, page - 1)}>{page - 1}</a></li>
                            </Fragment>
                        )}

                        <li className="active"><a href="#">{page}</a></li>

                        {page < number_page && (
                            <Fragment>
                                <li><a href="#" onClick={this.clickPage.bind(this, page + 1)}>{page + 1}</a></li>
                                {page + 1 < number_page && <li><a href="#" onClick={this.clickPage.bind(this, page + 2)}>{page + 2}</a></li>}
                                <li>
                                    <a href="#" onClick={this.clickPage.bind(this, page + 1)}>
                                        <span className="icon-arrow-right5" role="button"></span>
                                    </a>
                                </li>

                            </Fragment>
                        )}

                        {page == number_page && (
                            <li className="disabled">
                                <a href="#" onClick={this.clickDisabled.bind(this)}>
                                    <span className="icon-arrow-right5" role="button"></span>
                                </a>
                            </li>
                        )}

                    </ul>
                </div>
            </div >
        );
    }
}

export default Pagination;