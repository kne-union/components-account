import React from 'react';
import { preset as fetchPreset, request } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset, loadModule } from '@kne/remote-loader';
import * as apis from './apis';
import transform from 'lodash/transform';
import { getCookies } from '@common/cookies';

if (window.runtimePublicUrl) {
  window.PUBLIC_URL = window.runtimePublicUrl;
} else {
  window.PUBLIC_URL = process.env.PUBLIC_URL;
}

export const ajax = (() => {
  const instance = axios.create({
    validateStatus: function () {
      return true;
    }
  });

  instance.interceptors.request.use(config => {
    const token = getCookies('X-User-Token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['X-APP-NAME'] = 'Account';
    return config;
  });

  instance.interceptors.response.use(response => {
    if (response.status === 401 || response.data.code === 401) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('referer');
      const referer = encodeURIComponent(`${window.location.pathname}?${searchParams.toString()}`);
      window.location.href = '/account/login?referer=' + referer;
      response.showError = false;
    }
    return response;
  });

  instance.interceptors.response.use(
    response => {
      if (response.status !== 200) {
        response.showError !== false && message.error(response?.data?.msg || '请求发生错误');
      }
      return response;
    },
    error => {
      message.error(error.message || '请求发生错误');
      return Promise.reject(error);
    }
  );

  return instance;
})();

const componentsCoreRemote =
  process.env.NODE_ENV === 'development'
    ? {
        remote: 'components-core',
        url: 'https://uc.fatalent.cn',
        tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build',
        defaultVersion: '0.2.71'
      }
    : {
        remote: 'components-core',
        url: 'http://localhost:3002',
        tpl: '{{url}}',
        // url: 'https://uc.fatalent.cn',
        defaultVersion: '0.2.39'
      };
export const globalInit = async () => {
  fetchPreset({
    ajax,
    loading: (
      <Spin
        delay={500}
        style={{
          position: 'absolute',
          left: '50%',
          padding: '10px',
          transform: 'translateX(-50%)'
        }}
      />
    ),
    error: null,
    empty: <Empty />,
    transformResponse: response => {
      const { data } = response;
      response.data = {
        code: data.code === 0 ? 200 : data.code,
        msg: data.msg,
        results: data.data
      };
      return response;
    }
  });

  const { data: remoteComponents } = await ajax(Object.assign({}, apis.manifest.getRemoteComponents));

  const remoteUrl = 'https://registry.npmmirror.com',
    remoteTpl = '{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build';

  const remoteComponentsLoader = transform(
    remoteComponents,
    (result, { name, version }) => {
      result[name] = {
        remote: name,
        url: remoteUrl,
        tpl: remoteTpl,
        defaultVersion: version
      };
    },
    {}
  );

  remoteComponentsLoader.default = componentsCoreRemote;

  if (process.env.NODE_ENV === 'development') {
    remoteComponentsLoader['components-core'] = componentsCoreRemote;
    remoteComponentsLoader['components-account'] = {
      remote: 'components-account',
      url: '/',
      tpl: '{{url}}',
      defaultVersion: process.env.DEFAULT_VERSION
    };
  }

  remoteLoaderPreset({
    remotes: remoteComponentsLoader
  });

  const getApis = (await loadModule('components-account:Apis@getApis')).default;
  const ajaxPostForm = (url, data, options) => {
    return axios.postForm(url, data, options);
  };
  return {
    ajax: request,
    ajaxPostForm,
    apis: Object.assign({}, apis, {
      account: getApis(),
      oss: {
        url: '/api/static/file-url/{id}',
        paramsType: 'urlParams',
        ignoreSuccessState: true
      },
      ossUpload: ({ file }) => {
        return ajaxPostForm('/api/static/upload', { file });
      }
    }),
    themeToken: {
      colorPrimary: '#4F185A',
      colorPrimaryHover: '#702280'
    }
  };
};
