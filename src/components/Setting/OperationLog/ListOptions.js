import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef, useState } from 'react';
import { Button, Flex, Space } from 'antd';

const ListOptions = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, topOptionsSize, topOptionsChildren, children }) => {
  const [usePreset, Filter] = remoteModules;
  const ref = useRef(null);
  const { apis } = usePreset();
  const { fields: filterFields, SearchInput } = Filter;
  const [filter, setFilter] = useState([]);
  const { AdvancedSelectFilterItem } = filterFields;
  return children({
    ref,
    filter: {
      value: filter,
      onChange: setFilter,
      list: [
        [
          <AdvancedSelectFilterItem
            label="操作用户"
            name="userId"
            api={apis.account.admin.getAllUserList}
            single
            getSearchProps={value => ({ params: { filter: { nickname: value } } })}
            dataFormat={({ pageData = [], totalCount }) => ({
              list: (pageData || []).map(item => ({
                label: item.nickname,
                value: item?.uuid
              })),
              total: totalCount
            })}
          />,
          <AdvancedSelectFilterItem
            label="应用"
            name="applicationId"
            single
            api={apis.account.admin.getApplicationList}
            dataFormat={data => ({
              list: (data || []).map(item => ({
                label: item.name,
                value: item?.uuid
              })),
              total: data?.length || 0
            })}
          />
        ]
      ]
    },
    topOptions: (
      <Space>
        <Flex>
          <SearchInput size={topOptionsSize} name="name" label="姓名" />
        </Flex>
        {topOptionsChildren ? topOptionsChildren({ ref }) : null}
        <Button size={topOptionsSize} onClick={() => {}}>
          管理邀请链接
        </Button>
      </Space>
    )
  });
});

export default ListOptions;
