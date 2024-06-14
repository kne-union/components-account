import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import Fetch from '@kne/react-fetch';

export const getTreeData = (treeMap, pid) => {
  return (get(treeMap, pid) || []).map(item => Object.assign({}, item, { children: getTreeData(treeMap, item.id) }));
};

export const OrgTreeData = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, tenantId, children }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.account.getTenantOrgList, {
        params: { tenantId }
      })}
      render={fetchApi => {
        const tree = Array.isArray(fetchApi.data.pageData) ? fetchApi.data.pageData || [] : [fetchApi.data.pageData];
        const treeMap = Object.groupBy(tree, item => item.pid);
        const treeData = getTreeData(treeMap, '0');
        return children(Object.assign({}, fetchApi, { treeData }));
      }}
    />
  );
});

const OrgTreeSelect = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, tenantId, ...props }) => {
  const [FormInfo] = remoteModules;
  const { TreeSelect } = FormInfo.fields;

  return (
    <OrgTreeData tenantId={tenantId}>
      {({ treeData }) => {
        return (
          <TreeSelect
            {...props}
            fieldNames={{
              value: 'id',
              label: 'name',
              children: 'children'
            }}
            treeData={treeData}
            showSearch
            treeNodeFilterProp="name"
          />
        );
      }}
    </OrgTreeData>
  );
});

export default OrgTreeSelect;
