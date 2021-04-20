import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
//import CurrenInUsers from "./Components/curren-in-users.component";

//Socket IO Start
// const express = require("express");
// const router = express.Router();
// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// });
//Socket IO Stop



//module.exports = router;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// class SACSDashboard extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <Bioreader></Bioreader>
//         <CurrentInUsers></CurrentInUsers>
//       </React.Fragment>
//     )
//   }
// }
// const elem = <SACSDashboard></SACSDashboard>
// ReactDOM.render(elem, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
