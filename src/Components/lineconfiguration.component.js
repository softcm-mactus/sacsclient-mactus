import React, { Component } from "react";
import SACSDataServices from "../Services/sacs.services";


export default class LineConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllLinesDate = this.retriveAllLinesDate.bind(this);
        this.retriveConfigurations = this.retriveConfigurations.bind(this);
        this.state = {
            Lines: [],
            Config: [],
            LineID: 1,
            Fromdate: new Date() - 1,
            todate: new Date(),
            MandatoryOutTime: "",
            MaxStayTime: "",
            Alert1Duration: "",
            Alert2Duration: "",
            Alert3Duration: "",
            HasSubLines: "",
            MaxCount: "",
            CurrentCount: "",
            DisableControl: "",
            Alert1Enabled: "",
            Alert2Enabled: "",
            Alert3Enabled: "",
            Message: "",
            Error: "none"
        }
    }
    componentDidMount() {
        this.retriveAllLinesDate();
        this.retriveConfigurations();
    }
    retriveAllLinesDate() {
        SACSDataServices.GetALlLines().then(response => {
            this.setState({
                Lines: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    onLineChange = (e) => {

        this.setState({
            LineID: e.target.value
        });
        SACSDataServices.GetLineConfigurationByLineId(e.target.value).then(response => {
            this.setState({
                // Config: response.data,
                MandatoryOutTime: response.data.mandatoryOutTime,
                MaxStayTime: response.data.maxStayTime,
                Alert1Duration: response.data.alert1Duration,
                Alert2Duration: response.data.alert2Duration,
                Alert3Duration: response.data.alert3Duration,
                HasSubLines: response.data.hasSubLine,
                MaxCount: response.data.maxCount,
                CurrentCount: response.data.currentCount,
                DisableControl: response.data.hasSubLines
            })

            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    retriveConfigurations() {
        SACSDataServices.GetLineConfigurationByLineId(this.state.LineID).then(response => {
            this.setState({
                // Config: response.data,
                MandatoryOutTime: response.data.mandatoryOutTime,
                MaxStayTime: response.data.maxStayTime,
                Alert1Duration: response.data.alert1Duration,
                Alert2Duration: response.data.alert2Duration,
                Alert3Duration: response.data.alert3Duration,
                HasSubLines: response.data.hasSubLine,
                MaxCount: response.data.maxCount,
                CurrentCount: response.data.currentCount,
                DisableControl: response.data.hasSubLines
            })

            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    handleSaveDate = () => {
        
        var data = {
            MandatoryOutTime: this.state.MandatoryOutTime,
            MaxStayTime: this.state.MaxStayTime,
            Alert1Duration: this.state.Alert1Duration,
            Alert2Duration: this.state.Alert2Duration,
            Alert3Duration: this.state.Alert3Duration,
            HasSubLines: this.state.HasSubLines,
            MaxCount: this.state.MaxCount,
            CurrentCount: this.state.CurrentCount,
        };
       
        SACSDataServices.SaveLineConfigurations(data, this.state.LineID, "Mactus123").then(response => {
           
            if (response.data != "Ok" && response.data != null && response.data != "") {
                this.setState({
                    Error: "",
                    Message: response.data
                })
            }
            else if (response.data == "Ok" && response.data != null && response.data != "") {
                this.setState({
                    Error: "",
                    Message: "Data Update Successfully "
                })
            }
            else if (response.data == null || response.data == "") {
                this.setState({
                    Error: "",
                    Message: "No Changes in Data "
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
   
    mandateOutChnage = (e) => {
        this.setState({
            MandatoryOutTime: e.target.value
        })
    }
    maxStayChange = (e) => {
        this.setState({
            MaxStayTime: e.target.value
        })
    }
    thirdWarningChange = (e) => {
        this.setState({
            Alert3Duration: e.target.value
        })
    }
    secondWarningChange = (e) => {
        this.setState({
            Alert2Duration: e.target.value
        })
    }
    firstWarningChange = (e) => {
        this.setState({
            Alert1Duration: e.target.value
        })
    }
    maxCountChange = (e) => {
        this.setState({
            MaxCount: e.target.value
        })
    }

    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Line Configurations </h3>
                        </div>
                    </div>
                    <div class="content-body">
                        <section id="form-control-repeater">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <div class="form-group col-md-12 mb-2 row" style={{ paddingTop: "10px" }}>
                                                <div class="form-group col-md-1 mb-2">
                                                    <span >Select Line</span>
                                                </div>
                                                <div class="form-group col-md-2 mb-2">
                                                    <select className="form-control"  defaultValue={this.state.selectValue} onChange={this.onLineChange}>
                                                        {
                                                            this.state.Lines.map(lines => (
                                                                <option className="" value={lines.id}>
                                                                    {lines.lineName}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-content collapse show">

                                            <div class="card-body">
                                                <h4 class="card-title" id="file-repeater">Voice Alert Setting(Minutes)</h4>
                                                {
                                                    <form class="form row" onSubmit={e => e.preventDefault()}>
                                                        <div className="col-md-6 row">
                                                            <div class="form-group col-md-4 mb-2">
                                                                <span>Mandatory Out Duration</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" disabled={this.state.DisableControl == "1" ? "disabled" : ""}
                                                                    class="form-control" value={this.state.MandatoryOutTime}
                                                                    onChange={this.mandateOutChnage} required></input>
                                                            </div>
                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >Maximum Stay Duration</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" value={this.state.MaxStayTime}
                                                                    disabled={this.state.DisableControl == "1" ? "disabled" : ""}
                                                                    min="0" onChange={this.maxStayChange} class="form-control" required ></input>
                                                            </div>

                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >Third Warning Duration</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" onChange={this.thirdWarningChange}
                                                                    disabled={this.state.Alert1Enabled == "0" ? "disabled" : ""}
                                                                    value={this.state.Alert3Duration} class="form-control" required ></input>
                                                            </div>
                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >Second Warning Duration</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" onChange={this.secondWarningChange}
                                                                    disabled={this.state.Alert1Enabled == "0" ? "disabled" : ""}
                                                                    value={this.state.Alert2Duration} class="form-control" required ></input>
                                                            </div>
                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >First Warning Duration</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" onChange={this.firstWarningChange}
                                                                    disabled={this.state.DisableControl == "1" ? "disabled" : "" || this.state.Alert1Enabled == "0" ? "disabled" : ""}
                                                                    value={this.state.Alert1Duration} class="form-control" required ></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 row" >

                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >Maxmimum Count</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" value={this.state.MaxCount}
                                                                    class="form-control" onChange={this.maxCountChange}
                                                                    required></input>
                                                            </div>
                                                            <div class="form-group col-md-4 mb-2">
                                                                <span >Current Count</span>
                                                            </div>
                                                            <div class="form-group col-md-2 mb-2">
                                                                <input type="number" min="0" value={this.state.CurrentCount}
                                                                    class="form-control"
                                                                    disabled required></input>
                                                            </div>
                                                        </div>

                                                        <div class="form-group col-12 mb-2 text-center">
                                                            <button type="submit" onClick={this.handleSaveDate}
                                                                data-repeater-create class="btn btn-primary"> Update</button>

                                                            <div style={{ display: this.state.Error }}  class={this.state.Message!="Ok"?
                                                            "alert alert-danger alert-dismissible mb-2":"alert alert-success alert-dismissible mb-2"} role="alert">
                                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                                <strong></strong> {this.state.Message}
                                                            </div>
                                                        </div>
                                                    </form>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6" style={{ display: "none" }}>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title" id="tel-repeater">Maximum Count Settings </h4>
                                            <a class="heading-elements-toggle"><i class="icon-ellipsis font-medium-3"></i></a>
                                            <div class="heading-elements">
                                            </div>
                                        </div>
                                        <div class="card-content collapse show">
                                            <div class="card-body">
                                                {
                                                    <form class="row">
                                                        <div class="form-group col-md-4 mb-2">
                                                            <span >Maxmimum Count</span>
                                                        </div>
                                                        <div class="form-group col-md-2 mb-2">
                                                            <input type="number" min="0" value={this.state.MaxCount}
                                                                class="form-control" onChange={this.handleInputChange}
                                                                required></input>
                                                        </div>
                                                        <div class="form-group col-md-4 mb-2">
                                                            <span >Current Count</span>
                                                        </div>
                                                        <div class="form-group col-md-2 mb-2">
                                                            <input type="number" min="0" value={this.state.CurrentCount}
                                                                onChange={this.handleInputChange} class="form-control"
                                                                disabled required></input>
                                                        </div>
                                                        <div class="form-group col-12 mb-2 text-center">
                                                            <button type="submit" data-repeater-create class="btn btn-primary"> Update</button>
                                                        </div>
                                                    </form>
                                                }
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