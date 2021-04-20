import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from "react-bootstrap";

export default class AlarmHistory extends React.Component {
    constructor(props) {
        super(props);
        //this.retriveAlarmHistoryData = this.retriveAlarmHistoryData.bind(this);
        this.state = {
            data: [],
            isAllOpen: false,
            isIndividualOpen: false,
            Alerts: "none",
            Remarks: "",
            UserId: "",
            Id: "",
            Message: "",
            AllAlrmAckDisable: "",
        }
    }
    componentDidMount() {
        this.retriveAlarmHistoryData();
    }

    onClick = (e) => {
        SACSDataServices.GetAllPendingAlarms().then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    retriveAlarmHistoryData() {
        SACSDataServices.GetAllPendingAlarms().then(response => {
            
            this.setState({
                data: response.data
            });
            if (response.data == null || response.data == "") {
               
                this.setState({
                    AllAlrmAckDisable:"disable"
                });
            }
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    handleSubmitAllAck = async (event) => {
        SACSDataServices.SaveAlarmAllAckkowledgement(this.state.Remarks, localStorage.getItem('UserId')).then(response => {
            if (response.data == true) {
                this.retriveAlarmHistoryData();
                this.setState({
                    Alerts: "",
                    Remarks: ""
                })
            }
        }).catch(e => {
            console.log(e);
        });
    }
    handleSubmitSingleAck = async () => {
        SACSDataServices.SaveAlarmSingleAckkowledgement(this.state.Id, this.state.Remarks, localStorage.getItem('UserId')).then(response => {

            if (response.data == true) {
                this.retriveAlarmHistoryData();
                this.setState({
                    Alerts: "",
                    Remarks: ""
                })
            }
        }).catch(e => {
            console.log(e);
        });
    }
    onClickRow = (e) => {
        this.setState({
            Id: e
        });
    }
    openAckAllModal = () => this.setState({ isAllOpen: true, Remarks: "", Alerts: "none" });
    closeAckAllModal = () => this.setState({ isAllOpen: false });
    openAckIndModal = () => this.setState({ isIndividualOpenOpen: true, Remarks: "", Alerts: "none" });
    closeAckIndModal = () => this.setState({ isIndividualOpenOpen: false });
    render() {
        return (

            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Alarm Acknowledgement</h3>
                        </div>
                    </div>
                    <Modal show={this.state.isAllOpen} onHide={this.closeAckAllModal}>
                        <Modal.Header closeButton className="modal-header bg-danger white">
                            <Modal.Title >
                                <h4 className="modal-title" id="myModalLabel10">Confirm to Acknowledge All Active Alarm</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <form onSubmit={e => e.preventDefault()}>
                            <Modal.Body className="modal-body">
                                <div >
                                    <h4>Please enter remarks </h4>
                                    <div className="form-group">
                                        <input type="text" value={this.state.Remarks} onChange={e => this.setState({ Remarks: e.target.value })} placeholder="Remarks" minLength="6" className="form-control" required></input>
                                    </div>
                                </div>
                                <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                    <span className="text-bold-600">Done!</span> You successfully Acknowledged all Alarms.
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAckAllModal}> Close </Button>
                                <Button type="Submit" onClick={() => this.handleSubmitAllAck()} variant="secondary"> Submit </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    <Modal show={this.state.isIndividualOpenOpen} onHide={this.openAckIndModal}>
                        <Modal.Header closeButton className="modal-header bg-danger white">
                            <Modal.Title >
                                <h4 className="modal-title text-center" id="myModalLabel10">Confirm to Acknowledge Alarm</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <form onSubmit={e => e.preventDefault()}>
                            <Modal.Body className="modal-body">
                                <div >
                                    <h4>Please enter remarks </h4>
                                    <div className="form-group">
                                        <input type="text" value={this.state.Remarks} onChange={e => this.setState({ Remarks: e.target.value })} placeholder="Remarks" minLength="6" className="form-control" required></input>
                                    </div>
                                </div>
                                <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                    <span className="text-bold-600">Done!</span> You successfully Acknowledged Alarm.
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAckIndModal}> Close </Button>
                                <Button type="Submit" onClick={() => this.handleSubmitSingleAck()} variant="secondary"> Submit </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    <div className="content-body">
                        <section id="horizontal">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="heading-elements">
                                                <ul className="list-inline mb-0">
                                                    <li style={{ paddingRight: "15px" }}><button onClick={this.openAckAllModal}
                                                        className="btn btn-primary" disabled={this.state.AllAlrmAckDisable} >Acknowledge All Active Alarm</button></li>
                                                    <li><a data-action="reload" onClick={this.onClick}>
                                                        <FontAwesomeIcon icon={faSync}></FontAwesomeIcon></a></li>
                                                    <br></br>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <thead>
                                                        <tr>
                                                            <th>Line Name</th>
                                                            <th>Alarm DateTime</th>
                                                            <th>Alarm Tag</th>
                                                            <th>Alarm Description</th>
                                                            <th>Alarm Ack. User</th>
                                                            <th>Alarm Ack. Datetime</th>
                                                            <th>Remarks</th>
                                                            <th>RTN DateTime</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.data.map(alarm => (
                                                                <tr key={alarm.id} onClick={() => this.onClickRow(alarm.id)} style={{ backgroundColor: alarm.rowColour }}>
                                                                    <td>{alarm.lineName}</td>
                                                                    <td>{alarm.alarmDateTime}</td>
                                                                    <td>{alarm.alarmTag}</td>
                                                                    <td>{alarm.alarmDesc}</td>
                                                                    <td>{alarm.alarmAckUser}</td>
                                                                    <td>{alarm.alarmAckDateTime}</td>
                                                                    <td>{alarm.remarks}</td>
                                                                    <td>{alarm.alarmRtnDateTime}</td>
                                                                    <td><button onClick={this.openAckIndModal} className="btn btn-secondary">Acknowledge</button></td>
                                                                    {/* mr-1 mb-1 btn-secondary btn-sm */}
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        )
    }
}