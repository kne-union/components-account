import get from 'lodash/get';

const getColumns = () => {
  return [
    {
      name: 'nickname',
      title: '昵称',
      type: 'mainInfo'
    },
    {
      name: 'email',
      title: '邮箱',
      type: 'other'
    },
    {
      name: 'phone',
      title: '电话',
      type: 'serialNumber'
    },
    {
      name: 'tenant',
      title: '所在租户',
      type: 'other'
    },
    {
      name: 'isSuperAdmin',
      title: '是否超级管理员',
      type: 'other',
      valueOf: item => {
        return get(item, 'adminRole.role') === 'SuperAdmin' ? '是' : '否';
      }
    },
    {
      name: 'description',
      title: '描述',
      type: 'description'
    },
    {
      name: 'status',
      title: '状态',
      type: 'tag',
      valueOf: (item, { name }) => {
        if (item[name] === 0) {
          return { type: 'success', text: '正常' };
        }
        if (item[name] === 1) {
          return { text: '初始化未激活' };
        }
        if (item[name] === 11) {
          return { type: 'danger', text: '已禁用' };
        }
        if (item[name] === 12) {
          return { type: 'danger', text: '已关闭' };
        }

        return { text: '其他' };
      }
    }
  ];
};

export default getColumns;