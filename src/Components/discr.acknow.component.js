import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from "react-bootstrap";

export default class AlarmHistory extends React.Component {
    constructor(props) {
        super(props);
        // this.retrivePendingDesrepancy = this.retrivePendingDesrepancy.bind(this);
        this.state = {
            data: [],
            isAllOpen: false,
            isIndividualOpen: false,
            Alerts: "none",
            Remarks: "",
            UserId: "",
            Id: "",
            Message: "",
        }
    }
    componentDidMount() {
        this.retrivePendingDesrepancy();
    }

    onClick = () => {
        SACSDataServices.GetAllPendingDescrepancy().then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    retrivePendingDesrepancy() {
        SACSDataServices.GetAllPendingDescrepancy().then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    handleSubmitSingleAck = async () => {
        SACSDataServices.SaveDesrepancyAcknowledgement(this.state.Id, this.state.Remarks, "ADMIN123").then(response => {
            //alert(response.data);
            if (response.data == true) {
                this.retrivePendingDesrepancy();
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

    openAckIndModal = () => this.setState({ isIndividualOpenOpen: true });
    closeAckIndModal = () => this.setState({ isIndividualOpenOpen: false });
    render() {
        return (

            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Acknowledge Discrepancies</h3>
                        </div>
                    </div>

                    <Modal show={this.state.isIndividualOpenOpen} onHide={this.openAckIndModal}>
                        <Modal.Header closeButton className="modal-header bg-danger white">
                            <Modal.Title >
                                <h4 className="modal-title text-center" id="myModalLabel10">Confirm to Acknowledge Discrepancies</h4>
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
                                    <span className="text-bold-600">Done!</span> You successfully Acknowledged.
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeAckIndModal}> Close </Button>
                                <Button type="Submit" onClick= {() => this.handleSubmitSingleAck()} variant="secondary"> Submit </Button>
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
                                                            <th>User Name</th>
                                                            <th>Discrepancies DateTime</th>
                                                            <th>Discrepancies Message</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.data.map(desc => (
                                                                <tr key={desc.id} onClick={() => this.onClickRow(desc.id)}>
                                                                    <td>{desc.userName}</td>
                                                                    <td>{desc.eventTime}</td>
                                                                    <td>{desc.eventMessage}</td>
                                                                    <td><button onClick={this.openAckIndModal} className="btn btn-secondary">Acknowledge</button></td>
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