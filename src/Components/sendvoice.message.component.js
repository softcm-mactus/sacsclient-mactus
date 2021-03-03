import React, { useRef, useState, Redirect } from 'react';
import SACSDataServices from '../Services/sacs.services';


export default class SendVoiceMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            VoiceMessages: [],
            Lines: [],
            BioUsers: [],
            BioUserId: "-1",
            Alerts: "none",
            ActiveMessage: "none",
            LineID: 0,
            TextCount: 0,
            VoiceMessage: "",
            SelectedUserName: "All Users",
            AllLines: true,
            AllUsers: true,
            PendingVoiceCount: 0,

        }
    }
    componentDidMount() {
        this.retriveAllStndMessages();
        this.retriveAllLinesDate();
        this.retriveAllBioUsers();

        this.handle = this.timer = setInterval(() => {
            this.retrivePendingVoiceCount();
        }, 1000);

    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    retriveAllStndMessages() {
        SACSDataServices.GetAllStandardMessages().then(response => {
            this.setState({
                VoiceMessages: response.data
            })
        })
    }
    retriveAllBioUsers() {
        SACSDataServices.GetAllFillingLineUsers().then(response => {
            this.setState({
                BioUsers: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    retrivePendingVoiceCount() {
        SACSDataServices.GetActiveMessageCount().then(response => {
            this.setState({
                PendingVoiceCount: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    onUsersChange = (e) => {
        this.setState({
            SelectedUserName: e.target.value
        });
    }
    onLineChange = (e) => {
        this.setState({
            LineID: e.target.value
        });
    }
    textareaChnage = (e) => {
        var message = e.target.value
        this.setState({
            TextCount: message.length,
            VoiceMessage: e.target.value
        })
    }
    VoiceMessageRowClick = (e) => {
        var message = e.target.value
        this.setState({
            VoiceMessage: e.target.value,
            TextCount: message.length
        })
    }
    retriveAllLinesDate() {
        SACSDataServices.GetALlLines().then(response => {
            this.setState({
                Lines: response.data,
                SelectedLineName: response.data[0].lineName
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    changeAllLines = (e) => {
        if (e.target.value === "true") {
            this.setState({
                AllLines: false
            })
        } else {
            this.setState({
                AllLines: true
            })
        }
    }
    changeAllUsersChange = (e) => {
        if (e.target.value === "true") {
            this.setState({
                AllUsers: false
            })
        } else {
            this.setState({
                AllUsers: true
            })
        }
    }
    SaveStdMessages = () => {
        SACSDataServices.SaveStdVoiceMessages(this.state.LineID, this.state.SelectedUserName, this.state.VoiceMessage).then(response => {
            if (response.data === true) {
                this.setState({
                    Alerts: "",
                    LineID: 0,
                    TextCount: 0,
                    VoiceMessage: "",
                    SelectedUserName: "",
                    AllLines: true,
                    AllUsers: true,
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Send Voice Messages</h3>
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
                                                                    <div className="col-xl-1 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="basicInput">All Lines</h4>
                                                                            <div className="card-content">
                                                                                <div className="card-body">
                                                                                    <fieldset>
                                                                                        <div className="float-left">
                                                                                            <input type="checkbox" className="switch"
                                                                                                onChange={this.changeAllLines}
                                                                                                value={this.state.AllLines}
                                                                                                checked={this.state.AllLines === true ? "checked" : ""}
                                                                                                id="switch11" data-col-sm-3 />
                                                                                        </div>
                                                                                    </fieldset>
                                                                                </div>
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                    <div className="col-xl-2 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="basicInput">Select Line</h4>
                                                                            <select id="ddlLines" onChange={this.onLineChange} className=" form-control" name="ddlLines"
                                                                                defaultValue={this.state.selectValue}
                                                                                disabled={this.state.AllLines === true ? "disabled" : ""}
                                                                                className="form-control col-md-12">
                                                                                <option value="0"> All Lines</option>
                                                                                {
                                                                                    this.state.Lines.map(lines => (
                                                                                        <option className="" value={lines.id}>
                                                                                            {lines.lineName}
                                                                                        </option>
                                                                                    ))}
                                                                            </select>
                                                                        </fieldset>
                                                                    </div>
                                                                    <div className="col-xl-1 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="basicInput">All Users</h4>
                                                                            <div className="card-content">
                                                                                <div className="card-body">
                                                                                    <fieldset>
                                                                                        <div className="float-left">
                                                                                            <input type="checkbox" className="switch"
                                                                                                onChange={this.changeAllUsersChange}
                                                                                                value={this.state.AllUsers}
                                                                                                checked={this.state.AllUsers === true ? "checked" : ""} data-col-sm-3 />
                                                                                        </div>
                                                                                    </fieldset>
                                                                                </div>
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="basicInput">Select Bio User</h4>
                                                                            <select id="ddlLines" onChange={this.onUsersChange} className=" form-control" name="ddlLines"
                                                                                disabled={this.state.AllUsers === true ? "disabled" : ""}
                                                                                className="form-control col-md-12">
                                                                                <option value="-1">--Select User--</option>
                                                                                {
                                                                                    this.state.BioUsers.map(user => (
                                                                                        <option className="" value={user.userName}>
                                                                                            {user.userDetails}
                                                                                        </option>
                                                                                    ))}
                                                                            </select>
                                                                        </fieldset>
                                                                    </div>
                                                                    <div className="col-xl-5 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <br></br>
                                                                            <h3 className={this.state.PendingVoiceCount>0?"alert alert-danger":""}>Send Immediate Voice Alert :
                                                                               <span style={{display:this.state.PendingVoiceCount>0?"":"none"}}>
                                                                                    Pending Voice Message in Queue </span>
                                                                                    <span>{this.state.PendingVoiceCount}</span>
                                                                            </h3>
                                                                        </fieldset>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="card-footer-options">
                            <div class="row">
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">Standard Messages List</h4>
                                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                            <div class="heading-elements">

                                            </div>
                                        </div>
                                        <div class="card-content collapse show" style={{ maxLength: "200px" }}>
                                            <div class="card-body table-responsive">
                                                <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <thead>
                                                        <tr>
                                                            <th>Standard Message </th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.VoiceMessages.map(msg => (
                                                                <tr key={msg.id}>

                                                                    <td>{msg.message}</td>
                                                                    <td>
                                                                        <button
                                                                            onClick={this.VoiceMessageRowClick}
                                                                            value={msg.message}
                                                                            className="btn btn-success">Select</button>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card-footer text-muted">

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <form class="card" onSubmit={e => e.preventDefault()}>
                                        <div class="card-header">
                                            <h4 class="card-title">Send Voice Message</h4>
                                            <div className="alert alert-success" role="alert"
                                                style={{ display: this.state.Alerts }}>
                                                <span className="text-bold-600">Done!</span> You successfully Send Voice Message.
                                            </div>
                                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                            <div class="heading-elements">
                                            </div>
                                        </div>
                                        <div class="card-content collapse show">
                                            <div class="card-body">
                                                <textarea className="form-control"
                                                    value={this.state.VoiceMessage}
                                                    onChange={this.textareaChnage}
                                                    maxLength="300" style={{ minHeight: "200px" }} required ></textarea>
                                            </div>
                                        </div>
                                        <div class="card-footer border-0 text-muted">
                                            <span class="danger"><i class="icon-android-favorite"></i> {this.state.TextCount} / 300</span>

                                            <span class="float-right primary">
                                                <button className="btn btn-info" onClick={this.SaveStdMessages} >Send</button>
                                                <i class="icon-arrow-right4"></i></span>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </section>
                    </div>
                </div>
            </div >
        )
    }
} 
