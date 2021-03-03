import React from 'react';
import SACSDataServices from "../Services/sacs.services";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
//const [lineid, selectedLineID] = useState(0);
class PageHeader extends React.PureComponent {
    handle = null;
    constructor(props) {
        super(props);
        this.retriveAllLinesDate = this.retriveAllLinesDate.bind(this);
        this.retrieveBioreaders = this.retrieveBioreaders.bind(this);
        this.retriveMaxCountDetails = this.retriveMaxCountDetails.bind(this);
        this.retrieveCurrentInUsers = this.retrieveCurrentInUsers.bind(this);
        this.retrieveBioreaders = this.retrieveBioreaders.bind(this);
        this.retriveGetAllHMIStatus = this.retriveGetAllHMIStatus.bind(this);
        this.retriveDoorsByLineID = this.retriveDoorsByLineID.bind(this);
        this.retriveAllComandByLineID = this.retriveAllComandByLineID.bind(this);
        this.state = {
            Lines: [],
            LineId: 1,
            users: [],
            bioreader: [],
            HMIs: [],
            Doors: [],
            Commands: [],
            Alerts: [],
            MaxCount: "",
            CurrentCount: "",
            SelectedLineID: 0,
            SelectedLineName: "Sterile Corridor",
            CommandEvent: "",
            ShowBioreader: "",
            ShowHMIStstus: "none",
            ShowSubLine: "",
            isCommandOpen: false,
            CommendAlerts: "none",
            CommandMessage: "",
            CommandId: "",
            Remarks: ""
        }
    }
    componentDidMount() {

        this.retriveAllLinesDate();
        this.retriveDoorsByLineID();
        this.retriveAllComandByLineID();
        this.handle = this.timer = setInterval(() => {
            this.retrieveBioreaders();
            this.retriveGetAllHMIStatus();
            this.retriveDashboardAlert();
            if (this.state.SelectedLineID > 0) {
                //alert(this.state.SelectedLineID);
                this.retriveUsersandCurrentandMaxCountDetails(this.state.SelectedLineID);

            }
            else {
                this.retrieveCurrentInUsers();
                this.retriveMaxCountDetails();
                this.retriveDoorsByLineID();
                this.retriveAllComandByLineID();
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    retriveAllLinesDate() {
        SACSDataServices.GetALlLines().then(response => {
            this.setState({
                Lines: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    retriveMaxCountDetails() {
        SACSDataServices.UpdateUIConfiguration(1).then(response => {
            this.setState({
                MaxCount: response.data.m_nMaxCount,
                CurrentCount: response.data.m_nCurrentCount
            });
            //console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }
    retriveDoorsByLineID() {
        SACSDataServices.LoadDoorStatusPoints(1).then(response => {

            this.setState({
                Doors: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    retriveAllComandByLineID() {
        SACSDataServices.LoadLineCommandPoints(1).then(response => {

            this.setState({
                Commands: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    retriveDashboardAlert() {
        SACSDataServices.GetDashboardAlert().then(response => {
            this.setState({
                Alerts: response.data
            });
        }).catch(() => {

        });
    }
    retrieveCurrentInUsers() {
        SACSDataServices.GetAllCurrentInUsers().then(response => {

            this.setState({
                users: response.data
            });
            //console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }
    retrieveBioreaders() {
        SACSDataServices.GetBioReaders()
            .then(response => {
                this.setState({
                    bioreader: response.data
                });
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    retriveGetAllHMIStatus() {
        SACSDataServices.GetAllHMIStatus().then(response => {
            this.setState({
                HMIs: response.data
            });
            //console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    retriveUsersandCurrentandMaxCountDetails() {
        SACSDataServices.GetAllUsersByLineId(this.state.SelectedLineID).then(response => {
            this.setState({
                users: response.data,
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        SACSDataServices.UpdateUIConfiguration(this.state.SelectedLineID).then(response => {
            this.setState({
                MaxCount: response.data.m_nMaxCount,
                CurrentCount: response.data.m_nCurrentCount
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        SACSDataServices.LoadDoorStatusPoints(this.state.SelectedLineID).then(response => {

            this.setState({
                Doors: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        SACSDataServices.LoadLineCommandPoints(this.state.SelectedLineID).then(response => {

            this.setState({
                Commands: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    onChange = event => {
        //  alert(event.target.value)
        event.preventDefault();
        this.setState({
            SelectedLineName: event.nativeEvent.target[event.target.value - 1].text,
            LineId: event.target.value,
        });
        SACSDataServices.GetAllUsersByLineId(event.target.value).then(response => {
            this.setState({
                users: response.data,
                SelectedLineID: event.target.value,
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        SACSDataServices.UpdateUIConfiguration(event.target.value).then(response => {
            this.setState({
                MaxCount: response.data.m_nMaxCount,
                CurrentCount: response.data.m_nCurrentCount
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        SACSDataServices.LoadDoorStatusPoints(event.target.value).then(response => {
            this.setState({
                Doors: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        if (event.target.value > 1) {
            this.setState({ ShowSubLine: "none" })
        }
        else {
            this.setState({ ShowSubLine: "" })
        }

    }
    OnCommandRowClick = (e) => {

        this.setState({
            CommandEvent: e.target.value
        })
        e.preventDefault();

    }
    onClickLineAreaCommand = (e) => {
        SACSDataServices.GetCommandNameByCommandId(e.target.value).then(response => {
            this.setState({
                CommandEvent: response.data,
                CommandId: e.target.value,
                Remarks: ""
            })
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        this.openAckIndModal()
    }
    showToBioReader = () => {
        this.setState({
            ShowHMIStstus: "none",
            ShowBioreader: ""
        })
    }
    showToHMIStatus = () => {
        this.setState({
            ShowBioreader: "none",
            ShowHMIStstus: ""
        })
    }
    openAckIndModal = () => {
        this.setState({
            isCommandOpen: true,
            CommendAlerts: "none"
        })
    }
    handleSaveCommand = () => {

        if ((this.state.Remarks == null || this.state.Remarks == "") && this.state.Remarks.length>=6  )
            return false;
        SACSDataServices.SaveCommand(this.state.CommandId, localStorage.getItem('UserId'), this.state.Remarks).then(response => {
            //alert(response.data)
            if (response.data === "Ok") {
                this.setState({
                    CommendAlerts: "",
                    CommandMessage: "Command Saved Successfully",
                    Remarks: ""
                })
            }
            else if (response.data != "Ok" && response.data.minLength > 1) {
                this.setState({
                    CommendAlerts: response.data,
                    CommandMessage: response.data,
                })
            }
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    closeAckIndModal = () => this.setState({ isCommandOpen: false, CommendAlerts: "none", Remarks: "" });

    render() {
        return (
            <div>
                <div className="row grouped-multiple-statistics-card">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                                        <div className="d-flex align-items-start mb-sm-1 mb-xl-0 border-right-blue-grey border-right-lighten-5">
                                            <div className="stats-amount col-md-12">
                                                <h5 className="heading-text text-bold-600">Select Line</h5>
                                                <select id="ddlLines" name="ddlLines"
                                                    // value={this.state.Lines.find(obj => obj.value === selectedValue)}
                                                    // defaultValue={this.state.selectValue}
                                                    onChange={this.onChange}
                                                    className="form-control col-md-12">
                                                    {
                                                        this.state.Lines.map(lines => (
                                                            <option className="" value={lines.id}>
                                                                {lines.lineName}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            {/* <p>{selectedValue}</p> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                                        <div className="d-flex align-items-start mb-sm-1 mb-xl-0 border-right-blue-grey border-right-lighten-5">
                                            <span className="card-icon danger d-flex justify-content-center">
                                                <i className="icon p-1 icon-pie-chart customize-icon font-large-2 p-1"></i>
                                            </span>
                                            <div className="stats-amount col-md-10">
                                                <h4 className="heading-text text-bold-600"> {this.state.CurrentCount}</h4>
                                                <h5 className="sub-heading text-bold-600"> {this.state.MaxCount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                                        <div className="d-flex align-items-start border-right-blue-grey border-right-lighten-5">
                                            <span className="card-icon success d-flex justify-content-center">
                                                <i className="icon p-1 icon-graph customize-icon font-large-2 p-1"></i>
                                            </span>
                                            <div className="stats-amount mr-3">
                                                <br></br>
                                                {
                                                    this.state.Alerts.discrepanciesCount == 0 ?
                                                        <button onClick={() => window.location.href = '/DiscrAck'}
                                                            className="btn btn-success" disabled={!localStorage.getItem("FirstName") && "disabled"} >Acknowledge Discrepancies</button>
                                                        :
                                                        <button onClick={() => window.location.href = '/DiscrAck'}
                                                            className="btn btn-danger blink" disabled={!localStorage.getItem("FirstName") && "disabled"}
                                                        >Acknowledge Discrepancies</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                                        <div className="d-flex align-items-start border-right-blue-grey border-right-lighten-5">
                                            <span className="card-icon success d-flex justify-content-center">
                                                <i className="icon p-1 icon-bar-chart customize-icon font-large-2 p-1"></i>
                                            </span>
                                            <div className="stats-amount mr-3">
                                                <br></br>
                                                {
                                                    this.state.Alerts.activeAlarmCount == 0 ?
                                                        <button onClick={() => window.location.href = '/AlarmAck'}
                                                            disabled={!localStorage.getItem("FirstName") && "disabled"}
                                                            className="btn btn-success">Active Alarms for All Lines</button>
                                                        :
                                                        <button onClick={() => window.location.href = '/AlarmAck'}
                                                            disabled={!localStorage.getItem("FirstName") && "disabled"}
                                                            className="btn btn-danger blink">Active Alarms for All Lines</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row minimal-modern-charts">
                    <div className="col-xxl-6 col-xl-8 col-lg-8 col-md-12 col-12 power-consumption-stats-chart">
                        <div className="card">
                            <div className="card-content pt-2 px-1">
                                <div className="row">
                                    <div className="col-8 d-flex">
                                        <div className="ml-1">
                                            <h4 className="power-consumption-stats-title text-bold-500">
                                                Currently In Users in Selected Area/Line</h4>
                                        </div>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end pr-3">
                                        <div className="dark-text">
                                            <h4 className="power-consumption-active-tab text-bold-500">{this.state.SelectedLineName}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div id="spline-chart">
                                    <div className="table-responsive" style={{ maxHeight: "330px" }}>
                                        <table className="table">
                                            <thead className="">
                                                <tr>
                                                    <th>EID</th>
                                                    <th style={{ display: this.state.ShowSubLine }}>Sub Line Name</th>
                                                    <th>User Name</th>
                                                    <th>Entry Time</th>
                                                    <th>Door Status</th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.users.map(usr => (
                                                        <tr key={usr.userEID} style={{ backgroundColor: usr.rowColour }}>
                                                            <td>{usr.userEID}</td>
                                                            <td style={{ display: this.state.ShowSubLine }}>{usr.subLineName}</td>
                                                            <td>{usr.userName}</td>
                                                            <td>{moment(usr.inTime).format("HH:mm:ss")}</td>
                                                            <td>{usr.doorStatus}</td>
                                                            <td>{usr.duration}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12 tracking-stats-chart" >
                        <div className="card chart-with-tabs">
                            <div className="card-content">
                                <ul className="nav nav-pills card-tabs pl-2 border-bottom-blue-grey border-bottom-lighten-5" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a> <h4 className="nav-link text-primary bg-transparent active px-0 mr-1 py-1"
                                            id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                            role="tab" aria-controls="pills-home" aria-selected="true">Door Status/Line Commands</h4></a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent" >
                                    <div className="tracking-tab-container px-2" >
                                        <div className="tracking-tab-content">
                                            <div className="top-content d-flex flex-wrap justify-content-start" style={{ maxHeight: "450px" }}>
                                                <div className="pb-75">
                                                    <h5 className="tracking-tab-title mb-0 text-bold-600">Door Status</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                {
                                                                    this.state.Doors.map(door => (
                                                                        <button className="btn badge badge-pill badge-success px-1 py-50"
                                                                            style={{ backgroundColor: door.rowColour }}> <span style={{ color: "white" }}>{door.name}</span></button>
                                                                    ))
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <h5 className="tracking-tab-title mb-0 text-bold-600">Line/Area Command</h5>
                                            <div className="bottom-content" style={{ maxHeight: "450px", paddingBottom: "10px" }}>
                                                <table>
                                                    <tbody>
                                                        {
                                                            this.state.Commands.map(cmd => (
                                                                <tr>
                                                                    <td value={cmd.id}
                                                                        className="tracking-list list-group text-center">
                                                                        <span style={{ backgroundColor: cmd.rowColour }} className=" list-group-item border py-1 px-0 d-flex justify-content-between align-items-center" >
                                                                            <button className="btn tracking-task text-bold-600"
                                                                                disabled={!localStorage.getItem("FirstName") && "disabled"}
                                                                                value={cmd.id} onClick={this.onClickLineAreaCommand}
                                                                                style={{ backgroundColor: cmd.rowColour, minWidth: "290px", textAlign: "center" }}>
                                                                                {cmd.uiname}
                                                                            </button>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.isCommandOpen} onHide={this.openAckIndModal}>
                        <Modal.Header closeButton className="modal-header bg-danger white">
                            <Modal.Title >
                                <h4 className="modal-title text-center" id="myModalLabel10">Please confirm to {this.state.CommandEvent} </h4>
                            </Modal.Title>
                        </Modal.Header>
                        <form onSubmit={e => e.preventDefault()}>
                            <Modal.Body className="modal-body">
                                <div >
                                    <h4>Please enter remarks </h4>
                                    <div className="form-group">
                                        <input type="text" value={this.state.Remarks}
                                            onChange={e => this.setState({ Remarks: e.target.value })}
                                            placeholder="Remarks" minLength="6" className="form-control" required></input>
                                    </div>
                                </div>
                                <div className="alert alert-success" role="alert" style={{ display: this.state.CommendAlerts }}>
                                    <span className="text-bold-600">Done!</span> {this.state.CommandMessage}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAckIndModal}> Close </Button>
                                <Button type="Submit" onClick={() => this.handleSaveCommand()} variant="secondary"> Submit </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                    <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12 region-stats-chart">
                        <div className="card statistic-card">
                            <div className="card-content">
                                {/* <div className="top-row statistics-card-title border-bottom-blue-grey border-bottom-lighten-5">
                                    <div className="py-1 pl-2 primary">
                                        <h4 className="mb-1">Entry/Exit HMI Status</h4>
                                    </div>
                                </div> */}
                                <ul className="nav nav-pills card-tabs pl-2 border-bottom-blue-grey border-bottom-lighten-5" id="pills-tab" role="tablist">

                                    <li className="nav-item">
                                        <a onClick={this.showToBioReader}> <h4 className="nav-link text-primary bg-transparent active px-0 mr-1 py-1"
                                            id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                            role="tab" aria-controls="pills-home" aria-selected="true">HMI Status</h4></a>
                                    </li>
                                    <li className="nav-item" >
                                        <a onClick={this.showToHMIStatus}> <h4 className="nav-link text-primary bg-transparent active px-0 mr-1 py-1"
                                            id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                            role="tab" aria-controls="pills-home" aria-selected="true"> Bio Readers</h4></a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a> <h4 className="nav-link text-danger bg-transparent active px-0 mr-1 py-1"
                                            id="pills-home-tab"
                                            role="tab" aria-controls="pills-home" aria-selected="true"> 
                                            <i className="icon icon-settings"></i></h4></a>
                                    </li> */}
                                </ul>
                                <div style={{ display: this.state.ShowBioreader }} className="tab-pane fade show ">
                                    <div className="body-header pl-2">
                                        <div className="d-flex">
                                            <h5 className="mr-2 body-header-title text-bold-600 mb-0">HMI Devices</h5>
                                        </div>
                                        <div className="body-header-subtitle" >
                                            <div className="table-responsive" style={{ maxHeight: "350px" }}>
                                                <table className="table">
                                                    <thead className="">
                                                        <tr>
                                                            <th>Line Name</th>
                                                            <th>HMI Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.HMIs.map(hmi => (
                                                                hmi.hmiStatus == true ? (
                                                                    <tr style={{ backgroundColor: "#40bf80" }}>
                                                                        <td>{hmi.lineName}</td>
                                                                        <td>{hmi.hmiName} </td>
                                                                    </tr>
                                                                ) : (
                                                                        <tr  style={{ backgroundColor: "#ff8080" }}>
                                                                            <td>{hmi.lineName}</td>
                                                                            <td>{hmi.hmiName} </td>
                                                                        </tr>
                                                                    )
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show " role="tabpanel"
                                    style={{ display: this.state.ShowHMIStstus}}>
                                    <div className="body-header pl-2">
                                        <div className="d-flex">
                                            <h5 className="mr-2 body-header-title text-bold-600 mb-0">Bio Readers</h5>
                                        </div>
                                        <div className="body-header-subtitle">
                                            <div className="table-responsive" style={{ maxHeight: "350px" }}>
                                                <table className="table">
                                                    <thead className="">
                                                        <tr>
                                                            <th>Line Name</th>
                                                            <th>Device Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.bioreader.map(reader => (
                                                                <tr  style={{ backgroundColor: reader.rowColour }}>
                                                                    <td>{reader.lineName}</td>
                                                                    <td>{reader.deviceName}</td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

class ServeerStatus extends React.Component {
    constructor(props) {
        super(props);
        this.retriveSACSServerStatus = this.retriveSACSServerStatus.bind(this);
        this.state = {
            Serverdata: []
        }
    }
    componentDidMount() {
        //this.timer = setInterval(() => {
        this.retriveSACSServerStatus();
        //}, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    retriveSACSServerStatus() {
        SACSDataServices.GetAllSACSServerStatus().then(response => {
            this.setState({
                Serverdata: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <div className="col-xxl-4 col-xl-8 col-lg-8 col-md-12 col-12 latest-update-tracking">
                <div className="card">
                    <div className="card-header latest-update-heading d-flex justify-content-between">
                        <h4 className="latest-update-heading-title text-bold-500">Servers Status</h4>

                    </div>
                    <div className="card-content latest-update-tracking-list pt-0 pb-1 px-2 position-relative">
                        <div className="table-responsive" style={{ maxHeight: '250px' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Server Name</th>
                                        <th>Updated Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Serverdata.map(ser => (

                                            <tr  style={{ backgroundColor: ser.rowColour }}>
                                                <td>{ser.serverNameInUi}</td>
                                                <td>{moment(ser.serverUpdatedTime).format("HH:mm:ss")}</td>
                                            </tr>

                                        ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

class PLCStatus extends React.Component {
    constructor(props) {
        super(props);
        this.retriveGetAllPLCStatus = this.retriveGetAllPLCStatus.bind(this)
        this.state = {
            PLCSData: []
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {

            this.retriveGetAllPLCStatus();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    retriveGetAllPLCStatus() {
        SACSDataServices.GetAllPLCStatus().then(response => {
            this.setState({
                PLCSData: response.data
            });
            //console.log(response.data);
        }).catch(e => {
            console.log(e);
        })
    }
    render() {
        return (
            <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="card info-time-tracking">
                    <div className="card-content">
                        <div className="row">
                            <div className="col-12 pt-2 pb-1 border-bottom-blue-grey border-bottom-lighten-5">
                                <div className="info-time-tracking-title d-flex justify-content-between align-items-center">
                                    <h5 className="pl-2 mb-0 title-info-time-heading text-bold-500">PLC(DIS) Status</h5>
                                    <span className="pr-2">
                                        <i className="icon icon-settings"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="info-time-tracking-content">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12  ">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Line Name</th>
                                                        <th>PLC(DIS) Name</th>
                                                        <th>Line Name</th>
                                                        <th>PLC(DIS) Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.PLCSData.map(plc => (
                                                            <tr  style={{ backgroundColor: plc.rowColour }}>
                                                                <td>{plc.lineName}</td>
                                                                <td>{plc.plcName}</td>
                                                            </tr>
                                                        ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body" style={{ lineHeight: "1" }, { fontSize: "0.9rem" }}>
                        <React.Fragment>
                            <PageHeader></PageHeader>
                            <div className="row minimal-modern-charts">
                                {/* <CurrentInUsers></CurrentInUsers> */}
                                {/* <Bioreader></Bioreader>
                                <HMIStatus></HMIStatus> */}
                                <ServeerStatus></ServeerStatus>
                                <PLCStatus></PLCStatus>
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        )
    }
}
<Page></Page>