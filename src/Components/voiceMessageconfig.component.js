import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import "rc-time-picker/assets/index.css";
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class VoiceMessageConfig extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllLinesDate = this.retriveAllLinesDate.bind(this)
        this.state = {
            olddata: [],
            Lines: [],
            Alerts: "none",
            VoiceConfig: [],
            pushData: [],
            LineId: 0,
            adddata: [],
            AlertType: 0,
            VoiceMessage: "",
            Frequency: 0,
            TriggerTime: "",
            IsEnabled: false,
            IsHighPriority: false,
            SelectedLineName: "",
            EnableDelete: "none",
            LineSelected: false,
        }
    }
    retriveAllLinesDate() {
        SACSDataServices.GetALlLines().then(response => {
            this.setState({
                Lines: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    componentDidMount() {
        this.retriveAllLinesDate();
        this.retriveAllConfiguredVoiceMesages();
    }

    retriveAllConfiguredVoiceMesages() {
        SACSDataServices.GetAllConfiguredVoiceMessages().then(response => {
            alert(JSON.stringify(response.data))
            this.setState({
                VoiceConfig: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    handleInputChange(index, dataType, value) {
        if (index >= 0) {
            if (dataType === "isHighPriority" || dataType === "used") {
                if (value == "false") {
                    value = true;
                } else {
                    value = false;
                }
            }
            const newState = this.state.VoiceConfig.map((item, i) => {
                if (i === index) {
                    return { ...item, [dataType]: value };
                }
                return item;
            });
            this.setState({
                VoiceConfig: newState
            });
        }

        else if (index == -1) {
            if (dataType === "lineId") {
                this.setState({
                    LineId: value
                })
            }
            else if (dataType === "voiceTriggerType") {
                this.setState({
                    AlertType: value
                })
            }
            else if (dataType === "freqMin") {
                this.setState({
                    Frequency: true
                })
            }
            else if (dataType === "triggerTime") {
                this.setState({
                    TriggerTime: value
                })
            }
            else if (dataType === "voiceMsg") {
                this.setState({
                    VoiceMessage: value
                })
            }
            else if (dataType === "isHighPriority") {
                if (value === "false") {
                    // alert(value)
                    this.setState({
                        IsHighPriority: true
                    })
                }
                else {
                    this.setState({
                        IsHighPriority: false
                    })
                }
                //alert(this.state.IsHighPriority)
            }
            else if (dataType === "used") {
                if (value === "false") {
                    //alert(value)
                    this.setState({
                        IsEnabled: true
                    })
                }
                else {
                    this.setState({
                        IsEnabled: false
                    })
                }
                //alert(this.state.IsEnabled)
            }
            var adddata = {
                id: 0,
                lineId: Number(this.state.LineId),
                voiceTriggerType: Number(this.state.AlertType),
                freqMin: Number(this.state.Frequency),
                voiceMsg: this.state.VoiceMessage,
                triggerTime: this.state.TriggerTime,
                isHighPriority: this.state.IsHighPriority,
                used: this.state.IsEnabled,
                LineSelected:true,
            }
            this.setState({
                pushData: adddata
            })
        }
    }
    pushNewadddata = (e) => {
        alert(JSON.stringify(this.state.pushData))
        if (this.state.VoiceMessage != "" && this.state.VoiceMessage != null) {
            //  alert(JSON.stringify(this.state.CheckPoint))
            this.setState({
                VoiceConfig: [...this.state.VoiceConfig, this.state.pushData]
            })
            this.setState({
                LineId: -1,
                AlertType: "",
                Frequency: "",
                VoiceMessage: "",
                TriggerTime: "",
                IsHighPriority: false,
                IsEnabled: false,
                LineSelected:false,
            })
        }
    }
    deleteNewConfigRow = (index) => {
        var deleted = [...this.state.VoiceConfig]
        deleted.splice(index, 1)
        this.setState({
            VoiceConfig: deleted
        })

    }
    retriveAllLinesDate() {
        SACSDataServices.GetALlLines().then(response => {
            this.setState({
                Lines: response.data
            });
        }).catch(e => {
            console.log(e);
        });
    }
    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">  Voice Message Configuration</h3>
                        </div>
                    </div>

                    <div className="content-body">
                        <section id="horizontal">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="content-header row">
                                                <div className="content-header-left col-md-6 col-12 mb-2">
                                                    <h3 className="content-header-title mb-0"> Add Voice Message </h3>
                                                </div>
                                            </div>

                                            <form onSubmit={e => e.preventDefault()} className=" col-md-12 mb-0">
                                                <fieldset className="form-group">
                                                    <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>Select Line</th>
                                                                <th>Alert Type</th>
                                                                <th>Voice Message</th>
                                                                <th>Frequency(Min.)</th>
                                                                <th>Trigger Time(Day)</th>
                                                                <th>Enabled</th>
                                                                <th>High Priority</th>
                                                                <th>New Row</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                <tr>
                                                                    <td>
                                                                        <select id="ddlLines" required
                                                                            selected={this.state.LineSelected}
                                                                            className=" form-control" name="ddlLines"
                                                                            defaultValue={this.state.selectValue}
                                                                            onChange={e => this.handleInputChange(-1, 'lineId', e.target.value)}
                                                                            className="form-control col-md-12">
                                                                            <option className="" value="-1">-- Select Line--</option>
                                                                            <option className="" value="0">All Lines</option>
                                                                            {
                                                                                this.state.Lines.map(lines => (
                                                                                    <option className="" value={lines.id}>
                                                                                        {lines.lineName}
                                                                                    </option>
                                                                                ))}
                                                                        </select>
                                                                    </td>
                                                                    <td><select className="form-control"
                                                                        onChange={e => this.handleInputChange(-1, 'voiceTriggerType', e.target.value)} >
                                                                        <option value="-1">--Select Alert Type--</option>
                                                                        <option value="1">Frequency(Min.)</option>
                                                                        <option value="2">Trigger Time(Day)</option>
                                                                    </select>
                                                                    </td>
                                                                    <td><input type="text"
                                                                        onChange={e => this.handleInputChange(-1, 'voiceMsg', e.target.value)}
                                                                        placeholder="Please enter Message"
                                                                        className="form-control" required ></input></td>
                                                                    <td><TimePicker className="form-control"
                                                                        //defaultValue={moment()} showSecond={false}
                                                                        minuteStep={1}
                                                                        // value={moment(this.state.Frequency)}
                                                                        disabled={this.state.AlertType == 2 ? true : false}
                                                                        onChange={e => this.handleInputChange(-1, 'freqMin', e)}
                                                                        disabledMinutes={() => [0]}
                                                                        showSecond={false}
                                                                        showHour={false} /></td>
                                                                    <td><TimePicker className="form-control"
                                                                        //defaultValue={moment()}
                                                                        disabled={this.state.AlertType == 1 ? true : false}
                                                                        // value={moment(this.state.TriggerTime)}

                                                                        onChange={e => this.handleInputChange(-1, 'triggerTime', e)}
                                                                        checked={this.state.IsEnabled === true ? "checked" : ""}
                                                                        showSecond={false}
                                                                        minuteStep={1} /></td>

                                                                    <td><input type="checkbox" value={this.state.IsEnabled}
                                                                        checked={this.state.IsEnabled === true ? "checked" : ""}
                                                                        onChange={e => this.handleInputChange(-1, 'used', e.target.value)}
                                                                        className="" ></input> </td>
                                                                    <td><input type="checkbox"
                                                                        value={this.state.IsHighPriority}
                                                                        checked={this.state.IsHighPriority === true ? "checked" : ""}
                                                                        onChange={e => this.handleInputChange(-1, 'isHighPriority', e.target.value)}
                                                                        className="" ></input> </td>
                                                                    <td><button onClick={this.pushNewadddata}
                                                                        className="btn btn-primary">Add</button> </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </fieldset>
                                            </form>

                                            <div className="content-header row">
                                                <div className="content-header-left col-md-6 col-12 mb-2">
                                                    <h3 className="content-header-title mb-0"> Voice Message Configured List </h3>
                                                </div>
                                            </div>
                                            <form onSubmit={e => e.preventDefault()} className=" col-md-12 mb-0">
                                                <fieldset className="form-group">
                                                    <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                        <thead>
                                                            <tr>
                                                                <th>Select Line</th>
                                                                <th>Alert Type</th>
                                                                <th>Voice Message</th>
                                                                <th>Frequency(Min.)</th>
                                                                <th>Trigger Time(Day)</th>
                                                                <th>Enabled</th>
                                                                <th>High Priority</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.VoiceConfig.map((row, index) => (
                                                                    <tr>
                                                                        <td>
                                                                            <select id="ddlLines" onChange={this.onChange}
                                                                                className=" form-control" name="ddlLines"
                                                                                defaultValue={this.state.selectValue}
                                                                                onChange={e => this.handleInputChange(index, 'lineId', e.target.value)}
                                                                                className="form-control col-md-12">
                                                                                <option className="" value="-1">-- Select Line--</option>
                                                                                {/* <option className="" value="0">All Lines</option> */}
                                                                                {
                                                                                    this.state.Lines.map(lines => (
                                                                                        this.state.VoiceConfig[index].lineId > 0 ?
                                                                                            this.state.VoiceConfig[index].lineName === lines.lineName ?
                                                                                                <option className="" value={lines.id} selected>
                                                                                                    {this.state.VoiceConfig[index].lineId === 0 ? "All Lines" : lines.lineName}
                                                                                                </option>
                                                                                                :
                                                                                                <option className="" value={lines.id}>
                                                                                                    {this.state.VoiceConfig[index].lineId === 0 ? "All Lines" : lines.lineName}
                                                                                                </option>
                                                                                            : <option className="" value={lines.id} selected>
                                                                                                {this.state.VoiceConfig[index].lineId === 0 ? "All Lines" : lines.lineName}
                                                                                            </option>

                                                                                    ))}
                                                                            </select>
                                                                        </td>
                                                                        <td><select className="form-control"
                                                                            onChange={e => this.handleInputChange(index, 'voiceTriggerType', e.target.value)} >
                                                                            <option value="-1">--Select Alert Type--</option>
                                                                            {this.state.VoiceConfig[index].voiceTriggerType === 1 ?
                                                                                <option value="1" selected>Frequency(Min.)</option>
                                                                                : <option value="1">Frequency(Min.)</option>
                                                                            }
                                                                            {this.state.VoiceConfig[index].voiceTriggerType === 2 ?
                                                                                <option value="2" selected>Trigger Time(Day)</option>
                                                                                : <option value="2">Trigger Time(Day)</option>
                                                                            }

                                                                        </select>
                                                                        </td>
                                                                        <td><input type="text" value={this.state.VoiceConfig[index].voiceMsg}
                                                                            onChange={e => this.handleInputChange(index, 'voiceMsg', e.target.value)}
                                                                            placeholder="Please enter Message"
                                                                            className="form-control" required ></input></td>
                                                                        <td>
                                                                            <TimePicker className="form-control"
                                                                            //defaultValue={moment(this.state.VoiceConfig[index].freqMin)}
                                                                            onChange={e => this.handleInputChange(index, 'freqMin', e)}
                                                                            value={this.state.VoiceConfig[index].freqMin ?
                                                                                moment(this.state.VoiceConfig[index].freqMin) : ""
                                                                            }
                                                                            disabled={this.state.VoiceConfig[index].voiceTriggerType === 2 ? true : false}
                                                                            showSecond={false}
                                                                            // disabled={this.state.VoiceConfig[index].freqMin ? false : true}
                                                                            minuteStep={1}
                                                                            // disabledMinutes={() => [0]}
                                                                            showHour={false} /></td>
                                                                        <td>
                                                                            <TimePicker className="form-control"
                                                                                //defaultValue={moment()}
                                                                                onChange={e => this.handleInputChange(index, 'triggerTime', e)}
                                                                                disabled={this.state.VoiceConfig[index].voiceTriggerType === 1 ? true : false}
                                                                                value={this.state.VoiceConfig[index].triggerTime!=""?
                                                                                     moment(this.state.VoiceConfig[index].triggerTime):""}
                                                                                // this.state.VoiceConfig[index].triggerTime
                                                                                showSecond={false}
                                                                                minuteStep={1} />
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                this.state.VoiceConfig[index].used === true ?
                                                                                    <input type="checkbox" value={this.state.VoiceConfig[index].used}
                                                                                        onChange={e => this.handleInputChange(index, 'used', e.target.value)}
                                                                                        className="" checked></input>
                                                                                    : <input type="checkbox"
                                                                                        onChange={e => this.handleInputChange(index, 'used', e.target.value)}
                                                                                        value={this.state.VoiceConfig[index].used} className="" ></input>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                this.state.VoiceConfig[index].isHighPriority === true ?
                                                                                    <input type="checkbox"
                                                                                        value={this.state.VoiceConfig[index].isHighPriority}
                                                                                        onChange={e => this.handleInputChange(index, 'isHighPriority', e.target.value)}
                                                                                        className="" checked></input>
                                                                                    : <input type="checkbox"
                                                                                        onChange={e => this.handleInputChange(index, 'isHighPriority', e.target.value)}
                                                                                        value={this.state.VoiceConfig[index].isHighPriority}
                                                                                        className="" ></input>
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {this.state.VoiceConfig[index].id === 0 ?
                                                                                <button type="submit"
                                                                                    onClick={e => this.deleteNewConfigRow(index, 'delete', 0)} onTouchEnd="Delete"
                                                                                    className="btn btn-primary"> <FontAwesomeIcon style={{ display: "inline-block" }} icon={faTrashAlt}></FontAwesomeIcon>
                                                                                </button>
                                                                                : ""
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <div className="form-actions center text-center">
                                                        <div className="alert alert-success" role="alert"
                                                            style={{ display: this.state.Alerts }}>
                                                            <span className="text-bold-600">Done!</span> You successfully Updated Voice Message.
                                                        </div>
                                                        <a href="/voiceconfig" className="btn btn-warning mr-1">
                                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>Cancel </a>
                                                        <button className="btn btn-primary" type="submit" onClick={this.handleUpdateCheckList}>
                                                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>Update</button>
                                                    </div>
                                                </fieldset>

                                            </form>

                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard table-responsive">

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