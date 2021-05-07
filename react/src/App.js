import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const Root = () => {
  return <h3 className="title">Hello, React!</h3>;
};
let container = document.getElementById('app');
let component = <Root />;

ReactDOM.render(component, container);
