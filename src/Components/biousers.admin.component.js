import React from "react";
import SACSDataServices from '../Services/sacs.services';
import { Modal, Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { useState } from 'react'
export default class BioUsersComponent extends React.Component {
    constructor(props) {
        super(props);
        //this.retrivebioUsers = this.retrivebioUsers.bind(this);
        this.retriveAllDepartments = this.retriveAllDepartments.bind(this);
        this.state = {
            BioUsers: [],
            Depts: [],
            Trainings: [],
            LineAssociate: [],
            show: true,
            UserId: "",
            Alerts: "none",
            isTrainngOpen: false,
            islineAssociateOpen:false,
            isPINChangeOpen:false,
            Message: "",
            ShowMessage: "none",
            ExpiryDate: new Date(),
            LAssociatechecked:"checked"
        }
    }
    componentDidMount() {
        this.retrivebioUsers();
        this.retriveAllDepartments();
    }
    retrivebioUsers() {
        SACSDataServices.GetAllBioUsres().then(response => {
            this.setState({
                BioUsers: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    retriveAllDepartments() {
        SACSDataServices.GetAllDepartments().then(response => {
            this.setState({
                Depts: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    retriveTrainigExpDetailsByUserId() {
        //alert(this.state.UserId)
        SACSDataServices.GetTrainigExpDetailsByUserId(this.state.UserId).then(response => {
            this.setState({
                Trainings: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    onClickRow = (e) => {

        //e.preventDefault();    
        this.setState({
            UserId: e
        });
        return false;
        // SACSDataServices.GetTrainigExpDetailsByUserId(e).then(response => {
        //     this.setState({
        //         Trainings: response.data
        //     });
        // }).catch(e => {
        //     console.log(e);
        // });
    }
    changeExpiryDate = (e) => {
        e.preventDefault();
        this.setState({
            ExpiryDate: e
        });
    }
    changeDepartment = (e) => {
        e.preventDefault();
        SACSDataServices.UpdateUserDepartmentByUserId(this.state.UserId, e.target.value).then(response => {
            if (response.data === true) {
                this.setState({
                    Message: "Department Updated Successfully!",
                    ShowMessage: "",
                });
            }
            else {
                this.setState({
                    Message: "Department Updated Failed!",
                    ShowMessage: ""
                });
            }
            this.retrivebioUsers();
        })
    }
    ChangeUsersEnable = (e) => {
        //e.preventDefault();

        SACSDataServices.UpdateUserEnableDisabelByUserId(e.target.value).then(response => {
            if (response.data === true) {
                this.setState({
                    Message: "User Status Updated Successfully!",
                    ShowMessage: "",
                });

            }
            else {
                this.setState({
                    Message: "User Status Updated Failed!",
                    ShowMessage: ""
                });
            }
            this.retrivebioUsers();
        })
    }
    ChangeUsersActive = (e) => {
        //e.preventDefault();
        SACSDataServices.UpdateUserActiveorInactiveByUserId(e.target.value).then(response => {
            this.retrivebioUsers();
            if (response.data === true) {
                this.setState({
                    Message: "User Status Updated Successfully!",
                    ShowMessage: "",
                });

            }
            else {
                this.setState({
                    Message: "User Status Updated Failed!",
                    ShowMessage: ""
                });
            }

        })
    }
    ChangeSupervisor = (e) => {

        SACSDataServices.UpdateIsSupervisors(e.target.value).then(response => {
            if (response.data === true) {

                this.setState({
                    Message: "User Detail Updated Successfully!",
                    ShowMessage: "",
                });
                //this.retrivebioUsers();
            }
            else {
                this.setState({
                    Message: "User Detail Updated Failed!",
                    ShowMessage: ""
                });
            }
            this.retrivebioUsers();
        })
        //e.preventDefault();
    }
    openTrainingModal = (e) => {
        //alert(e.target.value)
        SACSDataServices.GetTrainigExpDetailsByUserId(e.target.value).then(response => {
            this.setState({
                Trainings: response.data
            });
        }).catch(e => {
            console.log(e);
        });
        // this.retriveTrainigExpDetailsByUserId();
        this.setState({ isTrainngOpen: true, Alerts: "none" });
    }
    OpenLineAssociationModal = (e) => {
        SACSDataServices.GetLineAssociationByUserId(e.target.value).then(response => {
            this.setState({
                LineAssociate: response.data
            });
        }).catch(e => {
            console.log(e);
        });
        this.setState({ islineAssociateOpen: true, Alerts: "none" });
    }
    ResetPINModal=(e)=>{
       
        this.setState({ isPINChangeOpen: true, Alerts: "none", UserId:e.target.value });
    }
    ReSetUserHMIPIN=()=>{
       
        SACSDataServices.ResetHMIPINByUserId(this.state.UserId).then(response => {
            if(response.data==true)
            {
                this.setState({
                    Message: "User HMI PIN Updated Successfully!",
                    ShowMessage: "",
                    Alerts:""
                });
            }
        }).catch(e => {
            console.log(e);
        });
    }
    AudioNameChange=(e)=>{
        alert("hi")
        alert(this.state.UserId)       
    }
    LineAssociateChange=(e)=>{
        //alert(e.target.value)
    }

    closeTrainingModal = () => this.setState({ isTrainngOpen: false, UserId: "" });
    closeLineAssociateModal = () => this.setState({ islineAssociateOpen: false, UserId: "" });
    closePINChangeModal = () => this.setState({ isPINChangeOpen: false, UserId: "" });
    render() {

        return (

            <div>
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-6 col-12 mb-2">
                                <h3 className="content-header-title mb-0">Bio Users Admin</h3>
                            </div>
                        </div>
                        <div style={{ display: this.state.ShowMessage }} class="alert alert-success alert-dismissible mb-2" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong></strong> {this.state.Message}
                        </div>
                        <div className="content-body">
                            <section className="users-list-wrapper">
                                <div className="users-list-filter px-1">
                                    <form>
                                        {/* <div className="row border border-light rounded py-2 mb-2">
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <label for="users-list-verified">Enabled</label>
                                                <fieldset className="form-group">
                                                    <select className="form-control" id="users-list-verified">
                                                        <option value="">Any</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <label for="users-list-role">Role</label>
                                                <fieldset className="form-group">
                                                    <select className="form-control" id="users-list-role">
                                                        <option value="">Any</option>
                                                        <option value="User">User</option>
                                                        <option value="Staff">Staff</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <label for="users-list-status">Status</label>
                                                <fieldset className="form-group">
                                                    <select className="form-control" id="users-list-status">
                                                        <option value="">Any</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Close">Close</option>
                                                        <option value="Banned">Banned</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                                                <button className="btn btn-block btn-primary glow">Show</button>
                                            </div>
                                        </div> */}
                                    </form>
                                </div>
                                <div className="users-list-table">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-body">

                                                <div className="table-responsive">
                                                    <table id="users-list-datatable" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>User EID</th>
                                                                <th>Username</th>
                                                                <th>Department</th>
                                                                <th>Enabled</th>
                                                                <th>Active</th>
                                                                <th>Line Association</th>
                                                                <th>Training Validity</th>
                                                                <th>Link Admi UserID</th>
                                                                <th>Reset HMI PIN</th>
                                                                <th>Is Supervisor</th>
                                                                <th>Visitor Management</th>
                                                                <th>Audio Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.BioUsers.map(user => (
                                                                    <tr onClick={() => this.onClickRow(user.userEid)} data-rowid={user.userEid} >
                                                                        <td>
                                                                            {user.userEid}
                                                                        </td>
                                                                        <td style={{ minWidth: "190px" }}>
                                                                            {user.userName}
                                                                        </td>
                                                                        <td style={{ minWidth: "190px" }}>
                                                                            <select className="form-control" onChange={this.changeDepartment}>
                                                                                {
                                                                                    this.state.Depts.map(dep => (
                                                                                        user.departmentName === dep.name ?
                                                                                            <option key={dep.code} selected>
                                                                                                {dep.name}
                                                                                            </option>
                                                                                            :
                                                                                            <option key={dep.code}>
                                                                                                {dep.name}
                                                                                            </option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </td>
                                                                        <td style={{ backgroundColor: user.statusColor }}>
                                                                            {user.status === 1 ?
                                                                                <input type="checkbox" value={user.userEid} onChange={this.ChangeUsersEnable} checked></input>
                                                                                : <input type="checkbox" value={user.userEid} onChange={this.ChangeUsersEnable}></input>
                                                                            }
                                                                        </td>
                                                                        <td style={{ backgroundColor: user.activeColor }}>
                                                                            {user.active === 1 ?
                                                                                <input type="checkbox" value={user.userEid} onChange={this.ChangeUsersActive} checked></input>
                                                                                : <input type="checkbox" value={user.userEid} onChange={this.ChangeUsersActive}></input>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <button className="btn btn-success"
                                                                                onClick={this.OpenLineAssociationModal} value={user.userEid} >
                                                                                Change</button>
                                                                        </td>
                                                                        <td>
                                                                            <button className="btn" style={{ backgroundColor: user.trgExpColor }}
                                                                                value={user.userEid} onClick={this.openTrainingModal}> {user.trgExpText}</button>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                className={!user.adminUserId ? "btn btn-success" : "btn btn-danger"}
                                                                                style={{ minWidth: "100px", minHeight: "30px" }}>{user.adminUserId}</button>
                                                                        </td>
                                                                        <td>
                                                                            <button className="btn btn-primary" value={user.userEid}
                                                                            onClick={this.ResetPINModal}>Reset</button>
                                                                        </td>
                                                                        <td>
                                                                            {user.canCommand === true ?
                                                                                <input type="checkbox" value={user.userEid} onChange={this.ChangeSupervisor} checked></input>
                                                                                : <input type="checkbox" value={user.userEid} onChange={this.ChangeSupervisor}></input>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <button className="btn btn-success">{user.visitorMgmt}</button>
                                                                        </td>
                                                                        <td onClick={() => this.onClickRow(user.userEid)}>
                                                                           <input type="text" onchange={this.AudioNameChange} 
                                                                           className="form-control" value={user.audioName}></input> 
                                                                        </td>
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
                            <Modal className="modal-dialog modal-lg" style={{ width: "900px" }}
                                show={this.state.isTrainngOpen} onHide={this.closeTrainingModal}>
                                <Modal.Header closeButton className="modal-header bg-danger white">
                                    <Modal.Title >
                                        <h4 className="" id="myModalLabel10">Update User Training Details</h4>
                                    </Modal.Title>
                                </Modal.Header>
                                <form onSubmit={e => e.preventDefault()} className="col-md-12">
                                    <Modal.Body className="modal-body">
                                        <div className="form-group modal-content">
                                            <table className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                <thead>
                                                    <tr>
                                                        <th>Line Name</th>
                                                        <th>Training Name</th>
                                                        <th>Enabled</th>
                                                        <th>Expiry Date</th>
                                                        <th>Validity Days</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Trainings.map(items => (
                                                            <tr>
                                                                <td>{items.lineName}</td>
                                                                <td>{items.trgName}</td>
                                                                <td>{items.enabled === 1 ?
                                                                    <input type="checkbox" checked></input>
                                                                    : <input type="checkbox"></input>
                                                                }</td>
                                                                <td>
                                                                    <DatePicker className="form-control"
                                                                        dateFormat="dd-MM-yyyy"
                                                                        selected={new Date()}
                                                                        showPopperArrow={false}
                                                                        onChange={this.changeExpiryDate} />
                                                                </td>
                                                                <td>{items.expiryDayCount}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                            <span className="text-bold-600">Done!</span> You successfully Acknowledged.
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="modal-footer">
                                        <Button variant="secondary" onClick={this.closeTrainingModal}> Close </Button>
                                        <Button type="Submit" onClick={() => this.handleSubmitAllAck()} variant="secondary"> Submit </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                            <Modal className="modal-dialog modal-lg" style={{ width: "900px" }}
                                show={this.state.islineAssociateOpen} onHide={this.closeLineAssociateModal}>
                                <Modal.Header closeButton className="modal-header bg-danger white">
                                    <Modal.Title >
                                        <h4 className="" id="myModalLabel10">Change Line Association</h4>
                                    </Modal.Title>
                                </Modal.Header>
                                <form onSubmit={e => e.preventDefault()} className="col-md-12">
                                    <Modal.Body className="modal-body">
                                        <div className="form-group modal-content">
                                            <table className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                <thead>
                                                    <tr>
                                                        <th>Line Name</th>
                                                        <th>Enabled</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.LineAssociate.map(items => (
                                                            <tr>
                                                                <td>{items.lineName}</td>
                                                                <td>{items.enabled == true ?
                                                                    <input type="checkbox" value={items.lineId} defaultChecked={this.state.LAssociatechecked}
                                                                     onClick={this.LineAssociateChange} checked></input>
                                                                    : <input type="checkbox" value={items.lineId} defaultChecked={this.state.LAssociatechecked} 
                                                                    onClick={this.LineAssociateChange} style={{backgroundColor:"red"}} ></input>
                                                                }</td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                            <span className="text-bold-600">Done!</span> You successfully Acknowledged.
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="modal-footer">
                                        <Button variant="secondary" onClick={this.closeLineAssociateModal}> Close </Button>
                                        <Button type="Submit" onClick={() => this.handleSaveLineAssociate()} variant="secondary"> Submit </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                            <Modal className="modal-dialog modal-lg" style={{ width: "900px" }}
                                show={this.state.isPINChangeOpen} onHide={this.closePINChangeModal}>
                                <Modal.Header closeButton className="modal-header bg-danger white">
                                    <Modal.Title >
                                        <h4 className="" id="myModalLabel10">Are you Sure to Reset HMI PIN ? </h4>
                                    </Modal.Title>
                                </Modal.Header>
                                <form onSubmit={e => e.preventDefault()} className="col-md-12">
                                    <Modal.Body className="modal-body">
                                       
                                        <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                            <span className="text-bold-600">Done!</span> PIN Reset successfully.
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="modal-footer">
                                        <Button variant="secondary" onClick={this.closePINChangeModal}> Close </Button>
                                        <Button type="Submit" onClick={() => this.ReSetUserHMIPIN()} variant="secondary"> Submit </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}