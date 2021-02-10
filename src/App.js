//import logo from './app-assets/images/logo/stack-logo-light.png';
import { Route, Link, Switch } from "react-router-dom";
// import io from 'socket.io';
//import './App.css';
//const feather = require('feather-icons')
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';

//import featherfont from 'feather-icons-react';
//import Pace from 'react-pace-progress'
import './app-assets/vendors/css/vendors.min.css';
import './app-assets/vendors/css/forms/icheck/icheck.css';
import './app-assets/vendors/css/forms/icheck/custom.css';
import './app-assets/vendors/css/charts/morris.css';
import './app-assets/vendors/css/extensions/unslider.css';
import './app-assets/vendors/css/weather-icons/climacons.min.css';
import './app-assets/vendors/css/charts/leaflet.css';


import './app-assets/css/bootstrap.css';
import './app-assets/css/bootstrap-extended.css';
//import './app-assets/css/colors.css';
import './app-assets/css/components.css';

import './app-assets/css/core/menu/menu-types/horizontal-menu.css';
import './app-assets/css/core/colors/palette-gradient.css';
import './app-assets/css/core/colors/palette-climacon.css';
import '././app-assets/fonts/simple-line-icons/style.min.css';
import './app-assets/fonts/meteocons/style.min.css';
import './app-assets/css/pages/users.css';

import './assets/css/style.css';

//import ReactDOM from 'react-dom';

//import './app-assets/vendors/js/vendors.min.js';
// import './app-assets/vendors/js/ui/jquery.sticky.js';
// import './app-assets/vendors/js/charts/jquery.sparkline.min.js';
// import './app-assets/vendors/js/charts/leaflet/leaflet.js';
// import './app-assets/vendors/js/forms/icheck/icheck.min.js';
// import './app-assets/vendors/js/extensions/jquery.knob.min.js';
// import './app-assets/vendors/js/charts/raphael-min.js';
// import './app-assets/vendors/js/charts/morris.min.js';
// import './app-assets/vendors/js/charts/jquery.sparkline.min.js';
// import './app-assets/vendors/js/extensions/unslider-min.js';
// import './app-assets/vendors/js/charts/apexcharts/apexcharts.min.js';

//import './app-assets/js/core/app-menu.js';
// import './app-assets/js/core/app.js';

// import './app-assets/js/scripts/ui/breadcrumbs-with-stats.js';
// import './app-assets/js/scripts/pages/dashboard-fitness.js';


// import CurrenInUsers from "./Components/curren-in-users.component";
// import GetBioreaders from "./Components/bio-readers.components";
import HeaderComponent from './Components/header.components';
import DashboardComponent from './Components/dashboard.component';
import MenuComponent from './Components/menu.component';
import LoginComponent from './Components/Login.Component';
import OrderComponent from './Components/test.component';
import AlarmComponent from './Components/alarm-history.component';
import SiteConfig from "./Components/site.config.component";
import BioUsers from "./Components/biousers.admin.component";
import AlarmAck from "./Components/alarm-acknowledge.component";
import DiscrAck from "./Components/discr.acknow.component";
import AdminUserMngt from "./Components/add.adminuser.component";

//Reports
import AuditReport from "./Components/Reports/auditrail.component";
import ConfigChangeReport from "./Components/Reports/configreport.component";
import VisitorsReport from "./Components/Reports/visitors.report.component";
import EntryExitReport from "./Components/Reports/entryexit.report.component";
import LineConfiguration from "./Components/lineconfiguration.component";
import CheckListConfig from "./Components/checkList.component";
// Socket IO Start
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = process.env.PORT || 4001;
// const index = require("./index");

// const app = express();
// app.use(index);

// const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

// server.listen(port, () => console.log(`Listening on port ${port}`));

 //Socket IO Stop

function App() {

  return (

    <div className="horizontal-layout horizontal-menu 2-columns " data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
      <HeaderComponent></HeaderComponent>
      {/* <CurrenInUsers></CurrenInUsers>
      <GetBioreaders></GetBioreaders> */}
      <MenuComponent></MenuComponent>
      {/* <DashboardComponent></DashboardComponent> */}
      <div className="">
        <Switch>
          <Route exact path={["/", "/Dashboard"]} component={DashboardComponent} />
          <Route exact path={["/Dashboard"]} component={DashboardComponent} />
          <Route exact path={["/Alarm"]} component={AlarmComponent} ></Route>
          <Route exact path={["/BioUsers"]} component={BioUsers}></Route>
          <Route exact path={["/SiteConfig"]} component={SiteConfig}></Route>
          <Route exact path={["/AlarmAck"]} component={AlarmAck}></Route>
          <Route exact path={["/DiscrAck"]} component={DiscrAck}></Route>
          <Route exact path={["/AddUser"]} component={AdminUserMngt}></Route>
          {/* <Route exact path={["/test"]} component={OrderComponent} ></Route> */}
          <Route exact path={["/Login"]} component={LoginComponent} ></Route>
          <Route exact path={["/ConfigReport"]} component={ConfigChangeReport} ></Route>
          <Route exact path={["/Auditreport"]} component={AuditReport}></Route>
          <Route exact path={["/VisitorsReport"]} component={VisitorsReport}></Route>
          <Route exact path={["/EntryExitReport"]} component={EntryExitReport}></Route>
          <Route exact path={["/LineConfig"]} component={LineConfiguration}></Route>
          <Route exact path={["/CheckListConfig"]} component={CheckListConfig}></Route>
        
          <Route exact path={["/test"]} component={OrderComponent} ></Route>
          
          {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
        </Switch>
      </div>
    </div>
  );

}


export default App;

