import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer'

class App extends Component {
	// Khung ngoai khi nguoi dung da dang nhap
	render() {
		return (
			<div>
				<ToastContainer />
				<Header />
				<div className="page-container">
					<div className="page-content">
						<SideBar />

						<div className="content-wrapper">

							{this.props.children}

						</div>

					</div>
				</div>
				{/* <Footer /> */}
			</div>
		)
	}
}

export default App;