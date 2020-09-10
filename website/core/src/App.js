import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './component/Header'
import Footer from './component/Footer'
import Home from './component/Home'
import Login from './component/Login/login'
import Menu from './component/Menu'
import Service from './component/Service'
import About from './component/About'
import Partner from './component/Partner'
import Profile from './component/Profile'
import Contact from './component/Contact'
import ServiceContent from './component/ServiceContent'
import news from './component/News/news'
import Landing from './component/Landing'
import Recruitment from './component/Recruitment/recruitment'
import Register from './component/Register/register'
import Help from './component/Help'
import Commit from './component/Commit'
import NewsContent from './component/News/news_content';
class App extends Component {
    componentDidMount = () => {
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.3&appId=2318401288216022&autoLogAppEvents=1";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {

        return (

            <Router >
                <Fragment>
                    <header>
                        <Header />
                    </header>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/dich-vu/:slug" component={ServiceContent} />
                        <Route path="/dich-vu" component={Service} />
                        <Route exact path="/gioi-thieu" component={About} />
                        <Route exact path="/doi-tac" component={Partner} />
                        <Route exact path="/lien-he" component={Contact} />
                        <Route path="/tin-tuc" component={news} />
                        <Route exact path="/dang-ky-tho" component={Landing} />
                        <Route path="/tuyen-dung" component={Recruitment} />
                        <Route exact path="/dang-nhap" component={Login} />
                        <Route exact path="/dang-ky" component={Register} />
                        <Route exact path="/tai-khoan" component={Profile} />
                        <Route exact path="/tro-giup" component={Help} />
                        <Route exact path="/cam-ket" component={Commit} />
                        <Route exact path="/:slug" component={NewsContent} />
                    </Switch>
                    <Footer />
                </Fragment>
            </Router>
        );
    }
}

export default App;
