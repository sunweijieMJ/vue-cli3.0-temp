// 将types.js里的内容存为types对象
import * as types from './types';

const mutations = {
    [types.FOR_EXAMPLE]: (state, data) => {
        state.example = data;
    }
};

export default mutations;
