import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import Fetch from '@kne/react-fetch';

export const getTreeData = (treeMap, pid) => {
  return (get(treeMap, pid) || []).map(item => Object.assign({}, item, { children: getTreeData(treeMap, item.id) }));
};

const treeDataRender = ({ fetchApi, hasRoot, children }) => {
  const tree = Array.isArray(fetchApi.data) ? fetchApi.data : [fetchApi.data];
  const treeMap = groupBy(tree, item => item.pid);
  const treeData = getTreeData(treeMap, '0');
  return children(Object.assign({}, fetchApi, { treeData: hasRoot ? treeData : get(treeData, '0.children') }));
};

export const OrgTreeData = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, tenantId, hasRoot, children }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.account.getTenantOrgList, {
        params: { tenantId }
      })}
      render={fetchApi => {
        return treeDataRender({ fetchApi, hasRoot, children });
      }}
    />
  );
});

export const OrgTenantTreeData = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, hasRoot, children }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.account.getCurrentOrgList)}
      render={fetchApi => {
        return treeDataRender({ fetchApi, hasRoot, children });
      }}
    />
  );
});

export const OrgTenantTreeSelect = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, hasRoot, ...props }) => {
  const [FormInfo] = remoteModules;
  const { TreeSelect } = FormInfo.fields;

  return (
    <OrgTenantTreeData hasRoot={hasRoot}>
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
    </OrgTenantTreeData>
  );
});

const OrgTreeSelect = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, tenantId, hasRoot, ...props }) => {
  const [FormInfo] = remoteModules;
  const { TreeSelect } = FormInfo.fields;

  return (
    <OrgTreeData tenantId={tenantId} hasRoot={hasRoot}>
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
