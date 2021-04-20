import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import sacsServices from '../Services/sacs.services';


export default class AdminUserManagement extends React.Component {
    constructor(props) {
        super(props);
        //this.retriveAllUsers= this.retriveAllUsers.bind(this);
        this.state = {
            Usres: [],
            UserID: "",
            FirstName: "",
            LastName: "",
            Depatments: [],
            Roles: [],
            Status: -1,
            Message: "",
            ShowModal: "",
            DeptId: -1,
            RoleId: -1,
            UserIDError: "",
            FirstNameerror: "",
            LastNameerror: "",
            Depterror: "",
            Roleerror: "",
            Stateerror: "",
            AlertType: "",
            ShowAlert: "none",
            UpdateUserId: "",
            DepartmentName: "",
            RoleName: "",
            EditStatus: "",
            ActionName: "Save"
        }
    }
    componentDidMount() {
        this.retriveAllDepartments();
        this.retriveAllRoles();
        this.retriveAllUsers();
    }
    retriveAllUsers() {
        SACSDataServices.GetAllAdminUsers().then(response => {
            this.setState({
                Usres: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    retriveAllDepartments() {
        SACSDataServices.GetAllDepartments().then(response => {
            this.setState({
                Depatments: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    retriveAllRoles() {
        SACSDataServices.GetAllRoles().then(response => {
            this.setState({
                Roles: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    changeDepartment = (e) => {
        //alert(e.target.value)
        this.setState({
            DeptId: e.target.value
        })
    }
    UserIdChange = (e) => {
        this.setState({
            UserID: e.target.value
        })
    }
    FirstNameChange = (e) => {
        this.setState({
            FirstName: e.target.value
        })
    }
    lastNameChange = (e) => {
        this.setState({
            LastName: e.target.value
        })
    }
    changeStatus = (e) => {
        this.setState({
            Status: e.target.value
        })
    }
    changeRole = (e) => {
        this.setState({
            RoleId: e.target.value
        })
    }
    SaveUsers = (e) => {
        this.ValicateUsers();
        // e.preventDefault();
        var User = {
            UserID: this.state.UserID,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            DeptId: this.state.RoleId,
            RoleId: this.state.RoleId,
            Status: this.state.Status
        }
        SACSDataServices.SaveAdminUsersDetails(User, this.state.ActionName).then(response => {
            //alert(response.data)
            if (response.data === -1) {
                this.setState({ Message: "This User ID already exists", ShowAlert: "", AlertType: "-2" })
            }
            else if (response.data === 1 && this.state.ActionName === "Save") {
                this.setState({ Message: "User Details Saved Successfully", ShowAlert: "", AlertType: "1" })
            }
            else if (response.data === 1 && this.state.ActionName === "Update") {
                this.setState({ Message: "User Details Updated Successfully", ShowAlert: "", AlertType: "1" })

            }
            else {
                this.setState({ Message: "User Details Saved failed", ShowAlert: "", AlertType: "-1" })
            }
            SACSDataServices.GetAllAdminUsers().then(response => {
                this.setState({
                    Usres: response.data
                });
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            // alert(e);
        })
        this.retriveAllUsers();
        e.preventDefault();
    }
    ValicateUsers = () => {       
        //alert(this.state.UserID)
        if (!this.state.UserID) {
            this.setState({ UserIDError: "User Id Required" })
            return false;
        }
        else
            this.setState({ UserIDError: "" })
           // alert(this.state.FirstName)

        if (!this.state.FirstName) {
            this.setState({ FirstNameerror: "User First Name Required" })
            return false;
        }
        else
            this.setState({ FirstNameerror: "" })
           // alert(this.state.LastName)

        if (!this.state.LastName) {
            this.setState({ LastNameerror: "User Last Name Required" })
            return false;
        }
        else
            this.setState({ LastNameerror: "" })
           // alert(this.state.DeptId)

        if (this.state.DeptId < 0 || !this.state.DeptId) {
            this.setState({ Depterror: "Please select User Department" })
            return false;
        }
        else
            this.setState({ Depterror: "" })
           // alert(this.state.RoleId)
        if (this.state.RoleId < 0 || !this.state.RoleId) {
            this.setState({ Roleerror: "Please select User Role" })
            return false;
        }
        else
            this.setState({ Roleerror: "" })
           // alert(this.state.Status)
        if (this.state.Status < 0 || !this.state.Status) {
            this.setState({ Stateerror: "Please select User Status" })
            return false;
        }
        else
            this.setState({ Stateerror: "" })
        return false;

    }
    handleEditUser = (e) => {
        //alert(e.target.value)
        //console.log(e.target.value)
    }
    onClickRow = (e) => {

        this.setState({
            UpdateUserId: e
        })
        sacsServices.GetAdminUserByUserId(e).then(response => {

            this.setState({
                UserID: response.data.userID,
                FirstName: response.data.firstName,
                LastName: response.data.lastName,
                DepartmentName: response.data.deptName,
                RoleName: response.data.roleName,
                RoleId: response.data.roleId,
                DeptId: response.data.deptId,
                EditStatus: response.data.status,
                ActionName: "Update",
                Status: response.data.status,
            })
        }).catch(e => {
            // alert(e);
        })
    }

    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Admin Users Management </h3>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                {/* <div className="card-header">
                                    <h4 className="card-title" id="horz-layout-colored-controls">User Profile</h4>
                                    <a className="heading-elements-toggle"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                </div> */}
                                <div className="card-content collpase show">
                                    <div className="card-body">
                                        <form className="form form-horizontal">
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput1">User ID</label>
                                                            <div className="col-md-9">
                                                                <input type="text" onChange={this.UserIdChange} minLength={6} id="userinput1"
                                                                    className="form-control border-primary"
                                                                    placeholder="User ID" name="firstname" 
                                                                    disabled={this.state.ActionName=="Update"?"disabled":""} 
                                                                    value={this.state.UserID} required></input>
                                                                <span className="text-danger"> {this.state.UserIDError} </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput2">First Name</label>
                                                            <div className="col-md-9">
                                                                <input type="text" id="userinput2" onChange={this.FirstNameChange} className="form-control border-primary"
                                                                    placeholder="First Name" value={this.state.FirstName} name="lastname" required></input>
                                                                <span className="text-danger"> {this.state.FirstNameerror} </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput2">Last Name</label>
                                                            <div className="col-md-9">
                                                                <input type="text" id="userinput2" onChange={this.lastNameChange} className="form-control border-primary"
                                                                    placeholder="Last Name" value={this.state.LastName} name="lastname" required></input>
                                                                <span className="text-danger"> {this.state.LastNameerror} </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput3">Department</label>
                                                            <div className="col-md-9">
                                                                <select id="ddlDeatment" onChange={this.changeDepartment} className="form-control border-primary" required>
                                                                    <option value="-1">-- Please Select Department -- </option>
                                                                    {
                                                                        this.state.Depatments.map(dep => (
                                                                            this.state.DepartmentName == dep.name ?
                                                                                <option value={dep.code} selected > {dep.name}</option>
                                                                                :
                                                                                <option value={dep.code}> {dep.name}</option>

                                                                        ))
                                                                    }
                                                                    {/* {this.state.Department.map(dep => (
                                                                    <option key={dep.code}>
                                                                        {dep.name}
                                                                    </option>
                                                                ))} */}
                                                                </select>
                                                                <span className="text-danger"> {this.state.Depterror} </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput4">User Role</label>
                                                            <div className="col-md-9">
                                                                <select type="dropdown" id="userinput4"
                                                                    onChange={this.changeRole} className="form-control border-primary"
                                                                    placeholder="Nick Name" name="nickname" required>
                                                                    <option value="-1">-- Please Select Role -- </option>
                                                                    {
                                                                        this.state.RoleName === "Supervisor" ?
                                                                            <option value="0" selected>Supervisor</option> : <option value="0">Supervisor</option>
                                                                    }
                                                                    {
                                                                        this.state.RoleName === "Manager" ?
                                                                            <option value="1" selected>Manager</option> : <option value="1">Manager</option>
                                                                    }
                                                                    {
                                                                        this.state.RoleName === "Admin" ?
                                                                            <option value="2" selected>Admin</option> : <option value="2">Admin</option>
                                                                    }


                                                                    {/* {this.state.Roles.map(rol => (
                                                                        <option key={rol.code}>
                                                                            {rol.name}
                                                                        </option>
                                                                    ))} */}
                                                                </select>
                                                                <span className="text-danger"> {this.state.Roleerror} </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group row">
                                                            <label className="col-md-3 label-control" for="userinput4">Status</label>
                                                            <div className="col-md-9">
                                                                <select type="dropdown" id="userinput4" onChange={this.changeStatus} className="form-control border-primary"
                                                                    placeholder="Nick Name" name="nickname" required>
                                                                    <option value="-1">-- Please Select Status -- </option>
                                                                    {
                                                                        this.state.EditStatus === "Enable" ?
                                                                            <option value="1" selected>Enable</option> : <option value="1">Enable</option>
                                                                    }
                                                                    {
                                                                        this.state.EditStatus === "Disable" ?
                                                                            <option value="0" selected>Disable</option> : <option value="0">Disable</option>
                                                                    }

                                                                </select>
                                                                <span className="text-danger"> {this.state.Stateerror} </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={this.state.AlertType == "1" ? "alert alert-success" : "alert alert-danger"} style={{ display: this.state.ShowAlert }} >
                                                <span className="text-bold-600">{this.state.Message} </span>
                                            </div>
                                            <div className="form-actions right">

                                                <a href="/AddUser"  className="btn btn-warning mr-1">
                                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>  Cancel
                                                </a>
                                                <button type="submit" onClick={this.SaveUsers} className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> {this.state.ActionName}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title" id="horz-layout-colored-controls">User Details</h4>
                                    <a className="heading-elements-toggle"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                </div>
                                <table className="table display nowrap table-striped table-bordered scroll-horizontal">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th> Role</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Usres.map(usr =>
                                                <tr onClick={() => this.onClickRow(usr.userID)} style={{ backgroundColor: usr.rowColour }}>
                                                    <td value={usr.userID} onClick={this.handleEditUser}>{usr.userID}</td>
                                                    <td value={usr.userID} onClick={this.handleEditUser}>{usr.firstName}</td>
                                                    <td value={usr.userID} onClick={this.handleEditUser}>{usr.lastName}</td>
                                                    <td value={usr.userID} onClick={this.handleEditUser}>{usr.role}</td>

                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}  