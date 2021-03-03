//import logo from './app-assets/images/logo/stack-logo-light.png';
import { Route, Switch } from "react-router-dom";
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
// import "../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
import Test2 from './Components/test2';

import AlarmComponent from './Components/alarm-history.component';
import SiteConfig from "./Components/site.config.component";
import BioUsers from "./Components/biousers.admin.component";
import AlarmAck from "./Components/alarm-acknowledge.component";
import DiscrAck from "./Components/discr.acknow.component";
import AdminUserMngt from "./Components/add.adminuser.component";
import VoiceMessageConfig from './Components/voiceMessageconfig.component';
import StdMessage from './Components/sendvoice.message.component';


//Reports
import AuditReport from "./Components/Reports/auditrail.component";
import ConfigChangeReport from "./Components/Reports/configreport.component";
import VisitorsReport from "./Components/Reports/visitors.report.component";
import EntryExitReport from "./Components/Reports/entryexit.report.component";
import LineConfiguration from "./Components/lineconfiguration.component";
import CheckListConfig from "./Components/checkList.component";
import IdleTimeOut from "./Components/idetime.component";
import DiscrepancyReport  from "./Components/Reports/discrepancy.report.component";
import UserEntryExitReport  from "./Components/Reports/users.entryexit.report.component";
import AlarmReport  from "./Components/Reports/alarm.summary.report";
import DiscLineReport from './Components/Reports/Discrepancy.linereport';
import EventReport from "./Components/Reports/event.report";
import LineEvent from "./Components/Reports/eventline.report";


 
function App() {
  
  return (

    <div className="horizontal-layout horizontal-menu 2-columns " data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
      <HeaderComponent></HeaderComponent>
      <IdleTimeOut></IdleTimeOut>      
      <MenuComponent></MenuComponent>    
       
      <div className="">
     
        <Switch>
          <Route exact path={["/", "/Dashboard"]} component={DashboardComponent} />
          <Route exact path={["/"]} component={DashboardComponent} />
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
          <Route exact path={["/VoiceConfig"]} component={VoiceMessageConfig}></Route>
          <Route exact path={["/DiscReport"]} component={DiscrepancyReport}></Route>
          <Route exact path={["/UserEntryExit"]} component={UserEntryExitReport}></Route>
          <Route exact path={["/AlarmReport"]} component={AlarmReport}></Route>
          <Route exact path={["/DiscLineReport"]} component={DiscLineReport}></Route>
          <Route exact path={["/EventReport"]} component={EventReport}></Route>
          <Route exact path={["/LineEvent"]} component={LineEvent}></Route>
          <Route exact path={["/StdMessage"]} component={StdMessage}></Route>


          <Route exact path={["/test"]} component={OrderComponent} ></Route>
          <Route exact path={["/test2"]} component={Test2} ></Route>

          {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
        </Switch>
      </div>
    </div>
  );

}


export default App;

