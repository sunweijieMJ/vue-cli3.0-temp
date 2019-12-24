<template>
    <div>
        <el-select v-model="value" @change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        {{$t('common.home')}}
        <el-calendar v-model="time"></el-calendar>
    </div>
</template>
<script>
    import {systemApi} from '@/api';

    export default {
        data() {
            return {
                time: new Date(),
                options: [
                    {
                        value: 'zh',
                        label: '中文'
                    }, {
                        value: 'en',
                        label: '英文'
                    }
                ],
                value: 'zh'
            };
        },
        created() {
            systemApi().getGlobalInfo({id: 1}).then((res) => {
                console.log(res);
            });
        },
        methods: {
            change(evt) {
                this.$i18n.locale = evt;
            }
        }
    };
</script>
