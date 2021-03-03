import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from "react-bootstrap";
export default class AuditTrail extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllHealthCheckListName = this.retriveAllHealthCheckListName.bind(this);
        this.state = {
            CheckList: [],
            data: [],
            pushData: [],
            AssoChecklist: [],
            Alerts: "none",
            CheckListId: 0,
            isAssociateOpen: false,
            Message: "",
            CheckPoint: "",
            IsSubTitle: false,
            IsRequired: "",
            IsQuestionUsed: false,
        }
    }
    componentDidMount() {
        this.retriveAllHealthCheckListName();
    }
    retriveAllHealthCheckListName() {
        SACSDataServices.GetAllHealthCheckListName().then(response => {
            this.setState({
                CheckList: response.data
            })
        }).catch(e => {

        });
    }
    onChekListChange = (e) => {

        SACSDataServices.GetAllHealthCheckLisById(e.target.value).then(response => {
            this.setState({
                data: response.data,
                isAssociateOpen: false,
                Message: "",
                CheckListId: Number(e.target.value),
            })
        }).catch(e => {

        });
    }
    handlerowInputChange(index, dataType, value) {
        //alert(value)

        if (dataType == "healthChecklist")
            value = Number(value)
        const newState = this.state.AssoChecklist.map((item, i) => {
            if (i === index) {
                return { ...item, [dataType]: value };
            }
            return item;
        });
        this.setState({
            AssoChecklist: newState
        });
        // alert(JSON.stringify(this.state.AssoChecklist))
    }
    handleUpdateChecklistAssociate = () => {
        //alert(JSON.stringify(this.state.AssoChecklist))
        SACSDataServices.SaveHMICheckListAssociation(this.state.AssoChecklist).then(response => {
            if (response.data === true) {
                this.setState({
                    Alerts: "",
                    Message: "HMI CheckList Association details updated successfully!"
                })
            }
            else {
                this.setState({
                    Alerts: "",
                    Message: "Nothing changed in HMI CheckList Association details!"
                })
            }
        }).catch(e => {

        })
    }
    closeAssociateModal = () => this.setState({ isAssociateOpen: false, })
    handleInputChange(index, dataType, value) {

        if (index >= 0) {
            if (dataType === "isSubTitle" || dataType === "used") {
                if (value == "false") {
                    value = true;
                } else {
                    value = false;
                }
            }
            const newState = this.state.data.map((item, i) => {
                if (i === index) {
                    return { ...item, [dataType]: value };
                }
                return item;

            });
            this.setState({
                data: newState
            });
        }

        else if (index == -1) {
            if (dataType === "healthQuestion") {
                this.setState({
                    CheckPoint: value
                })
            }
            else if (dataType === "isSubTitle") {
                if (value === "false") {
                    this.setState({
                        IsSubTitle: true
                    })
                    // alert(this.state.IsSubTitle)
                }
                else {
                    this.setState({
                        IsSubTitle: false
                    })
                    // alert(this.state.IsSubTitle)

                }

            }
            else if (dataType === "used") {
                //alert(value)
                if (value === "false") {
                    this.setState({
                        IsQuestionUsed: true
                    })
                }
                else {
                    this.setState({
                        IsQuestionUsed: false
                    })
                }
            }
            else if (dataType === "requiredOption") {
                // alert(value)
                this.setState({
                    IsRequired: value
                })
            }
            var adddata = {
                id: 0,
                checklistId: Number(this.state.CheckListId),
                seq: 0,
                healthQuestion: this.state.CheckPoint,
                used: this.state.IsQuestionUsed,
                isSubTitle: this.state.IsSubTitle,
                requiredOption: this.state.IsRequired,
            }
            this.setState({
                pushData: adddata
            })

        }

        // alert(JSON.stringify(this.state.data))
    }
    pushNewadddata = (e) => {
        if (this.state.CheckPoint != "" && this.state.CheckPoint != null) {
              alert(JSON.stringify(this.state.pushData))
            this.setState({
                data: [...this.state.data, this.state.pushData]
            })
            this.setState({

                CheckListId: 0,
                CheckPoint: "",
                IsSubTitle: false,
                IsRequired: false,
                IsQuestionUsed: false,
            })
        }
    }
    changeAssociate = () => {
        SACSDataServices.GetHMICheckListAssociation().then(response => {
            this.setState({
                AssoChecklist: response.data
            })
        }).catch(e => {
            console.log(e)
        });

        this.setState({ isAssociateOpen: true, })
    }
    deleteNewConfigRow = (index) => {
        var deleted = [...this.state.data]
        deleted.splice(index, 1)
        this.setState({
            data: deleted
        })

    }
    handleUpdateCheckList = () => {
        
        SACSDataServices.UpdateCheckList(this.state.data).then(response => {
            if (response.data != null && response.data != "") {
                alert(JSON.stringify(response.data))
                this.setState({
                    Alerts: "",
                    data: response.data
                })
            }
        }).catch(e => {
            console.log(e)
        });
    }
    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">CheckList Configuration</h3>
                        </div>
                    </div>

                    <div className="content-body">
                        <section id="horizontal">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <section className="basic-elements">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="card-content">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-xl-2 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="basicInput">Select CheckList</h4>
                                                                            <select id="ddlLines" onChange={this.onChekListChange} className=" form-control" name="ddlLines"
                                                                                defaultValue={this.state.selectValue} className="form-control col-md-12">
                                                                                <option value="-1">-- Please Select CheckList -- </option>
                                                                                {
                                                                                    this.state.CheckList.map(chk => (
                                                                                        <option className="" value={chk.id}>
                                                                                            {chk.checklistName}
                                                                                        </option>
                                                                                    ))}
                                                                            </select>

                                                                        </fieldset>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div className="heading-elements">
                                                <ul className="list-inline mb-0">
                                                    <button className="btn btn-primary" onClick={this.changeAssociate} type="primary">
                                                        Change HMI Checklist Association</button>
                                                </ul>
                                            </div>
                                            <div className="col-xl-5 col-lg-6 col-md-12 mb-0">

                                                <fieldset className="form-group">

                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard table-responsive">
                                                <div className="content-header row">
                                                    <div className="content-header-left col-md-6 col-12 mb-2">
                                                        <h3 className="content-header-title mb-0">Add New Check Point </h3>
                                                    </div>
                                                </div>
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <table className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>Check Point</th>
                                                                <th>Is Sub Title</th>
                                                                <th>Required Answer</th>
                                                                <th>Used</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <input type="text" value={this.state.CheckPoint}
                                                                        onChange={e => this.handleInputChange(-1, 'healthQuestion', e.target.value)}
                                                                        placeholder="Please enter new Check Point"
                                                                        className="form-control" required></input>
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" value={this.state.IsSubTitle}
                                                                        checked={this.state.IsSubTitle === true ? "checked" : ""}
                                                                        onChange={e => this.handleInputChange(-1, 'isSubTitle', e.target.value)} className="" ></input>
                                                                </td>
                                                                <td>
                                                                    <select className="form-control"

                                                                        onChange={e => this.handleInputChange(-1, 'requiredOption', e.target.value)} >
                                                                        <option value="Null">--Select--</option>
                                                                        <option value="Yes">Yes</option>
                                                                        <option value="No">No</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" value={this.state.IsQuestionUsed}
                                                                        checked={this.state.IsQuestionUsed === true ? "checked" : ""}
                                                                        onChange={e => this.handleInputChange(-1, 'used', e.target.value)} className="" ></input>
                                                                </td>
                                                                <td><button type="submit" onClick={this.pushNewadddata} className="btn btn-success">Add</button></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </form>

                                                <div className="content-header row">
                                                    <div className="content-header-left col-md-6 col-12 mb-2">
                                                        <h3 className="content-header-title mb-0">Selected Check List </h3>
                                                    </div>
                                                </div>
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>Check Point</th>
                                                                <th>Is Sub Title</th>
                                                                <th>Required Answer</th>
                                                                <th>Used</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.data.map((row, index) => (
                                                                    <tr key={this.state.data[index].id}>
                                                                        <td><input type="text" value={this.state.data[index].healthQuestion}
                                                                            onChange={e => this.handleInputChange(index, 'healthQuestion', e.target.value)}
                                                                            className="form-control" required></input> </td>
                                                                        <td>
                                                                            {
                                                                                this.state.data[index].isSubTitle === true ?
                                                                                    <input type="checkbox" value={this.state.data[index].isSubTitle}
                                                                                        onChange={e => this.handleInputChange(index, 'isSubTitle', e.target.value)}
                                                                                        className="" checked></input>
                                                                                    :
                                                                                    <input type="checkbox"
                                                                                        value={this.state.data[index].isSubTitle}
                                                                                        onChange={e => this.handleInputChange(index, 'isSubTitle', e.target.value)}
                                                                                        className=""></input>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <select className="form-control">
                                                                                {
                                                                                    this.state.data[index].id > 0 ?
                                                                                        this.state.data[index].requiredOption === "Yes" ?
                                                                                            <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                                value={this.state.data[index].requiredOption} selected>Yes</option> :
                                                                                            <option value="Yes" onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}>Yes</option>
                                                                                        :
                                                                                        this.state.data[index].requiredOption === "No" ?
                                                                                            <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                                value={this.state.data[index].requiredOption} selected>No</option>
                                                                                            :
                                                                                            <option value={this.state.data[index].requiredOption}
                                                                                                onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}>Yes</option>

                                                                                }
                                                                                {
                                                                                    this.state.data[index].id > 0 ?
                                                                                        this.state.data[index].requiredOption === "No" ?
                                                                                            <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                                value={this.state.data[index].requiredOption} selected>No</option>
                                                                                            :
                                                                                            <option value="No" onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}>No</option>
                                                                                        :
                                                                                        this.state.data[index].id === 0 ?
                                                                                        this.state.data[index].requiredOption === "No" ?
                                                                                                <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                                    value={this.state.data[index].requiredOption} selected>No</option>
                                                                                                    
                                                                                                :
                                                                                                <option value={this.state.data[index].requiredOption}
                                                                                                    onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}>Yes</option>
                                                                                            : ""

                                                                                }
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                this.state.data[index].used === true ?
                                                                                    <input type="checkbox" value={this.state.data[index].used}
                                                                                        value={this.state.data[index].used} onChange={e => this.handleInputChange(index, 'used', e.target.value)}
                                                                                        className="" checked></input>
                                                                                    :
                                                                                    <input type="checkbox" value={this.state.data[index].used}
                                                                                        onChange={e => this.handleInputChange(index, 'used', e.target.value)}
                                                                                        value={this.state.data[index].used} className=""></input>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {this.state.data[index].id === 0 ?
                                                                                <button type="submit"
                                                                                    onClick={e => this.deleteNewConfigRow(index, 'delete', 0)}
                                                                                    className="btn btn-primary">Delete<span>   </span>
                                                                                    <FontAwesomeIcon style={{ color: "" }} icon={faTrashAlt}></FontAwesomeIcon>
                                                                                </button>
                                                                                : ""
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                        </tbody>
                                                    </table>
                                                    <div className="form-actions center text-center">
                                                        <div className="alert alert-success" role="alert"
                                                            style={{ display: this.state.Alerts }}>
                                                            <span className="text-bold-600">Done!</span> You successfully Updated CheckList.
                                                        </div>
                                                        <a href="/CheckListConfig" className="btn btn-warning mr-1">
                                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>Cancel </a>
                                                        <button className="btn btn-primary" type="submit" onClick={this.handleUpdateCheckList}>
                                                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>Update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Modal className="modal-dialog modal-xl"
                                                show={this.state.isAssociateOpen} onHide={this.closeAssociateModal}>
                                                <Modal.Header closeButton className="modal-header bg-danger white">
                                                    <Modal.Title >
                                                        <h4 className="" id="myModalLabel10">Change HMI Checklist Association</h4>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <form onSubmit={e => e.preventDefault()} className="">
                                                    <Modal.Body className="modal-body">
                                                        <div className="form-group modal-content">
                                                            <table className="">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Line Name</th>
                                                                        <th>Device Name</th>
                                                                        <th>HMI Name</th>
                                                                        <th>Check List</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        this.state.AssoChecklist.map((row, index) => (
                                                                            <tr>
                                                                                <td>
                                                                                    {this.state.AssoChecklist[index].lineName}
                                                                                </td>
                                                                                <td>
                                                                                    {this.state.AssoChecklist[index].deviceName}
                                                                                </td>
                                                                                <td>
                                                                                    {<input className="form-control"
                                                                                        value={this.state.AssoChecklist[index].hminame}
                                                                                        onChange={e => this.handlerowInputChange(index, 'hminame', e.target.value)}
                                                                                    ></input>}
                                                                                </td>
                                                                                <td>
                                                                                    <select id="ddlLines" className=" form-control"
                                                                                        onChange={e => this.handlerowInputChange(index, 'healthChecklist', e.target.value)}
                                                                                        defaultValue={this.state.selectValue} className="form-control col-md-12">
                                                                                        {
                                                                                            this.state.CheckList.map(item => (
                                                                                                this.state.AssoChecklist[index].checklistName == item.checklistName ?
                                                                                                    <option className="" value={item.id} selected

                                                                                                    >{item.checklistName}
                                                                                                    </option>
                                                                                                    :
                                                                                                    <option className="" value={item.id}
                                                                                                    // onChange={e => this.handlerowInputChange(index, 'id', e.target.value)}
                                                                                                    >
                                                                                                        {item.checklistName}
                                                                                                    </option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="alert alert-success" role="alert" style={{ display: this.state.Alerts }}>
                                                            <span className="text-bold-600">Done!</span>  {this.state.Message}
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer className="modal-footer">
                                                        <Button variant="secondary" onClick={this.closeAssociateModal}> Close </Button>
                                                        <Button type="Submit" onClick={() => this.handleUpdateChecklistAssociate()} variant="secondary"> Update </Button>
                                                    </Modal.Footer>
                                                </form>
                                            </Modal>
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
