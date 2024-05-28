const getColumns = ({ navigateTo }) => {
  return [
    {
      name: 'name',
      title: '租户名',
      type: 'mainInfo',
      onClick: ({ colItem: item }) => {
        navigateTo(item);
      }
    },
    {
      name: 'accountNumber',
      title: '账号数量',
      type: 'serialNumberShort'
    },
    {
      name: 'serviceStartTime',
      title: '服务开始时间',
      type: 'date'
    },
    {
      name: 'serviceEndTime',
      title: '服务结束时间',
      type: 'date'
    },
    {
      name: 'description',
      title: '简介',
      type: 'description'
    }
  ];
};

export default getColumns;
