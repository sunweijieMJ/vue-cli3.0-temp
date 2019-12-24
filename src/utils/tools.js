const os = (u = window.navigator.userAgent) => {

    return {
        // 不同浏览器及终端
        isMobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
        isWechat: !!u.match(/MicroMessenger/i),
        isQQ: !!u.match(/QQ/i),
        isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
        isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
        isSafari: !!u.match(/Safari/),
        isFirefox: !!u.match(/Firefox/),
        isOpera: !!u.match(/Opera/),
        isChrome: u.match(/Chrome/i) !== null && u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null ? true : false,
        isDeskTop: (() => {
            const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'okhttp/3.9.1'];
            let flag = true;
            for (let i = 0, LEN = Agents.length; i < LEN; i++) {
                if (u.indexOf(Agents[i]) !== -1) {
                    flag = false;
                    break;
                }
            }
            return flag;
        })()
    };
};

// 时间补零
const fillZero = n => n < 10 ? '0' + n : '' + n;

// 浮点数运算
const add = (arg1, arg2) => {
    let r1, r2, m, c;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm;
            arg2 = Number(arg2.toString().replace('.', ''));
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
    }
    return +(arg1 + arg2) / m;
};
const subtract = (arg1, arg2) => {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number((((arg1 * m) - (arg2 * m)) / m).toFixed(n));
};
const multiply = (arg1, arg2) => {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};
const divide = (arg1, arg2) => {
    let t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return +(r1 / r2) * Math.pow(10, t2 - t1);
};

// uuid
const uuid = (len, radix) => {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        /*
         * Fill in random data.  At i===19 set the high bits of clock sequence as
         * per rfc4122, sec. 4.1.5
         */
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('').toLowerCase();
};

// 手机号隐藏
const phoneFilter = phone => {
    if (!phone) return '';
    return phone.substr(0, 3) + '****' + phone.substr(7);
};

// 查看更多
const readMore = (text, length, suffix) => {
    if (text) {
        if (text.length <= length) return text;
        return text.substring(0, length) + suffix;
    }
    return text;
};

// 解析url
const parseQuery = (query) => {
    if (!query) return {};
    let response = {};
    query = decodeURIComponent(query);
    let strs = query.split('?')[1];
    if (!strs) return response;
    strs = strs.split('&');
    for (let i = 0, LEN = strs.length; i < LEN; i++) {
        response[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
    return response;
};

// url拼接
const queryConcat = (data) => {
    let url = '';
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += '&' + k + '=' + encodeURIComponent(value);
    }
    return url ? url.substring(1) : '';
};

// 校准时区
const adjustTime = (time = new Date(), timezone = -8) => {
    // 目标时区
    let targetTimezone = timezone;
    // 当前时区与中时区时差,以min为维度
    let diff = new Date().getTimezoneOffset();
    // 目标时区 = 本地时区时间 + 本地时区时差 - 目标时区时差
    let targetTime = new Date(time).getTime() + (diff * 60 * 1000) - (targetTimezone * 60 * 60 * 1000);

    return targetTime;
};

// 倒计时
const countDown = (time, type) => {
    // 时间戳转number
    if (!isNaN(+time)) time = +time;
    // 兼容safari
    if (typeof time === 'string') {
        time = time.split('-').join('/');
        time = time.split('.').join('/');
    }

    let delta = new Date(adjustTime(time)).getTime() - new Date(adjustTime()).getTime();
    if (delta <= 0) return {};

    // 常量表示几个常数
    const DAY_MS = 24 * 60 * 60 * 1000;
    const HOUR_MS = 60 * 60 * 1000;
    const MINUTE_MS = 60 * 1000;
    const SECOND_MS = 1000;

    let days, hours, mins, secs;
    switch (type) {
        case 'DD:HH:MM:SS':
            // 计算天数
            days = Math.floor(delta / DAY_MS);
            // 计算小时数
            hours = Math.floor((delta - (days * DAY_MS)) / HOUR_MS);
            // 计算分钟数
            mins = Math.floor((delta - (days * DAY_MS) - (hours * HOUR_MS)) / MINUTE_MS);
            // 计算秒数
            secs = Math.floor((delta - (days * DAY_MS) - (hours * HOUR_MS) - (mins * MINUTE_MS)) / SECOND_MS);
            break;
        case 'HH:MM:SS':
            hours = Math.floor(delta / HOUR_MS);
            mins = Math.floor((delta - (hours * HOUR_MS)) / MINUTE_MS);
            secs = Math.floor((delta - (hours * HOUR_MS) - (mins * MINUTE_MS)) / SECOND_MS);
            break;
        case 'MM:SS':
            mins = Math.floor(delta / MINUTE_MS);
            secs = Math.floor((delta - (mins * MINUTE_MS)) / SECOND_MS);
            break;
        case 'SS':
            secs = Math.floor(delta / SECOND_MS);
            break;
        default:
            hours = Math.floor(delta / HOUR_MS);
            mins = Math.floor((delta - (hours * HOUR_MS)) / MINUTE_MS);
            secs = Math.floor((delta - (hours * HOUR_MS) - (mins * MINUTE_MS)) / SECOND_MS);
            break;
    }

    return {
        days, hours: fillZero(hours), mins: fillZero(mins), secs: fillZero(secs)
    };
};

// 传入秒递减倒计时
const secondTimeout = (time, step = 1000, callBack) => {
    let timer;
    if (timer) {
        clearInterval(timer);
    } else {
        if (typeof time === 'number' && typeof step === 'number' && Object.prototype.toString.call(callBack) === '[object Function]') {
            timer = setInterval(() => {
                if (time) {
                    time--;
                    callBack(fillZero(Math.floor(time / 60)) + '分' + fillZero(time % 60) + '秒');
                } else {
                    clearInterval(timer);
                }
            }, step);
        } else {
            console.error('请注意必传项');
            return '00分00秒';
        }
    }
    return timer;
};

// 时间过滤
const moment = (time, type) => {
    if (!isNaN(+time)) time = +time;
    if (typeof time === 'number' && time.toString().length === 10) time = time * 1000;
    if (typeof time === 'string') {
        time = time.split('-').join('/');
        time = time.split('.').join('/');
    }

    const year = new Date(time).getFullYear();
    const month = new Date(time).getMonth() + 1;
    const date = new Date(time).getDate();
    const hours = new Date(time).getHours();
    const mins = new Date(time).getMinutes();
    switch (type) {
        case 'YYYY/MM/DD':
            return `${year}/${fillZero(month)}/${fillZero(date)}`;
            break;
        case 'YYYY-MM-DD':
            return `${year}-${fillZero(month)}-${fillZero(date)}`;
            break;
        case 'YYYY.MM.DD':
            return `${year}.${fillZero(month)}.${fillZero(date)}`;
            break;
        case 'MM-DD':
            return `${fillZero(month)}/${fillZero(date)}`;
            break;
        case 'MM-DD HH:MM':
            return `${fillZero(month)}月${fillZero(date)}日 ${fillZero(hours)}:${fillZero(mins)}`;
            break;
        default:
            return `${year}/${fillZero(month)}/${fillZero(date)}`;
            break;
    }
};

// 过滤空格
const filterEmpty = (value) => value.replace(/\s+/g, '');

export {
    os, fillZero, add, subtract, multiply, divide, uuid, phoneFilter, readMore,
    adjustTime, countDown, secondTimeout, parseQuery, queryConcat, moment, filterEmpty
};
