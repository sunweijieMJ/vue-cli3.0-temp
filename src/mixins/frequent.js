export default {
    methods: {
        // 返回
        back() {
            this.$router.back();
        },
        // query传值
        querySkip(name, query) {
            this.$router.push({name, query});
        },
        // params传值
        paramsSkip(name, params) {
            this.$router.push({name, params});
        }
    }
};
