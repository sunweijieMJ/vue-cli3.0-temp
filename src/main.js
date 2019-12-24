import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zhLocal from '@/assets/lang/zh.js';
import enLocal from '@/assets/lang/en.js';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        zh: Object.assign({}, zhLocal, zhLocale),
        en: Object.assign({}, enLocal, enLocale)
    }
});

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
