export const login = {
  url: '/api/v1/account/login',
  method: 'POST'
};

export const sendSMSCode = {
  url: '/api/v1/account/sendSMSCode',
  method: 'POST'
};

export const sendEmailCode = {
  url: '/api/v1/account/sendEmailCode',
  method: 'POST'
};

export const validateCode = {
  url: '/api/v1/account/validateCode',
  method: 'POST'
};

export const register = {
  url: '/api/v1/account/register',
  method: 'POST'
};

export const accountIsExists = {
  url: '/api/v1/account/accountIsExists',
  method: 'POST'
};

export const getUserInfo = {
  url: '/api/v1/account/getUserInfo',
  method: 'GET'
};

export const getUserTenant = {
  url: '/api/v1/account/tenant/getUserTenant',
  method: 'GET'
};

export const initSuperAdmin = {
  url: '/api/v1/account/initSuperAdmin',
  method: 'POST'
};

export const addUser = {
  url: '/api/v1/account/admin/addUser',
  method: 'POST'
};

export const getSuperAdminInfo = {
  url: '/api/v1/account/admin/getSuperAdminInfo',
  method: 'GET'
};

export const getAllUserList = {
  url: '/api/v1/account/admin/getAllUserList',
  method: 'GET'
};

export const getAllTenantList = {
  url: '/api/v1/account/admin/getAllTenantList',
  method: 'GET'
};

export const addTenant = {
  url: '/api/v1/account/admin/addTenant',
  method: 'POST'
};

export const saveTenant = {
  url: '/api/v1/account/admin/saveTenant',
  method: 'POST'
};

export const resetUserPassword = {
  url: '/api/v1/account/admin/resetUserPassword',
  method: 'POST'
};

export const saveUser = {
  url: '/api/v1/account/admin/saveUser',
  method: 'POST'
};

export const closeUser = {
  url: '/api/v1/account/admin/closeUser',
  method: 'POST'
};

export const getTenantInfo = {
  url: '/api/v1/account/admin/getTenantInfo',
  method: 'GET'
};

export const getTenantRoleList = {
  url: '/api/v1/account/admin/getRoleList',
  method: 'GET'
};

export const addTenantRole = {
  url: '/api/v1/account/admin/addRole',
  method: 'POST'
};

export const saveTenantRole = {
  url: '/api/v1/account/admin/saveRole',
  method: 'POST'
};

export const removeTenantRole = {
  url: '/api/v1/account/admin/removeRole',
  method: 'POST'
};

export const getTenantOrgList = {
  url: '/api/v1/account/admin/tenant/orgList'
};

export const addTenantOrg = {
  url: '/api/v1/account/admin/tenant/addOrg',
  method: 'POST'
};

export const editTenantOrg = {
  url: '/api/v1/account/admin/tenant/editOrg',
  method: 'POST'
};

export const removeTenantOrg = {
  url: '/api/v1/account/admin/tenant/removeOrg',
  method: 'POST'
};

export const getApplicationList = {
  url: '/api/v1/account/admin/getApplicationList',
  method: 'GET'
};

export const addApplication = {
  url: '/api/v1/account/admin/addApplication',
  method: 'POST'
};

export const deleteApplication = {
  url: '/api/v1/account/admin/deleteApplication',
  method: 'POST'
};

export const saveApplication = {
  url: '/api/v1/account/admin/saveApplication',
  method: 'POST'
};

export const getPermissionList = {
  url: '/api/v1/account/admin/getPermissionList',
  method: 'GET'
};

export const addPermission = {
  url: '/api/v1/account/admin/addPermission',
  method: 'POST'
};

export const deletePermission = {
  url: '/api/v1/account/admin/deletePermission',
  method: 'POST'
};

export const savePermission = {
  url: '/api/v1/account/admin/savePermission',
  method: 'POST'
};

export const saveTenantPermissionList = {
  url: '/api/v1/account/admin/saveTenantPermissionList',
  method: 'POST'
};

export const getTenantPermissionList = {
  url: '/api/v1/account/admin/getTenantPermissionList',
  method: 'GET'
};

export const getRolePermissionList = {
  url: '/api/v1/account/admin/getRolePermissionList',
  method: 'GET'
};

export const saveRolePermissionList = {
  url: '/api/v1/account/admin/saveRolePermissionList',
  method: 'POST'
};
