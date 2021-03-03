import clientlogo from '../app-assets/images/icons/cmp-logo.png';
import React from 'react';
import SACSDataServices from "../Services/sacs.services";
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import moment from "moment";
 class cHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.retriveHeaderDetails = this.retriveHeaderDetails.bind(this);
        this.state = {
            appName: "",
            appVersion: "",
            plantName: "",
            UserName: "",
            TimeOut: 0,
            LoginStatus: "",
            time: new Date().toLocaleString(),
            selectedTab : 0
        };
    }

    componentDidMount() {
        document.title=localStorage.getItem('app');
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
            localStorage.setItem('app', response.data.appName)
            localStorage.setItem('plant', response.data.plantName)

            // var Token = localStorage.getItem("Token");
            // var FirstName = localStorage.getItem('FirstName');
            // // alert(FirstName)
            // // this.state.UserName = localStorage.getItem('FirstName');
            // this.setState({
            //     UserName: localStorage.getItem('FirstName')
            // })
            //console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }
    handleLogOut = (e) => {        
        localStorage.removeItem("Token");
        localStorage.removeItem('FirstName');
        localStorage.removeItem('timeout');
        localStorage.removeItem('UserId');             
        this.props.history.push('/');       
    }
    render() {
        return (
            <nav  className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-static-top navbar-dark bg-gradient-x-grey-blue navbar-border navbar-brand-center">
                <div className="navbar-wrapper" style={{paddingBottom:"10px"}}>
                    <div className="navbar-header" align="center">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item">
                                <div className="navbar-brand">
                                    <h1 className="brand-text">{this.state.appName}   </h1>
                                    <p>{this.state.plantName} - {moment(this.state.time).format("DD-MM-YYYY HH:mm:ss")}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-container content" >
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                                <li className="nav-item d-none d-md-block">
                                    <img src={clientlogo} className="clientlogo" alt="client logo"></img>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-notification nav-item" >
                                    {localStorage.getItem('FirstName') && 
                                    <Navbar bg="" expand="lg" className=" bg-gradient-x-grey-blue" >
                                        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                                        <Navbar.Collapse id="basic-navbar-nav" >
                                            <Nav className="mr-auto" >
                                                <NavDropdown
                                                    title={<span> {localStorage.getItem('FirstName')} <span> </span> 
                                                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon> </span>} id="basic-nav-dropdown">
                                                    <NavDropdown.Item onSelect={this.handleLogOut}>LogOut</NavDropdown.Item>                                                                                                    
                                                </NavDropdown>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Navbar>
                                    }
                                </li>
                              
                                <li className="dropdown dropdown-notification nav-item">
                                    {!localStorage.getItem('FirstName') &&
                                        // <button type="submit" onClick={this.handleLogOut} className="btn btn-success" >Logout</button> :
                                        <Link to="/Login" className="btn btn-success">Login </Link>
                                    }


                                </li>
                                {/* <li className="dropdown dropdown-notification nav-item" >

                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
export default withRouter(cHeaderComponent)