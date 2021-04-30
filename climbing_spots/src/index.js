import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Header from './Header';
// import CovidMap from './CovidMap'
import ClimbingSpotsMap from './ClimbingSpotsMap'

ReactDOM.render(
  <React.StrictMode>
    {/* <Header/> */}
    {/* <CovidMap/> */}
    <ClimbingSpotsMap/>
  </React.StrictMode>,
  document.getElementById('root')
);
