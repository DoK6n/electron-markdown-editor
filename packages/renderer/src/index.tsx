import React from 'react';
import ReactDomClient from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Filed to find the root element');
const root = ReactDomClient.createRoot(rootElement);

root.render(<App />);
