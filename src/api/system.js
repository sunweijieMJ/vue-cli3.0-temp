/**
 * 系统 API 集合类
 * 所有跟系统相关的接口统一封装
 * 集成Abstract
 * @date 2019-12-24
 */
import Abstract from './abstract.js';

class System extends Abstract {

    constructor() {
        super();
    }

    /**
     * 测试
     * @param {string | required} key
     */
    getGlobalInfo(data) {
        return this.getReq({url: 'System.GlobalInfo', data});
    }

}

// 单列模式返回对象
let instance;
export default () => {
    if (instance) return instance;
    instance = new System();
    return instance;
};
