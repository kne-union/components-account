import style from './style.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import useControlValue from '@kne/use-control-value';
import { Space, Button, Divider } from 'antd';
import classnames from 'classnames';

const Language = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, className, list, colorful, ...props }) => {
  const [current, onChange] = useControlValue(props, {
    defaultValue: 'defaultLocale',
    value: 'locale',
    onChange: 'onChange'
  });
  const [Icon] = remoteModules;
  return (
    <div
      className={classnames(className, 'language', style['language'], {
        [style['is-colorful']]: colorful
      })}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Icon className={style['icon']} type="icon-yuyanqiehuan" />
      <Space split={<Divider type="vertical" />} size={0}>
        {list.map(({ label, value }) => (
          <Button
            key={value}
            type="text"
            className={classnames('btn-no-padding', style['item'], {
              [style['is-active']]: value === current
            })}
            onClick={() => {
              onChange(value);
            }}
          >
            {label}
          </Button>
        ))}
      </Space>
    </div>
  );
});

Language.defaultProps = {
  defaultLocale: 'zh-CN',
  list: [
    { label: '中文', value: 'zh-CN' },
    { label: 'EN', value: 'en-US' }
  ]
};

export default Language;
