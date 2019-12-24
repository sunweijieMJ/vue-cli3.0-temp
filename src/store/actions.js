// 将types.js里的内容存为types对象
import * as types from './types';

const actions = {
    forExample: ({commit}, data) => {
        commit(types.FOR_EXAMPLE, data);
    }
};

export default actions;
