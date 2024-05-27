import { createWithRemoteLoader } from '@kne/remote-loader';
import { Cascader, Space } from 'antd';

import style from './style.module.scss';
import mockDetail from './mock/permission-detail.json';

const NameAction = createWithRemoteLoader({
  modules: ['Icon']
})(({ remoteModules, data, onDelete, onEdit }) => {
  const [Icon] = remoteModules;
  return (
    <Space className={style['name-action-wrap']}>
      <div>{data.name}</div>
      <Space className={style['name-action']}>
        <Icon
          type={'bianji'}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(data);
          }}
        />
        <Icon
          type={'shanchu'}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(data);
          }}
        />
      </Space>
    </Space>
  );
});

const getList = ({ list, onDelete, onEdit }) => {
  return (list || []).map(item =>
    Object.assign({}, item, {
      name: <NameAction data={item} onDelete={onDelete} onEdit={onEdit} />,
      children: item.children?.length ? getList({ list: item.children, onDelete, onEdit }) : item.children
    })
  );
};

const Detail = ({ id, onChange, onDelete, onEdit }) => {
  console.log(id);
  return (
    <div className={style['permission-detail-right']}>
      <Cascader.Panel
        multiple
        options={getList({ list: mockDetail.data, onDelete, onEdit })}
        onChange={onChange}
        fieldNames={{
          label: 'name',
          value: 'code'
        }}
      />
    </div>
  );
};

export default Detail;
