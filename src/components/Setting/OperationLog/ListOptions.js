import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef, useState } from 'react';
import merge from 'lodash/merge';

const ListOptions = createWithRemoteLoader({
  modules: ['components-core:Filter']
})(({ remoteModules, tenantId, apis, searchMap, children }) => {
  const [Filter] = remoteModules;
  const ref = useRef(null);
  const { fields: filterFields } = Filter;
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
            api={merge({}, apis.getUserList, { params: { tenantId } })}
            single
            getSearchProps={value => ({ params: { tenantId, filter: { [searchMap.userId.label]: value } } })}
            dataFormat={({ pageData = [], totalCount }) => ({
              list: (pageData || []).map(item => ({
                label: item[searchMap.userId.label] || item.email || item.phone || '-',
                value: item[searchMap.userId.value]
              })),
              total: totalCount
            })}
          />,
          <AdvancedSelectFilterItem
            label="应用"
            name="applicationId"
            single
            api={apis.getApplicationList}
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
    }
  });
});

export default ListOptions;
