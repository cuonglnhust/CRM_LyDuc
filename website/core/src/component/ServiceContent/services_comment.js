import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

class services_comment extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        
        return (
            <section className="home-comment">
                    <div className="text-center big-title " style={{textAlign:"center"}}>Comment</div>
                    <div className="container">
                        <div style={{textAlign:"center"}}>
                        <FacebookProvider appId="2318401288216022">
                            <Comments href="https://www.24h.com.vn/bong-da-c48.html" />
                        </FacebookProvider>
                        </div>
                    </div>
                </section>
        );
    }
}

export default services_comment;