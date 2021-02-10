import React from 'react';
import SACSDataServices from '../../Services/sacs.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import DatePicker from 'react-datepicker';
import { faSync,faMinus } from '@fortawesome/free-solid-svg-icons';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { jsPDF, printHeaderRow } from 'jspdf';
import 'jspdf-autotable';

export default class AuditTrail extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAllLinesDate = this.retriveAllLinesDate.bind(this);
        this.retriveEntryExitReportByDate = this.retriveEntryExitReportByDate.bind(this);
        this.state = {
            Lines: [],
            data: [],
            LineID: 1,
            Fromdate: new Date() - 1,
            todate: new Date(),
            SelectedLineName:""
        }
    }
    componentDidMount() {
        this.retriveAllLinesDate();
        this.retriveEntryExitReportByDate();
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
    onChange = (e) => {
        SACSDataServices.GetEntryExitReportByDate(e.target.value).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    onClick = () => {
        this.retriveEntryExitReportByDate();
    }
    onLineChange = (e) => {
        this.setState({
            LineID: e.target.value
        });        
        SACSDataServices.GetEntryExitReportByDate(moment(e).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), e.target.value).then(response => {
                this.setState({
                    data: response.data,
                    SelectedLineName: e.nativeEvent.target[e.target.value - 1].text
                })
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
    }
    changeFromDate = (e) => {

        this.setState({
            Fromdate: e
        });
        SACSDataServices.GetEntryExitReportByDate(moment(e).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), this.state.LineID).then(response => {
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
        SACSDataServices.GetEntryExitReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"),
            moment(e).format("DD-MM-yyyy"), this.state.LineID).then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
    }
    retriveEntryExitReportByDate() {

        SACSDataServices.GetEntryExitReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), this.state.LineID).then(response => {
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
            setFontSize:25,
            columnStyles: {
                3: { cellWidth: 'wrap' }
            },

            //head: headRows(),
            //body: bodyRows(40),
            didDrawPage: function (data) {
                // Header
                doc.setFontSize(20)
                doc.setTextColor(40)
                
                doc.autoTable({
                    html: '#tblHeader',
                    theme: 'grid',
                    tableWidth: 250,
                    columnStyles: {
                        3: { cellWidth: 'wrap' }
                    },
                });
               
                // Footer
                var str = 'Page ' + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + ' of ' + totalPagesExp
                }
                doc.setFontSize(10)

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                doc.text(str, data.settings.margin.left, pageHeight - 10)
                doc.page++
            },
            margin: { top: 30 },
        });
        doc.save('EntryExitReport' + moment(new Date()).format("DDMMYYHHmmss") + '.pdf')
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
                                                                            <h4 for="basicInput">Select Line</h4>
                                                                            <select id="ddlLines" onChange={this.onLineChange} className=" form-control" name="ddlLines"
                                                                                defaultValue={this.state.selectValue} className="form-control col-md-12">
                                                                                {
                                                                                    this.state.Lines.map(lines => (
                                                                                        <option className="" value={lines.id}>
                                                                                            {lines.lineName}
                                                                                        </option>
                                                                                    ))}
                                                                            </select>
                                                                        </fieldset>
                                                                    </div>
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
                                                    <li><a data-action="collapse" onClick={this.OrderComponent} ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon> </a></li>
                                                    <li><a data-action="reload" onClick={this.onClick}> <FontAwesomeIcon icon={faSync}></FontAwesomeIcon></a></li>
                                                    <button className="btn btn-primary" onClick={this.generatePDF} type="primary">Download PDF</button>
                                                    {/* <li><a data-action="expand"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></a></li> */}
                                                    {/* <li><a data-action="close"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> </a></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                        <table id="tblHeader" style={{display:'none'}} className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <tr>
                                                        <td rowspan="2" > <br></br>
                                                            <h1>Sunpharma Halol</h1>
                                                        </td>
                                                        <td><h3>Smart Access Control Solution</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3> {this.state.SelectedLineName}  Entry / Exit Report</h3></td>
                                                    </tr>
                                                </table>
                                            <div className="card-body card-dashboard table-responsive">                                               
                                                <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <thead>
                                                        <tr>
                                                            <th>Personnel Name</th>
                                                            <th>Employee ID</th>
                                                            <th>Dept.</th>
                                                            <th>Entry Date/Time</th>
                                                            <th>Entry Count</th>
                                                            <th>Exit Date/Time</th>
                                                            <th>Duration(HH:MM)</th>
                                                            <th>Purpose of Entry </th>
                                                            <th>Exit Reader</th>
                                                            <th>Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.data.map(audit => (
                                                                <tr key={audit.id}>
                                                                    <td>{audit.userName}</td>
                                                                    <td>{audit.userEid}</td>
                                                                    <td>{audit.userDept}</td>

                                                                    <td>{audit.inTime}</td>
                                                                    <td>{audit.inCount}</td>
                                                                    <td>{audit.outTime}</td>
                                                                    <td>{audit.timeDuration}</td>
                                                                    <td>{audit.inPurpose}</td>
                                                                    <td>{audit.outDevice}</td>
                                                                    <td>{audit.outPurpose}</td>
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
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  const OrderComponent = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );