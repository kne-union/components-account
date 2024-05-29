import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Menu, App } from 'antd';
import mockList from './mock/permission-list.json';
import { useMemo, useState } from 'react';
import style from './style.module.scss';
import Detail from './Detail';
import ApplicationFormInner from './ApplicationFormInner';
import Fetch from '@kne/react-fetch';

const ApplicationList = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, current, onChange }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.account.getApplicationList)}
      render={({ data }) => {
        return (
          <Menu
            items={data.map(item => {
              return {
                label: `${item.name}(${item.code})`,
                key: item.code
              };
            })}
            className={style['menu-outer']}
            selectedKeys={current}
            onClick={({ key }) => onChange(key)}
          />
        );
      }}
    />
  );
});

const Permission = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:FormInfo@useFormModel', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [Page, useFormModel, usePreset] = remoteModules;
  const [current, setCurrent] = useState('');
  const { ajax, apis } = usePreset();
  const { message } = App.useApp();
  const formModel = useFormModel();
  const mockListData = useMemo(() => {
    const list = (mockList.data || []).map(({ id, name }) => ({ key: id.toString(), label: name }));
    if (list.length) {
      setCurrent(list[0].key);
    }
    return list;
  }, [mockList.data]);

  return (
    <Page
      title="应用权限管理"
      titleExtra={
        <Button
          type="primary"
          onClick={() => {
            formModel({
              title: '添加应用',
              formProps: {
                onSubmit: async data => {
                  const { data: resData } = await ajax(
                    Object.assign({}, apis.account.addApplication, {
                      data
                    })
                  );
                  if (resData.code !== 0) {
                    return;
                  }
                  message.success('添加应用成功');
                }
              },
              children: <ApplicationFormInner />
            });
          }}
        >
          添加应用
        </Button>
      }
    >
      <div className={style['flex-wrapper']}>
        <ApplicationList current={current} onChange={setCurrent} />
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
