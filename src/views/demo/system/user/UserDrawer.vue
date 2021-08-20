<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">

    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import {defineComponent, ref, computed, unref} from 'vue';
  import {BasicForm, useForm} from '/@/components/Form/index';
  import {formSchema} from './user.data';
  import {BasicDrawer, useDrawerInner} from '/@/components/Drawer';
  import {formSubmit} from '/@/api/demo/system';

  export default defineComponent({
    name: 'UserDrawer',
    components: {BasicDrawer, BasicForm},
    emits: ['success', 'register'],
    setup(_, {emit}) {
      const isUpdate = ref(true);

      const [registerForm, {resetFields, setFieldsValue, validate, updateSchema}] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, {setDrawerProps, closeDrawer}] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({confirmLoading: false});
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          if(!Array.isArray(data.record.avatar)){
            data.record.avatar = [data.record.avatar];
          }
          setFieldsValue({
            ...data.record,
          });
        }

        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field: 'confirmPassword',
            ifShow: !unref(isUpdate),
          }
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          let values = await validate();
          if(values.selectedroles){
            values.selectedroles = values.selectedroles.join(",");
          }
          if(Array.isArray(values.avatar)){
            values.avatar = values.avatar[0];
          }
          setDrawerProps({confirmLoading: true});
          let url = '/sys/user/add';
          if (unref(isUpdate)) {
            url = '/sys/user/edit';
          }
          values['url'] = url;
          await formSubmit(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({confirmLoading: false});
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
