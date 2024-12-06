import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import './styles/globals.css'
import {AppRouter} from './router/AppRouter'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter />
);