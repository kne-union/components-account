const getColumns = () => {
  return [
    {
      name: 'avatar',
      title: '头像',
      type: 'avatar',
      valueOf: (item, { name }) => Object.assign({}, { gender: item['gender'] || 'M' }, { id: item[name] })
    },
    {
      name: 'name',
      title: '姓名',
      type: 'mainInfo'
    },
    {
      name: 'phone',
      title: '电话',
      type: 'other'
    },
    {
      name: 'email',
      title: '邮箱',
      type: 'other'
    },
    {
      name: 'org',
      title: '所属组织',
      type: 'other',
      valueOf: item => {
        return item.tenantOrgs && item.tenantOrgs.map(({ name }) => name).join(',');
      }
    },
    {
      name: 'role',
      title: '角色',
      type: 'other',
      valueOf: item => {
        return item.tenantRoles && item.tenantRoles.length > 0 ? item.tenantRoles.map(({ name }) => name).join(',') : '系统默认角色';
      }
    },
    {
      name: 'status',
      title: '状态',
      type: 'tag',
      valueOf: (item, { name }) => {
        if (item[name] === 0) {
          return { type: 'success', text: '正常' };
        }
        if (item[name] === 11) {
          return { type: 'danger', text: '已禁用' };
        }
        if (item[name] === 12) {
          return { type: 'danger', text: '已关闭' };
        }
        return { text: '其他' };
      }
    },
    {
      name: 'userStatus',
      title: '账号状态',
      type: 'tag',
      valueOf: item => {
        const status = item.user?.status;
        if (status === 0) {
          return { type: 'success', text: '正常' };
        }
        if (status === 1) {
          return { text: '初始化未激活' };
        }
        if (status === 11) {
          return { type: 'danger', text: '已禁用' };
        }
        if (status === 12) {
          return { type: 'danger', text: '已关闭' };
        }
        return { text: '其他' };
      }
    }
  ];
};

export default getColumns;
