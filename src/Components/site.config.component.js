import React from 'react';
import SACSDataServices from '../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class SiteConfigCompoenet extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllSiteConfigurations = this.retriveAllSiteConfigurations.bind(this);

        this.state = {
            PlantConfig: [],
            Message: '',
            CheckBox1: "checked"
        }
    }

    componentDidMount() {
        this.retriveAllSiteConfigurations();
    }
    onClick = () => {
        SACSDataServices.GetAllSiteConfiguration().then(response => {
            this.setState({
                PlantConfig: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    handleInputChange(index, dataType, value) {
        const newState = this.state.PlantConfig.map((item, i) => {
            if (i === index) {
                if (dataType === "checkbox1") {
                    if (value == 1)
                        value = 0;
                    else if (value == 0)
                        value = 1;
                    // alert(value)
                }
                return { ...item, [dataType]: value };
            }
            return item;
        });

        this.setState({
            PlantConfig: newState
        });


    }
    retriveAllSiteConfigurations() {

        SACSDataServices.GetAllSiteConfiguration().then(response => {
            this.setState({
                PlantConfig: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    handleSubmit = () => {

        SACSDataServices.UpdatePlantConfiguration(this.state.PlantConfig,"Admin123").then(response => {
            this.retriveAllSiteConfigurations();
            console.log(response.data);
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
                        <div className=" col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Site Configurations</h3>
                        </div>
                        <label className="" >{this.Message}</label>
                    </div>
                    <div className="content-body">
                        <div className="row justify-content-md-center">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <a className="heading-elements-toggle"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        <div className="heading-elements">
                                            <ul className="list-inline mb-0">
                                                {/* <li><a data-action="collapse" ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> </a></li> */}
                                                <li><a data-action="reload" onClick={this.onClick}> <FontAwesomeIcon icon={faSync}></FontAwesomeIcon></a></li>
                                                {/* <li><a data-action="expand"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></a></li>
                                                <li><a data-action="close"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> </a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <form onSubmit={e => e.preventDefault()}>
                                        <div className="card-content collpase show">
                                            <div className="card-body table-responsive" style={{ maxHeight: "650px" }}>
                                                <table className="table display nowrap table-striped ">
                                                    <thead>
                                                        <tr>
                                                            <th><h4> Parameter Description</h4></th>
                                                            <th><h4> Value </h4></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.PlantConfig.map((row, index) => (
                                                                <tr key={this.state.PlantConfig[index].id} className="form form-horizontal">
                                                                    <td style={{ border: "1px solid black" }, { width: "500px" }}>
                                                                        <label className="col-md-12 label-control" for="eventRegInput1">
                                                                            {this.state.PlantConfig[index].description}</label>
                                                                    </td>
                                                                    <td>{
                                                                        <div className="form-body">
                                                                            <div className="form-group row">
                                                                                <div className="col-md-8">
                                                                                    {
                                                                                        this.state.PlantConfig[index].type === 1 || this.state.PlantConfig[index].type === 4 ?
                                                                                            <input type={this.state.PlantConfig[index].type == 1 ? "text" : "number"}
                                                                                                value={this.state.PlantConfig[index].value}
                                                                                                onChange={e => this.handleInputChange(index, 'value', e.target.value)} id="eventRegInput1"
                                                                                                className="form-control" placeholder="name" required></input>
                                                                                            : ""
                                                                                    }
                                                                                    {
                                                                                        this.state.PlantConfig[index].type === 3 ?
                                                                                            <input type="text"
                                                                                                value={this.state.PlantConfig[index].value}
                                                                                                onChange={e => this.handleInputChange(index, 'value', e.target.value)} id="eventRegInput1"
                                                                                                className="form-control" placeholder="name" required></input>
                                                                                            : ""
                                                                                    }
                                                                                    {
                                                                                        this.state.PlantConfig[index].type === 2 ?
                                                                                            <input type="number" min="0" max="1"  value={this.state.PlantConfig[index].value} className="form-control"
                                                                                            onChange={e => this.handleInputChange(index, 'value', e.target.value)} required ></input>
                                                                                            : ""

                                                                                        // this.state.PlantConfig[index].value == 1 ?
                                                                                        //     <input type="checkbox" value="1" onChange={e => this.handleInputChange(index, 'checkbox1', e.target.value)} id="eventRegInput1"
                                                                                        //         defaultChecked={this.state.CheckBox1}></input>
                                                                                        //     : <input type="checkbox" value="0" onChange={e => this.handleInputChange(index, 'checkbox', e.target.value)} id="eventRegInput1"
                                                                                        //     ></input>
                                                                                        // : ""
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                                <div className="form-actions center text-center">
                                                    <button type="button" className="btn btn-warning mr-1">
                                                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>  Cancel
                                                </button>
                                                    <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
                                                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>  Save
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}