import React from 'react';
import SACSDataServices from "../Services/sacs.services";
import { Link, Redirect } from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, Form,FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faHome, faAngleDown, faCogs, faUsersCog, faFileAlt } from '@fortawesome/free-solid-svg-icons';


export default class Menus extends React.PureComponent {
    constructor(props) {
        super(props);
        this.retriveSACSServerStatus = this.retriveSACSServerStatus.bind(this);
        this.state = {
            Menus: [],
            Server: [],
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.retriveSACSServerStatus();
        }, 6000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    retriveSACSServerStatus() {
        SACSDataServices.GetAllSACSServerStatus().then(response => {
            // alert(JSON.stringify( response.data))
            this.setState({
                Server: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow navbar-shadow menu-border"
                role="navigation" data-menu="menu-wrapper">
                <div className="navbar-container main-menu-content col-md-7" data-menu="menu-container">
                    <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                        {/* <Link to={"/Dashboard"} className="dropdown-toggle nav-link btn"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="dropdown">
                                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                                <span data-i18n="Dashboard">Dashboard</span>
                            </li>
                        </Link> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle href="/Dashboard" variant="" id="basic">
                                Dashboard
                            </Dropdown.Toggle>                            
                        </Dropdown> */}
                        <Navbar bg="" expand="lg">
                           
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/Dashboard"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Dashboard</Nav.Link>                                    
                                    <NavDropdown title={<span><FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon> Reports <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon> </span> }
                                     id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/Auditreport"> Audit Trail</NavDropdown.Item>
                                        <NavDropdown.Item href="/ConfigReport">Config Change</NavDropdown.Item>
                                        <NavDropdown.Item href="/EntryExitReport">Entry/Exit</NavDropdown.Item>
                                        <NavDropdown.Item href="/VisitorsReport">Visitors</NavDropdown.Item>
                                        <NavDropdown.Item href="/Alarm">Alarm History</NavDropdown.Item>
                                        <NavDropdown.Divider />                                                                               
                                    </NavDropdown>
                                    
                                    <NavDropdown title={<span><FontAwesomeIcon icon={faCogs}></FontAwesomeIcon> Configurations <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></span> } id="basic-nav-dropdown">                                     
                                        <NavDropdown.Item href="/SiteConfig"> Site Configurations</NavDropdown.Item>
                                        <NavDropdown.Item href="/LineConfig"> Line Configurations</NavDropdown.Item>  
                                        <NavDropdown.Item href="/CheckListConfig"> Checklist Configurations</NavDropdown.Item>                                       
                                        <NavDropdown.Divider />                                                                              
                                    </NavDropdown>
                                    {/* // Users Management */}
                                    <NavDropdown title={<span><FontAwesomeIcon icon={faUsersCog}></FontAwesomeIcon> Users Managemet <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon> </span> } id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/BioUsers">Bio Users</NavDropdown.Item>
                                        <NavDropdown.Item href="/AddUser">Add Admin Usres</NavDropdown.Item>
                                       
                                        <NavDropdown.Divider />                                       
                                    </NavDropdown>
                                </Nav>                                
                            </Navbar.Collapse>
                        </Navbar>

                        {/* <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
                        <Link to={""} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">

                                <span data-i18n="OrderComponent"></span>
                            </li>
                        </Link> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                Reports
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/Auditreport">Audit Trail</Dropdown.Item>
                                <Dropdown.Item href="/ConfigReport">Config Change</Dropdown.Item>
                                <Dropdown.Item href="/EntryExitReport">Entry/Exit</Dropdown.Item>
                                <Dropdown.Item href="/VisitorsReport">Visitors</Dropdown.Item>
                                <Dropdown.Item href="/Alarm">Alarm History</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Link to={"/Dashboard"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="dropdown">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="Dashboard">Reports</span>
                            </li>
                        </Link> */}
                        {/* <Link to={"/Alarm"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="OrderComponent">Alarm</span>
                            </li>
                        </Link> */}
                        {/* <Link to={"/Alarm"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">

                                <span data-i18n="OrderComponent"></span>
                            </li>
                        </Link> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                Configurations
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/SiteConfig">Site Configurations</Dropdown.Item>
                                <Dropdown.Item href="/LineConfig"> Line Configurations </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Link to={"/SiteConfig"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="site">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="OrderComponent">Site Configuration</span>
                            </li>
                        </Link> */}
                        {/* <Link to={"/Alarm"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">
                                <span data-i18n="OrderComponent"></span>
                            </li>
                        </Link> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                Users Management
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/BioUsers">Bio Users</Dropdown.Item>
                                <Dropdown.Item href="/AddUser">Add Admin Usres</Dropdown.Item>
                               
                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Link to={"/BioUsers"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="BioUsers">Bio Usres</span>
                            </li>
                        </Link>
                        <Link to={"/AddUser"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="BioUsers">Add Usres</span>
                            </li>
                        </Link>
                        <Link to={"/test"} className="dropdown-toggle nav-link"
                            data-toggle="dropdown">
                            <li className="dropdown nav-item" data-menu="test">
                                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                <span data-i18n="OrderComponent">Test</span>
                            </li>
                        </Link> */}

                    </ul>
                </div>
                <div className="navbar-container main-menu-content col-md-6" data-menu="menu-container" style={{ paddingTop: '9px' }}>
                    {
                        this.state.Server.map(ser => (
                            ser.code === "MainEventServerVisible" ?
                                <div style={{ display: 'inline-block' }}>
                                    {ser.nDurationDifference >= 3000 ?
                                        <div class="btn-group mr-1 mb-1">
                                            <button type="button" class="btn btn-outline-danger blink">BioMetric</button>
                                            <button type="button" class="btn btn-danger blink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Offline
                                            </button>
                                        </div> :
                                        <div class="btn-group mr-1 mb-1">
                                            <button type="button" class="btn btn-outline-success">BioMetric</button>
                                            <button type="button" class="btn btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Online
                                            </button>
                                        </div>
                                    }
                                </div>
                                : ser.code === "PLCServerVisible" ?
                                    <div style={{ display: 'inline-block' }}>
                                        {ser.nDurationDifference >= 3000 ?
                                            <div class="btn-group mr-1 mb-1">
                                                <button type="button" class="btn btn-outline-danger blink">PLC</button>
                                                <button type="button" class="btn btn-danger blink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Offline
                                            </button>
                                            </div> :
                                            <div class="btn-group mr-1 mb-1">
                                                <button type="button" class="btn btn-outline-success">PLC</button>
                                                <button type="button" class="btn btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Online
                                            </button>
                                            </div>
                                        }
                                    </div >
                                    : ser.code === "VoiceAlertsServer" ?
                                        <div style={{ display: 'inline-block' }}>
                                            {ser.nDurationDifference >= 3000 ?
                                                <div class="btn-group mr-1 mb-1">
                                                    <button type="button" class="btn btn-outline-danger blink">Voice</button>
                                                    <button type="button" class="btn btn-danger blink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Offline
                                            </button>
                                                </div> :
                                                <div class="btn-group mr-1 mb-1">
                                                    <button type="button" class="btn btn-outline-success">Voice</button>
                                                    <button type="button" class="btn btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Online
                                            </button>
                                                </div>
                                            }
                                        </div>
                                        : ser.code === "MiscServer" ?
                                            <div style={{ display: 'inline-block' }}>
                                                {ser.nDurationDifference >= 3000 ?
                                                    <div class="btn-group mr-1 mb-1">
                                                        <button type="button" class="btn btn-outline-danger blink">Backup</button>
                                                        <button type="button" class="btn btn-danger blink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Offline
                                            </button>
                                                    </div> :
                                                    <div class="btn-group mr-1 mb-1">
                                                        <button type="button" class="btn btn-outline-success">Backup</button>
                                                        <button type="button" class="btn btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Online
                                            </button>
                                                    </div>
                                                }
                                            </div>
                                            : <div></div>
                        ))
                    }
                    {/* <div class="btn-group mr-1 mb-1">
                        <button type="button" class="btn btn-outline-danger">BioMetric</button>
                        <button type="button" class="btn btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                    </div> */}
                    {/* <div class="btn-group mr-1 mb-1">
                        <button type="button" class="btn btn-outline-danger">PLC</button>
                        <button type="button" class="btn btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div class="btn-group mr-1 mb-1">
                        <button type="button" class="btn btn-outline-danger">Voice Alert</button>
                        <button type="button" class="btn btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                    </div>
                    <div class="btn-group mr-1 mb-1">
                        <button type="button" class="btn btn-outline-danger">Backup</button>
                        <button type="button" class="btn btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                    </div> */}
                </div>
            </div>
        )
    }
}
