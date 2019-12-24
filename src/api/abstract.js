/**
 * axios基础构建
 * @date 2019-12-24
 */

import axios from 'axios';
import {getSign, postSign} from '../utils/sign';
import getUrl from '../config/urldict';
import global from '../config/global';

let baseURL = process.env.VUE_APP_BaseURL;
let send_flag = false;

// axios 配置
const Axios = axios.create({
    timeout: 6000,
    responseType: 'json',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

// 添加响应拦截器
Axios.interceptors.response.use((response) => {
    if (global.submit_request.includes(response.config.url.split('?')[0].split(baseURL)[1])) {
        send_flag = true;
    }
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

class Abstract {
    constructor() {
    }

    apiAxios({method, url, data}) {
        let _url = url.split('.');
        url = getUrl(_url[0], _url[1]);

        // 签名加密
        if (method === 'POST') {
            url = url + `&sign=${postSign(url, data)}`;
        } else {
            data.sign = getSign(url, data);
        }
        return new Promise((resolve, reject) => {
            // 终止重复请求
            if (global.submit_request.includes(url.split('?')[0])) {
                if (send_flag) {
                    resolve({status: false, message: '重复请求终止', data: null});
                    return;
                }
                send_flag = true;
            }
            Axios({
                baseURL,
                method,
                url,
                params: method === 'GET' || method === 'DELETE' ? data : null,
                data: method === 'POST' || method === 'PUT' ? data : null
            }).then((res) => {
                if (res.data.status === 1) {
                    resolve({status: true, message: 'success', data: res.data.results});
                } else if (res.data.status === -1) {
                    resolve({status: false, message: res.data.errorMessage, data: null});
                }
            }).catch((err) => {
                if (err) console.warn(err);
                reject({status: false, message: '接口异常', data: null});
            });
        });
    }

    /**
     * GET类型的网络请求
     */
    getReq({url, data}) {
        return this.apiAxios({method: 'GET', url, data});
    }

    /**
     * POST类型的网络请求
     */
    postReq({url, data}) {
        return this.apiAxios({method: 'POST', url, data});
    }

    /**
     * PUT类型的网络请求
     */
    putReq({url, data}) {
        return this.apiAxios({method: 'PUT', url, data});
    }

    /**
     * DELETE类型的网络请求
     */
    deleteReq({url, data}) {
        return this.apiAxios({method: 'DELETE', url, data});
    }

}

export default Abstract;
