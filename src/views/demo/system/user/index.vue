<template>
    <div>
      <!--引用表格-->
      <BasicTable @register="registerTable">
        <!--插槽:工具栏-->
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </template>
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction
            :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          />
        </template>
      </BasicTable>
      <UserDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
</template>

<script lang="ts">
    //ts语法
    import { defineComponent } from 'vue';

    import { BasicTable, useTable, TableAction } from '/@/components/Table';
    import { getUserListByPage,getTestListByPage,getUserRoles } from '/@/api/demo/system';
    
    import { useDrawer } from '/@/components/Drawer';
    import UserDrawer from './UserDrawer.vue';
    
    import { columns, searchFormSchema } from './user.data';

    export default defineComponent({
      name: "userList",
      components:{ BasicTable,UserDrawer,TableAction },
      setup(){
           //注册model
           const [registerDrawer, { openDrawer }] = useDrawer();
           //注册table数据
           const [registerTable,{ reload }] = useTable({
             title: '用户列表数据',
             api: getUserListByPage,
             columns,
             formConfig: {
               labelWidth: 120,
               schemas: searchFormSchema,
             },
             useSearchForm: true,
             showTableSetting: true,
             bordered: true,
             showIndexColumn: true,
             actionColumn: {
               width: 80,
               title: '操作',
               dataIndex: 'action',
               slots: { customRender: 'action' },
               fixed: undefined,
             },
           })

        function handleCreate() {
          openDrawer(true, {
            isUpdate: false,
          });
        }

        async function handleEdit(record: Recordable) {
             try{
               const userRoles = await getUserRoles({userid:record.id});
               if(userRoles && userRoles.length>0){
                 record.selectedroles = userRoles;
               }
             }catch(e){
               console.error(e)
             }
            openDrawer(true, {
              record,
              isUpdate: true,
            });
        }

        function handleDelete(record: Recordable) {
          console.log(record);
        }

        function handleSuccess() {
          reload();
        }

        return {
          registerTable,
          registerDrawer,
          handleCreate,
          handleEdit,
          handleDelete,
          handleSuccess,
        };
      }
    })
</script>

<style scoped>

</style>
