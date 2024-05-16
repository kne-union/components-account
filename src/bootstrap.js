import { HashRouter } from 'react-router-dom';
import { globalPreset, globalInit } from './preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderRoot = async children => {
  await globalInit();
  root.render(children);
};

if (process.env.NODE_ENV === 'development') {
  import('@kne/modules-dev/dist/create-entry.css');
  import('@kne/modules-dev/dist/create-entry').then(module => {
    const Entry = module.default(() => <App globalPreset={globalPreset} />);
    renderRoot(
      <HashRouter>
        <Entry preset={globalPreset} themeToken={globalPreset.themeToken} />
      </HashRouter>
    );
  });
} else {
  renderRoot(
    <HashRouter>
      <App globalPreset={globalPreset} themeToken={globalPreset.themeToken} />
    </HashRouter>
  );
}
