<template>
    <Cascader ref="te" v-model:value="value" :options="options" placeholder="Please select"/>
</template>
<script lang="ts">
    import {defineComponent, PropType, ref, watchEffect, computed, unref, watch, onMounted} from 'vue';
    import {Cascader} from 'ant-design-vue';

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];
    export default defineComponent({
        name: 'JAreaLinkage',
        components: {
            Cascader
        },
        inheritAttrs: false,
        props: {},

        emits: ['options-change', 'change'],
        setup(props, {emit,refs}) {
            onMounted(() => {
              test()
            })
            function  test() {
                console.info(ref);
            }
            return {
                value: ref([]),
                options
            };
        },
    });
</script>
