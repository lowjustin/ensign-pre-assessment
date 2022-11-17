import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router';
// import "./css/style.css";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Router />);