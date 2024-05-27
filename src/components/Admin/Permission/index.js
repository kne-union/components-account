import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Menu } from 'antd';
import mockList from './mock/permission-list.json';
import { useMemo, useState } from 'react';
import style from './style.module.scss';
import Detail from './Detail';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  const [current, setCurrent] = useState('');

  const mockListData = useMemo(() => {
    const list = (mockList.data || []).map(({ id, name }) => ({ key: id.toString(), label: name }));
    if (list.length) {
      setCurrent(list[0].key);
    }
    return list;
  }, [mockList.data]);

  return (
    <Page title="应用权限管理" titleExtra={<Button type="primary">添加</Button>}>
      <div className={style['flex-wrapper']}>
        <Menu items={mockListData} className={style['menu-outer']} selectedKeys={current} onClick={({ key }) => setCurrent(key)} />
        <Detail
          params={{ id: current }}
          id={current}
          onChange={changedCheckedList => {
            console.log('配置checkedList', changedCheckedList);
          }}
          onEdit={item => {
            console.log('edit...', item);
          }}
          onDelete={item => {
            console.log('delete...', item);
          }}
        />
      </div>
    </Page>
  );
});

export default Permission;
