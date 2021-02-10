import logo from '../app-assets/images/logo/stack-logo-light.png';
import clientlogo from '../app-assets/images/icons/cmp-logo.png';
import React from 'react';
import SACSDataServices from "../Services/sacs.services";
import { render } from '@testing-library/react';
import avatar from '../app-assets/images/portrait/small/avatar-s-1.png';
import { isThisSecond } from 'date-fns';

import { Link } from 'react-router-dom';
import moment from "moment";
export default class cHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.retriveHeaderDetails = this.retriveHeaderDetails.bind(this);
        this.state = {
            appName: "",
            appVersion: "",
            plantName: "",
            time: new Date().toLocaleString()
        };
    }
    componentDidMount() {
        this.retriveHeaderDetails();
        this.intervalID = setInterval(
            () => this.tick(),
            1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    retriveHeaderDetails() {
        SACSDataServices.GetAppHeaderdetails().then(response => {
            this.setState({
                appName: response.data.appName,
                appVersion: response.data.appVersion,
                plantName: response.data.plantName,
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <nav style={{ padding: "10px" }} className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-static-top navbar-dark bg-gradient-x-grey-blue navbar-border navbar-brand-center">
                <div className="navbar-wrapper">
                    <div className="navbar-header" align="center">
                        <ul style={{  }} className="nav navbar-nav flex-row">                            
                            <li className="nav-item">
                                <div className="navbar-brand">
                                    {/* <img className="brand-logo" alt="logo"
                                        src={logo}></img> */}
                                </div>
                            </li>
                            <li className="nav-item">
                                <div  className="navbar-brand">
                                    <h1 className="brand-text">{this.state.appName}   </h1>
                                    <p>{this.state.plantName} - {moment(this.state.time).format("DD-MM-YYYY HH:mm:ss")}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                                <li className="nav-item d-none d-md-block">

                                    <img src={clientlogo} className="clientlogo" alt="client logo"></img>

                                </li>

                            </ul>

                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-notification nav-item"><a className="nav-link nav-link-label" href="#" data-toggle="dropdown">
                                    <span className="badge badge-pill badge-danger badge-up"></span></a>
                                </li>
                                <li className="dropdown dropdown-notification nav-item">
                                    <Link to="/Login" className="btn btn-success">Login</Link>
                                    <a className="nav-link nav-link-label" href="#" data-toggle="dropdown">
                                        <span className="badge badge-pill badge-warning badge-up"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

