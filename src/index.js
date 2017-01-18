/**
 * This is the entry point for webpack!
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'react-select/dist/react-select.css';
import 'cropperjs/dist/cropper.css';

import rootRoute from './routes';
import './styles/general.scss';

render(<Router history={browserHistory} routes={rootRoute} scrollStrategy="none" />, document.getElementById('root'));
