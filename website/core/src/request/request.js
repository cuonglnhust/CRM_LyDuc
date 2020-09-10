'use strict';

import axios from 'axios';
import {showErrorMessage} from './notification'

const makeRequest = (method, url, params={}, header='', timeout = 3000) => {
    return new Promise((resolve, reject) => {
        method = method.toLowerCase();
        let opts = {
            method : method,
            url: url
        };

        if (method == 'get')
            opts.params = params;
        else 
            opts.data = params;

        if (header) {
            opts.headers = header;
        }

        axios(opts).then(response => {
                let result = response.data
                if (result.logout) {
                    showErrorMessage(result.message)
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1500)
                } else {
                    resolve(result);
                }
                
            }).catch(err => {
                console.log('ERROR_REQUEST', err);
                reject('Something went wrong!');
            });
    });
}

// const URL_REQUEST = "http://demo-web-cuuvan.sky-demo.net"
const URL_REQUEST = "http://localhost:4201"

export default {makeRequest, URL_REQUEST}