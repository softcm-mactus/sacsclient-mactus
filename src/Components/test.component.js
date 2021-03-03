
import React, { Component } from "react";
import SACSDataServices from "../Services/sacs.services";
import clientlogo from '../app-assets/images/icons/cmp-logo.png';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// import { Canvas } from "@react-pdf/renderer";
// import html2canvas from "html2canvas";
class OrderComponent extends Component {
  constructor(props) {
    super(props)
    this.retriveAlarmHistoryDate = this.retriveAlarmHistoryDate.bind(this);

    this.state = {
      data: [],
      lineNumber: 1,
      new_Page: true,
    }
  };
  componentDidMount() {
    // this.retriveAllLinesDate();
    this.retriveAlarmHistoryDate();
    // const [value, onChange] = useState(new Date());
  }
  retriveAlarmHistoryDate() {
    SACSDataServices.GetAllAlarmSummary().then(response => {

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
    doc.page=1
    var totalPagesExp = doc.internal.getNumberOfPages()

    //doc.printHeaderRow( this.state.lineNumber, this.state.new_Page)
    // doc.text(20, 20, 'This is the first title.')

    //doc.setFont('helvetica')
    //doc.setFontType('normal')
    // doc.text(20, 60, 'This is the second title.')
    function headRows() {
      return [
        { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }

    function footRows() {
      return [
        { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }
    function bodyRows(rowCount) {
      // rowCount = rowCount || 10
      // var body = []
      // for (var j = 1; j <= rowCount; j++) {
      //   body.push({
      //     id: j,
      //     name: faker.name.findName(),
      //     email: faker.internet.email(),
      //     city: faker.address.city(),
      //     expenses: faker.finance.amount(),
      //   })
      // }
      // return body
    }
    
    //var imgData;
    //doc.addImage(imgSampleData, 'PNG', 10, 10);
    doc.autoTable({
      html: '#my-table',
      theme: 'grid',
      tableWidth: 250,
      columnStyles: {
        3: { cellWidth: 'wrap' }
      },

      head: headRows(),
      body: bodyRows(40),
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)
        var imgSampleData ='data:cmp-logo/​png;base64,/9j/4AAQSkZJRgABAAEA8ADwAAD/2w'; 
        doc.addImage(imgSampleData,'PNG', data.settings.margin.left, 33443150, 10, 10)
        // doc.addImage("D:\Sources\SACSCLIENT\sacsclient-mactus\src\app-assets\images\avatar.jpg", 'JPEG', data.settings.margin.left, 15, 10, 10)
        doc.autoTable({
          html: '#tblHeader',
          theme: 'grid',
          tableWidth: 250,
          columnStyles: {
            3: { cellWidth: 'wrap' }
          },
        });
        // doc.text('Report', data.settings.margin.left + 15, 22)

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

    //doc.setFont('helvetica')
    //doc.setFontType('normal')
    // doc.text(20, 100, 'This is the thrid title.')      
     // use this as a counter.



    doc.save('demo.pdf')
  }

  render() {
    return (
      <div>
        <button onClick={this.generatePDF} id="img1" type="primary">Download PDF</button>
        {/* <table id="tblHeader" style={{paddingBottom:"20px"}}>
           <thead>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>

            </tr>
          </thead> 
          <tbody>
            <tr>
              <td rowSpan="0">SunPharma Halol
              </td>

            </tr>
            <tr>
              <td>Smart Access Control System</td>
              <td>Alarm History Report</td>
            </tr>
              
            <tr></tr>
          </tbody>
        </table> */}
        <table id="tblHeader" className="table display nowrap table-striped table-bordered scroll-horizontal">         
          <tr>
          <td rowspan="2" ><img alt="logo" src={clientlogo}></img> <br></br>
          <h1>Sunpharma Halol</h1>
          </td>          
            <td><h3>Smart Access Control Solution</h3></td>
          </tr>
          <tr>
            <td><h3> Audit Trail Report</h3></td>            
          </tr>
        </table>
        <div className="card-content collapse show">
          <div className="card-body card-dashboard">
            <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
              <thead>
                <tr>
                  <th>Line Name</th>
                  <th>Alarm DateTime</th>
                  <th>Alarm Tag</th>
                  <th>Alarm Description</th>
                  <th>Alarm Ack. User</th>
                  <th>Alarm Ack. Datetime</th>
                  <th>Rearks</th>
                  <th>RTN DateTime</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(alarm => (
                    <tr key={alarm.id}>
                      <td>{alarm.lineName}</td>
                      <td>{alarm.alarmDateTime}</td>
                      <td>{alarm.alarmTag}</td>
                      <td>{alarm.alarmDesc}</td>
                      <td>{alarm.alarmAckUser}</td>
                      <td>{alarm.alarmAckDateTime}</td>
                      <td>{alarm.remarks}</td>
                      <td>{alarm.alarmRtnDateTime}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    );
  }
}
//   state = {
//     numPages: null,
//     pageNumber: 1,
//   }

//   onDocumentLoadSuccess = ({ numPages }) => {
//     this.setState({ numPages });
//   }

//   render() {
//     const { pageNumber, numPages } = this.state;

//     return (
//       <div>
//         <Document
//           file="somefile.pdf"
//           onLoadSuccess={this.onDocumentLoadSuccess}
//         >
//           <Page pageNumber={pageNumber} />
//         </Document>
//         <p>Page {pageNumber} of {numPages}</p>
//       </div>
//     );
//   }
// }

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// // Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );
// const OrderComponent = () => (
//   <PDFViewer>
//     <MyDocument />
//   </PDFViewer>
// );
//ReactPDF.render(<MyDocument />, `${"../Downloads"}/example.pdf`);

// function OrderComponent() {
//   const [count, setCount] = useState(0);



//   console.log(count)
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>


//     </div>
//   );

// }

export default OrderComponent;