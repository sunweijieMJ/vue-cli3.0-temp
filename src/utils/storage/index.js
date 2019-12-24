/**
 * 单列模式返回对象
 * 统一封装对外的接口
 */

export default (store) => {
    let UseStore;
    switch (store) {
        case 'session':
            UseStore = require('./sessionstorage').SessionStorageAPI;
            break;
        case 'cookie':
            UseStore = require('./cookie').CookieAPI;
            break;
        case 'localstorage':
            UseStore = require('./localstorage').LocalStorageAPI;
            break;
        default:
            UseStore = require('./sessionstorage').SessionStorageAPI;
            break;
    }
    return new UseStore();
};
