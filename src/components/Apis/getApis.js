const getApis = options => {
  const appName = 'Account';
  const { prefix, headers } = Object.assign({}, { prefix: '/api/v1/account' }, options);

  return {
    login: {
      url: `${prefix}/login`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    sendSMSCode: {
      url: `${prefix}/sendSMSCode`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    sendEmailCode: {
      url: `${prefix}/sendEmailCode`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    modifyPassword: {
      url: `${prefix}/modifyPassword`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    forgetPwd: {
      url: `${prefix}/forgetPwd`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    parseResetToken: {
      url: `${prefix}/parseResetToken`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    resetPassword: {
      url: `${prefix}/resetPassword`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    validateCode: {
      url: `${prefix}/validateCode`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    register: {
      url: `${prefix}/register`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    accountIsExists: {
      url: `${prefix}/accountIsExists`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    getUserInfo: {
      url: `${prefix}/getUserInfo`,
      method: 'GET',
      cache: 'get-user-info',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    getTenantUserInfo: {
      url: `${prefix}/tenant/getTenantUserInfo`,
      method: 'GET',
      cache: 'get-tenant-user-info',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    getUserTenant: {
      url: `${prefix}/tenant/getUserTenant`,
      method: 'GET',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    getSuperAdminInfo: {
      url: `${prefix}/admin/getSuperAdminInfo`,
      method: 'GET',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    initSuperAdmin: {
      url: `${prefix}/initSuperAdmin`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    setCurrentTenantId: {
      url: `${prefix}/setCurrentTenantId`,
      method: 'POST',
      headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
    },
    tenant: {
      getTenantOrgList: {
        url: `${prefix}/tenant/orgList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenantOrg: {
        url: `${prefix}/tenant/addOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      editTenantOrg: {
        url: `${prefix}/tenant/editOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      removeTenantOrg: {
        url: `${prefix}/tenant/removeOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantUserList: {
        url: `${prefix}/tenant/getTenantUserList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantRoleList: {
        url: `${prefix}/tenant/getRoleList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenantRole: {
        url: `${prefix}/tenant/addRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenantRole: {
        url: `${prefix}/tenant/saveRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      removeTenantRole: {
        url: `${prefix}/tenant/removeRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getRolePermissionList: {
        url: `${prefix}/tenant/getRolePermissionList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveRolePermissionList: {
        url: `${prefix}/tenant/saveRolePermissionList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getApplicationList: {
        url: `${prefix}/tenant/getApplicationList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getPermissionList: {
        url: `${prefix}/tenant/getPermissionList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenantUser: {
        url: `${prefix}/tenant/saveTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      deleteTenantUser: {
        url: `${prefix}/tenant/deleteTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      closeTenantUser: {
        url: `${prefix}/tenant/closeTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      openTenantUser: {
        url: `${prefix}/tenant/openTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getOperationLogList: {
        url: `${prefix}/tenant/getTenantOperationLogList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getCompanyInfo: {
        url: `${prefix}/tenant/getCompanyInfo`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveCompanyInfo: {
        url: `${prefix}/tenant/saveCompanyInfo`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    admin: {
      setSuperAdmin: {
        url: `${prefix}/admin/setSuperAdmin`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addUser: {
        url: `${prefix}/admin/addUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getAllUserList: {
        url: `${prefix}/admin/getAllUserList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getAllTenantList: {
        url: `${prefix}/admin/getAllTenantList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenant: {
        url: `${prefix}/admin/addTenant`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenant: {
        url: `${prefix}/admin/saveTenant`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      resetUserPassword: {
        url: `${prefix}/admin/resetUserPassword`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      closeTenant: {
        url: `${prefix}/admin/closeTenant`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      openTenant: {
        url: `${prefix}/admin/openTenant`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveUser: {
        url: `${prefix}/admin/saveUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      closeUser: {
        url: `${prefix}/admin/closeUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      openUser: {
        url: `${prefix}/admin/openUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantInfo: {
        url: `${prefix}/admin/getTenantInfo`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantRoleList: {
        url: `${prefix}/admin/getRoleList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenantRole: {
        url: `${prefix}/admin/addRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenantRole: {
        url: `${prefix}/admin/saveRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      removeTenantRole: {
        url: `${prefix}/admin/removeRole`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantOrgList: {
        url: `${prefix}/admin/tenant/orgList`,
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenantOrg: {
        url: `${prefix}/admin/tenant/addOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      editTenantOrg: {
        url: `${prefix}/admin/tenant/editOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      removeTenantOrg: {
        url: `${prefix}/admin/tenant/removeOrg`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getApplicationList: {
        url: `${prefix}/admin/getApplicationList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addApplication: {
        url: `${prefix}/admin/addApplication`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      deleteApplication: {
        url: `${prefix}/admin/deleteApplication`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveApplication: {
        url: `${prefix}/admin/saveApplication`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      copyPermissions: {
        url: `${prefix}/admin/copyPermissions`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getPermissionList: {
        url: `${prefix}/admin/getPermissionList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addPermission: {
        url: `${prefix}/admin/addPermission`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      deletePermission: {
        url: `${prefix}/admin/deletePermission`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      savePermission: {
        url: `${prefix}/admin/savePermission`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      parsePermissionList: {
        url: `${prefix}/admin/parsePermissionList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      exportPermissionList: {
        url: `${prefix}/admin/exportPermissionList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenantPermissionList: {
        url: `${prefix}/admin/saveTenantPermissionList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantPermissionList: {
        url: `${prefix}/admin/getTenantPermissionList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getRolePermissionList: {
        url: `${prefix}/admin/getRolePermissionList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveRolePermissionList: {
        url: `${prefix}/admin/saveRolePermissionList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getTenantUserList: {
        url: `${prefix}/admin/getTenantUserList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addTenantUser: {
        url: `${prefix}/admin/addTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveTenantUser: {
        url: `${prefix}/admin/saveTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      deleteTenantUser: {
        url: `${prefix}/admin/deleteTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      closeTenantUser: {
        url: `${prefix}/admin/closeTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      openTenantUser: {
        url: `${prefix}/admin/openTenantUser`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getInviteList: {
        url: `${prefix}/admin/getInviteList`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      addInviteToken: {
        url: `${prefix}/admin/addInviteToken`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      deleteInviteToken: {
        url: `${prefix}/admin/deleteInviteToken`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getOperationLogList: {
        url: `${prefix}/admin/getAllOperationLogList`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      getCompanyInfo: {
        url: `${prefix}/admin/getCompanyInfo`,
        method: 'GET',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      },
      saveCompanyInfo: {
        url: `${prefix}/admin/saveCompanyInfo`,
        method: 'POST',
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    }
  };
};

export default getApis;
