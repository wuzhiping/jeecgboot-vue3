import {
    AccountParams,
    DeptListItem,
    MenuParams,
    RoleParams,
    TestPageParams,
    UserPageParams,
    RolePageParams,
    MenuListGetResultModel,
    DeptListGetResultModel,
    AccountListGetResultModel,
    RolePageListGetResultModel,
    RoleListGetResultModel,
    TestListGetResultModel,
    UserListGetResultModel,
} from './model/systemModel';
import {defHttp} from '/@/utils/http/axios';

enum Api {
    AccountList = '/system/getAccountList',
    IsAccountExist = '/system/accountExist',
    DeptList = '/system/getDeptList',
    setRoleStatus = '/system/setRoleStatus',
    MenuList = '/system/getMenuList',
    RolePageList = '/system/getRoleListByPage',
    DemoTableList = '/system/getDemoTableListByPage',
    TestPageList = '/system/getTestListByPage',
    GetAllRoleList = '/system/getAllRoleList',
    //新增页面所需要的接口
    UserList = '/sys/user/list',
    duplicateCheck = '/sys/duplicate/check',
    RolesList = '/sys/role/list',
    allRolesList = '/sys/role/queryall',
    isRoleExist = '/sys/role/checkRoleCode',
    allTenantList = '/sys/tenant/queryList',
    allPostList = '/sys/position/list',
    getUserRole = '/sys/user/queryUserRole',
}

export const getAccountList = (params: AccountParams) =>
    defHttp.get<AccountListGetResultModel>({url: Api.AccountList, params});

export const getDeptList = (params?: DeptListItem) =>
    defHttp.get<DeptListGetResultModel>({url: Api.DeptList, params});

export const getMenuList = (params?: MenuParams) =>
    defHttp.get<MenuListGetResultModel>({url: Api.MenuList, params});

export const getRoleListByPage = (params?: RolePageParams) =>
    defHttp.get<RolePageListGetResultModel>({url: Api.RolePageList, params});

export const getAllRoleList = (params?: RoleParams) =>
    defHttp.get<RoleListGetResultModel>({url: Api.GetAllRoleList, params});

export const setRoleStatus = (id: number, status: string) =>
    defHttp.post({url: Api.setRoleStatus, params: {id, status}});

export const getTestListByPage = (params?: TestPageParams) =>
    defHttp.get<TestListGetResultModel>({url: Api.TestPageList, params});

export const getDemoTableListByPage = (params) =>
    defHttp.get({url: Api.DemoTableList, params});

export const isAccountExist = (account: string) =>
    defHttp.post({url: Api.IsAccountExist, params: {account}}, {errorMessageMode: 'none'});

export const isRoleExist = (params) =>
    defHttp.get({url: Api.isRoleExist, params}, {isTransformResponse: false});

export const duplicateCheck = (params) =>
    defHttp.get({url: Api.duplicateCheck, params}, {isTransformResponse: false});

export const getUserListByPage = (params?: UserPageParams) =>
    defHttp.get({url: Api.UserList, params});

export const getRolesListByPage = (params?: RolePageParams) =>
    defHttp.get<RolePageListGetResultModel>({url: Api.RolesList, params});

export const getAllRolesList = (params?: RoleParams) =>
    defHttp.get<RoleListGetResultModel>({url: Api.allRolesList, params});

export const getAllTenantList = (params?: RoleParams) =>
    defHttp.get({url: Api.allTenantList, params});

export const getUserRoles = (params) =>
    defHttp.get({url: Api.getUserRole, params}, {errorMessageMode: 'none'});

export const getAllPostList = (params) => {
    return new Promise((resolve, reject) => {
        defHttp.get({url: Api.allPostList, params}).then(res => {
            resolve(res.records)
        });
    })
}

/**
 * 提交信息
 * @param params
 */
export const formSubmit = (params) => {
    if (params.id) {
        defHttp.put({url: params.url, params})
    } else {
        defHttp.post({url: params.url, params})
    }
}

