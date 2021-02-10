import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
export default class AuditTrail extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllHealthCheckListName = this.retriveAllHealthCheckListName.bind(this);
        this.state = {
            CheckList: [],
            data: [],
            ShowAlerts:"none"
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
                data: response.data
            })
        }).catch(e => {

        });
    }
    handleInputChange(index, dataType, value) {
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
    handleUpdateCheckList = () => {
        SACSDataServices.UpdateCheckList(this.state.data).then(response => {
            if (response.data == true) {
                this.setState({
                    ShowAlerts:""
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
                            <h3 className="content-header-title mb-0">Entry/Exit Report</h3>
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
                                                                    <div className="col-xl-5 col-lg-6 col-md-12 mb-0">
                                                                        <br></br>
                                                                        <fieldset className="form-group">
                                                                            <button className="btn btn-primary" onClick={this.generatePDF} type="primary">Change HMI Checklist Association</button>
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

                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">

                                            <div className="card-body card-dashboard table-responsive">
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>Check Point</th>
                                                                <th>Is Sub Title</th>
                                                                <th>Required Answer</th>
                                                                <th>Used</th>
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
                                                                                        onChange={e => this.handleInputChange(index, 'isSubTitle', e.target.value)} className="" checked></input>
                                                                                    :
                                                                                    <input type="checkbox" onChange={e => this.handleInputChange(index, 'isSubTitle', e.target.value)}
                                                                                        value={this.state.data[index].isSubTitle} className=""></input>
                                                                            }
                                                                        </td>
                                                                        <td><select className="form-control">
                                                                            {
                                                                                this.state.data[index].requiredOption === "Yes" ?
                                                                                    <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                        value={this.state.data[index].requiredOption} selected>Yes</option> :
                                                                                    <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                        value={this.state.data[index].requiredOption}>No</option>
                                                                            }
                                                                            {
                                                                                this.state.data[index].requiredOption === "No" ?
                                                                                    <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                        value={this.state.data[index].requiredOption} selected>No</option>
                                                                                    : <option onChange={e => this.handleInputChange(index, 'requiredOption', e.target.value)}
                                                                                        value={this.state.data[index].requiredOption}>Yes</option>
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
                                                                    </tr>
                                                                ))}
                                                            <tr>
                                                                <td>
                                                                    <input type="text" placeholder="Please enter new Check Point"
                                                                        className="form-control" ></input>
                                                                </td>
                                                                <td><input type="checkbox" className="" ></input></td>
                                                                <td><select className="form-control" >
                                                                    <option value="-1">--Select--</option>
                                                                    <option value="1">Yes</option>
                                                                    <option value="2">No</option>
                                                                </select>
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" className="" ></input>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="form-actions center text-center">
                                                        <div className="alert alert-success" role="alert" style={{ display: this.state.ShowAlerts }}>
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
