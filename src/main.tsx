import './index.css';
import 'antd/dist/antd.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './containers/Root/App';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)
