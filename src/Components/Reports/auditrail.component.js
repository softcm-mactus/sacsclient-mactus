import React from 'react';
import SACSDataServices from '../../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { TablePagination } from "react-pagination-table";
import moment from "moment";
import DatePicker from 'react-datepicker';
import { faSync, } from '@fortawesome/free-solid-svg-icons';
import { jsPDF, printHeaderRow } from 'jspdf';
import 'jspdf-autotable';
// const Header = ["Name", "Age", "Size", "Phone", "Gender"];
// const data1 = [{ Name: 1, Age: 'Conan the Barbarian', Size: '1982', Phone: "122211212", Gender: "M" }];
export default class AuditTrail extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAuditrailDataByDate = this.retriveAuditrailDataByDate.bind(this);
        this.state = {
            data: [],
            Fromdate: new Date() - 1,
            todate: new Date(),
        }
    }
    componentDidMount() {

        this.retriveAuditrailDataByDate();
        // const [value, onChange] = useState(new Date());
    }

    onChange = (e) => {
        SACSDataServices.GetAuditTrailReportByDate(e.target.value).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    onClick = () => {
        this.retriveAuditrailDataByDate();
    }

    changeFromDate = (e) => {

        this.setState({
            Fromdate: e
        });
        SACSDataServices.GetAuditTrailReportByDate(moment(e).format("DD-MM-yyyy"), moment(this.state.todate).format("DD-MM-yyyy")).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    changeToDate = (e) => {

        this.setState({
            todate: e
        });
        SACSDataServices.GetAuditTrailReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"), moment(e).format("DD-MM-yyyy")).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    retriveAuditrailDataByDate() {

        SACSDataServices.GetAuditTrailReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"), moment(this.state.todate).format("DD-MM-yyyy")).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    generatePDF = () => {
        var doc = new jsPDF('p', 'mm', 'A3');
        doc.page = 1
        var totalPagesExp = doc.internal.getNumberOfPages()        
        

        doc.autoTable({
            html: '#my-table',
            theme: 'grid',
            tableWidth: 250,
            columnStyles: {
                3: { cellWidth: 'wrap' }
            },
            
            didDrawPage: function (data) {
                // Header
                doc.setFontSize(20)
                doc.setTextColor(40)

                // doc.addImage("D:\Sources\SACSCLIENT\sacsclient-mactus\src\app-assets\images\avatar.jpg", 'JPEG', data.settings.margin.left, 15, 10, 10)
                doc.autoTable({
                    html: '#tblHeader',
                    theme: 'grid',
                    tableWidth: 250,
                    setFontSize:25,
                    columnStyles: {
                        3: { cellWidth: 'wrap' }
                    },
                });
                // doc.text('Report', data.settings.margin.left + 15, 22)

                // Footer
                var str = 'Page ' + doc.internal.getNumberOfPages()
                var printredate=moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + ' of ' + totalPagesExp
                }
                doc.setFontSize(10)

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                doc.text(str, data.settings.margin.left,  pageHeight - 10)
                // doc.text("Prtd Time="+printredate, data.settings.margin.left, pageHeight - 10)
                // doc.text("Prtd By="+ "ADMIN123", data.settings.margin.left, pageHeight - 10)
                // doc.text("Checked By", data.settings.margin.left, pageHeight - 10)

                // doc.text("Verified By", data.settings.margin.left, pageHeight - 10)

                doc.page++
            },
            margin: { top: 30 },


        });

        doc.save('AuditTrailReport' + moment(new Date()).format("DDMMYYHHmmss") + '.pdf')
    }
    render() {
        return (

            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Audit Trail Report</h3>
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


                                                                    <div className="col-xl-3 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="helpInputTop">From Date</h4>

                                                                            <DatePicker className="form-control"
                                                                                selected={this.state.Fromdate}

                                                                                showPopperArrow={false}
                                                                                onChange={this.changeFromDate} />
                                                                            {/* <input type="text"  value={moment(this.state.Fromdate).subtract(1, 'days').format("DD-MM-YYYY")}
                                                                                className="form-control" id="helpInputTop"></input> */}
                                                                        </fieldset>
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-6 col-md-12 mb-1">
                                                                        <fieldset className="form-group">
                                                                            <h4 for="disabledInput">To Date</h4>
                                                                            <DatePicker className="form-control"
                                                                                selected={this.state.todate}
                                                                                showPopperArrow={false}
                                                                                onChange={this.changeToDate} />
                                                                            {/* <input type="datetime" value={moment(this.state.todate).format("DD-MM-YYYY")} className="form-control" id="disabledInput"></input> */}
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
                                                    {/* <li><a data-action="collapse" ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> </a></li> */}
                                                    <li><a data-action="reload" onClick={this.onClick}> <FontAwesomeIcon icon={faSync}></FontAwesomeIcon></a></li>
                                                    <button className="btn btn-primary" onClick={this.generatePDF} type="primary">Download PDF</button>
                                                    {/* <li><a data-action="expand"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></a></li> */}
                                                    {/* <li><a data-action="close"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> </a></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table id="tblHeader" style={{display:'none'}} className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <tr>
                                                        <td rowspan="2" > <br></br>
                                                            <h1>Sunpharma Halol</h1>
                                                        </td>
                                                        <td><h3>Smart Access Control Solution</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3> Audit Trail Report</h3></td>
                                                    </tr>
                                                </table>
                                                <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <thead>
                                                        <tr>
                                                            <th>DateTime</th>
                                                            <th>User Name</th>
                                                            <th>Message Details</th>
                                                            <th>Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.data.map(audit => (
                                                                <tr key={audit.id}>
                                                                    <td>{audit.eventTime}</td>
                                                                    <td>{audit.userName}</td>
                                                                    <td>{audit.eventMessage}</td>
                                                                    <td>{audit.remarks}</td>

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