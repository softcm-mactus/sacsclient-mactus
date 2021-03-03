import React from 'react';
import SACSDataServices from '../../Services/sacs.services';
import logo from '../../app-assets/images/logo/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { TablePagination } from "react-pagination-table";
import moment from "moment";
import DatePicker from 'react-datepicker';
import { faSync, } from '@fortawesome/free-solid-svg-icons';
import { jsPDF, printHeaderRow } from 'jspdf';
import 'jspdf-autotable';
// const Header = ["Name", "Age", "Size", "Phone", "Gender"];
// const data1 = [{ Name: 1, Age: 'Conan the Barbarian', Size: '1982', Phone: "122211212", Gender: "M" }];
export default class EventsLineReport extends React.Component {
    constructor(props) {
        super(props);
        this.retriveAuditrailDataByDate = this.retriveAuditrailDataByDate.bind(this);
        this.state = {
            data: [],
            Lines: [],           
            LineID: 1,
            Fromdate: new Date() - 1,
            todate: new Date(),
            SelectedLineName:""
        }
    }
    componentDidMount() {

        this.retriveAuditrailDataByDate();
        this.retriveAllLinesDate();
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
    onLineChange = (e) => {
        this.setState({
            LineID: e.target.value
        });        
        SACSDataServices.GetEventLineReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), e.target.options[e.target.selectedIndex].text).then(response => {
                this.setState({
                    data: response.data,
                    SelectedLineName: e.target.options[e.target.selectedIndex].text
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
        SACSDataServices.GetEventLineReportByDate(moment(e).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), this.state.SelectedLineName).then(response => {
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
        SACSDataServices.GetEventLineReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"),
            moment(e).format("DD-MM-yyyy"), this.state.SelectedLineName).then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
    }
    retriveAuditrailDataByDate() {

        SACSDataServices.GetEventLineReportByDate(moment(this.state.Fromdate).format("DD-MM-yyyy"),
            moment(this.state.todate).format("DD-MM-yyyy"), this.state.SelectedLineName).then(response => {
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
        //  var totalPagesExp = '{total_pages_count_string}' 
        doc.page = 1
        var totalPagesExp = doc.internal.getNumberOfPages();

        //   doc.fromHtml(header)
        doc.autoTable({
            html: '#my-table',
            theme: 'grid',
            tableWidth: 270,
            styles: {

                fontSize: 10,
                halign: 'left'
            },
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 60 },
                2: { cellWidth: 75 },
                2: { cellWidth: 75 },

            },

            didDrawPage: function (data) {

                doc.autoTable({
                    html: '#tblHeader',
                    theme: 'grid',

                    tableWidth: 270,

                    styles: {
                        align: 'left',
                        fontSize: 15,
                        halign: 'center',
                    },
                    //setFontSize: 15,
                    columnStyles: {
                        0: { cellWidth: 40 },
                        1: { cellWidth: 50 },
                        2: { cellWidth: 180 },
                    },

                });
                var img = new Image;
                img.crossOrigin = "";
                img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAwCAYAAADAU15dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfeAwUUKiYy1x9kAAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpdGggR0lNUGQuZQcAABH8SURBVHhe7dx1qGXVFwfwPWN3d3d3i93Y3Z3YLahggYKC2PmHqCiCgiJ2d3d3d3fH7+dnz13P/face9+7M87wZpgvHN695+xYe/VeZ9836H//II3BaIPBrb9jMJogW+hbb72VzjjjjDTTTDOlgw46KE000UT54R9//JHOP//85PlOO+2UlllmmXzv7rvvTk8++WT67rvv0vjjj5/mnnvutN5666Vpp5029/v000/Tsccem2abbbZ09NFHp3HGGSffh8suuyw9/PDDac0110xbb711evDBB9M111yTJphggvTXX3/luY2z6qqrpoUWWqjVqxn3339/euSRR9JXX32V+88111xp8803TxNPPHGrRcpj3nDDDenll19O3377baZ3gQUWyPROMcUUuc1TTz2VrrjiijT22GOnGWecMR166KH5fuCYY45Jf//9d/rll1/S/vvvn+add950++23pxtvvDHTiyeDBw9OU001VVpqqaXSWmut1eo5BF988UUeY5JJJsl80S7wySef5Gcbbrhh2mKLLVp3U7ruuuvyHHiO90cddVRe4yGHHNLDZ7jyyivTQw89lNZff/08RrZQjJhuuunS999/n5kT+Prrr/N3hCy++OL53uWXX55uueWW9Pvvv6c55pgjM++ZZ55JZ599dvr5559zG4zBOJeFlhhvvPHy/RCytu6ZY5555smf33nnnXTJJZfkRbXD9ddfn6699tr0448/ZsXR77nnnksXXHBB+umnn3IbQrjooovSvffe20MvpjzxxBP5vr4w1lhjZZqshZL++eef+T789ttveZwJJ5wwt9EW0D/uuOOmySabLNONf/hFeW666abcJvDKK6/0KA8BljCeeZ9//vmsfAHjo9Vzn2eZZZasOB9++GGrRcr8/vjjj7NSLb300vleD7fnm2++LNB33323dSflzrQSsQb95ptvsjZbxH777Zf23nvvrLGLLLJIHpxGBQYNGpSvJtTPMHCaaaZJu+66azr88MOzpnn+wAMP9DC9BMY9++yzWQlo77777pvpmHnmmbM1ECy89tpr6YMPPkjTTz99pnWvvfbKmj777LOnzz//PFs3BC3+EqB1BvQPpSxp9hmDWfQ+++yTDjzwwLT22mtnmngvvAxQUMKndK+//nrr7r+g1D/88EN64YUXWnd60wQsFY/feOON/B0YG15QFmuEHoEuueSSWQu5wMCLL76YB+H+4NFHH82ELbjgglnItId2rLzyylmb3n777dyuXHh/IC9zGdtlPkoDXGUNi2KFFsH9Ybj26KLlb775Zm6HHkxfeOGFM+MxDs3rrLNOtliWU4LSol2ICbz33nu5nzk65Y/oXmWVVdLUU0+djSAMg7Ky+vBC9Zxg3EknnTTdeeedrTtDwxomn3zybMmBl156KSsO2QV6BDrDDDNk0//yyy9bd1LWJtKfddZZ83eaa2FljApgBNf066+/di3QQMkwFms8FlPDIjCqjEWAqTTWBRgb7rIE5pmrHJsiGI/wuLGAuaaccsos7E4CBevmls1pbhC3CdR6XBSsdOkBfc1VutQShCl2GsuYINRZmxwm0CNQliZZsDBagCk6Emb4f1rdCfqWcaBblIrA1bEmWl2D0pjH8xIrrLBCOvXUU9Nuu+2Wv7ej1zwUE3PjO2FFrAql9vyjjz7Kyo4/fQk0FNrYlAu4Re5USAvr5YJLGJeR6M8LNgGNrNSaI1RIPikJmgM9AgWxhYaKL2KUz72k/w+h/UEpmP6gbI+ZEgvMtFAutUa78VkHLQ533S0dGIo5hMB6WRLFFl6aXG45PkHecccd2YuFYgCme4YuHoAihgcJmJfCcJ3iL0WslRXkCNaoP3eLJgktdx7oJSEPWcSrr76afT2tIeQRDQz47LPP0vHHH5/OPPPM9Nhjj+V7tha1u4RuBdVflAJlSRIy1iWLDmsugZHi9HHHHZdOPvnkvI3iNpdffvlsjcB9G5fbZk2UwlpryAnEYP3xX05SQ5ZOKXgNlky4ZFail0A15mIRQbNolUFGNCySRmJmaLGsTvIyMmFea6b5GOsiUC63SaDaEyq6JV2yfXvrDTbYID8nSMkRpbQuAgUCqeOo8bVhpfb5EVJKr8CNzz///NlCJWtygTnnnLP1dAiG8qHM2mAmJMxhsYbaNTXBYgPmstjdd989Fxz0p1R9xez/GtbNXWMkprnCQ6C35gUhEKTtENptocTxEoTHnRIGq5WPGLdemzUbX6bOmMRZXqoGi8Qv7fGMUEsMJVBVDlsVi4vNaqAUQicgrC+hlvFYW5d7Ar+YJSlyNaEdHfbIJ510Urrqqqvy9xBAk1Iao6QBrNk9QqVQ9rMsQi7RDjF2GccC3DGhaIOuE088Ma/TXrlpfw0qTUIdy26Ko6pn5iIjbWsMJVALsliD1fGrSWNK6KufBUSW18TM8nmJEKq4jeDY19awIO1qN4hJEjqpPdQuq0YwrGzjnrDDSjBVObRpDf2B/TJaWZTESKKFZgpSZ7qADu3N38l4rN2YtjI1hhJowOA1M2zkaXFZSQFEIoDABWp/aTnGEkyJ2I6IS+1A88z9+OOPt+70hlhj4ZhegjAlE5GQcEeYF/u2gHaY0i7hEpcUNKwJne7VvOgPWLn1b7rppumUU07Jl8SHMGSpNWKO1VdfvXH/XQJNTUJvK9AmLLHEEpkYmodYkA3KShEQWxyMkhm6p/pB4IhVipNBet4pe6ahkZ6XhY6AJITgPI8yn3ElCgSlP8gHKJcCSUnvfffdl+/bdzeBy6N0vIjsdFiEae3oM0aU5QCP8DDW1WT91ifs1B6oP2gUKCsk/XohFrfYYotly7vwwgvTueeem9/SKBFiQLxlQORKK62U+3uzcvrpp6ezzjorv2mxUBYYxQptzFVr26KLLprdlP1wDZmo5IGL9abG2Oedd162WDTGiwTxRtKiIK4Yf84552R6Cd78EYPQYM0un7kygqActnFBYzyH+F7THeDFXMYqtyC+8xqyZ1sVc8RYJWS7nsd8JUpaazQKlLu0EJPVUOTeeOONc4aFKJaEMfZiPge8gTjggAOyFbAGgmQx22yzTdpkk01arYYUprlGiy4JXG655bKWqsvWi4WtttoquzLaz+rQa6tzxBFH9IrPaFhjjTUyvRQAjSuuuGJ+CRAFCDToLxs1F4XRnjJEmdAzbSLumiPobgK3LiywNv0CvBOe4K02xvM8KkUBySF3X64loH1JS4nGEwtcBSuz4CahAiZKvTHDYjuB4E2DmTWBBC3OELpFBTCWACySVje5JmDF6EBn2b9GJCWYULfTnzWEYMEe1JzxnVdCi+/aGQ8ParoD8dx6a/6YCy0xFktGVyhYAA1N65IToCVyhBJjjqCMZugqKRqDgY8xAh3N0ONypcgKvny2+CXLbNq41pB+2xKICyBOSipsyPuCuCQzFbORIYnQVzLSFPBLiDvmFWfRKzmRuUpC+uobMMbTTz+d4xy6ZcdiYgm0OUngvrgowQIxUF9zN+UZ1uOZfafP3sRELPQdjdYrDkrsmvIQFSU7CO2aQGa2aGW9vUegEpcTTjghJwL2SbLD8tVZE7zm8u5UUhN7JoRirgzV0Yx28HL2tttuy30xR5AX4DFWhrnHHnu0XYgzO5iM5phXX0ynSNtuu21mVF+wn/b+VDLiOuyww4ZKQBQYnFOyJsnIxRdfnO9TBtsxiU+TAlkP2mypCNbxGoraYndG0Cw5sh10hKWEPbbtludlvwBljsNhgR7VomU6YoS/tabWcCjsnnvuycI3GUFECm8x9npHHnlkZnoNh7suvfTSrPH6l5mgsVge5aorQaBO6+wSJQBCtxXQz2VeWyhbgr6AodbrMn+TpeFDtHEFIvt0D798Rkdcxos1aRv9tXPhFT65CObmm29Op512Wi/BxdwxftMc9a6hV84bTInP7UBrHZXg4gjFntFGH+EqNiworEulaLPNNsufgbCculO+IxRewJkkWk6A2mM0rfYaafvtt2/1HHK+R7VJX5ZBq+2BzctiCDos1onBTh6ivyj5UPMk+EUp11133ewdfA4QVonov9FGG+VwhlfCnDcy1mQNTigq/QX0iZCCj3hj3PCk+pUYpqRIqY9FYqpqjEKBQoJXO8suu2x2L2IqoRI+QgOOXxIAxnuT4bWTvuqnNvyKBQi1gIhRAe6dAunrSAfXGvN6M6ToEfNSuKYXySMCaBS7lTvREhfaahBQxD00C23axp7WGptereGZ8fTTHr+c5hhugYp5BGQCRKy22mqtJ/9CRUgMpUna08TA+++/nxnOOllmDRbLzVgELSxP4Hn7wsXoK2mroSivukIh9G934Oq/hrlKy+yEprZipzWxPkkmF1xDv/A+ndC1QMVEgsRsVsSv1+A+JRnhcsJCuVSKAP42FehZvjERr38og88Wa2xCjXhdI+ZFX7xGG0hAVw1rEROBYPurHE3oWqAYHRPSqCYgusz8QuPiDQNtE+jbwTMLJFhtwV+LNbar3dzua+uieKMCKGAo//Cia4GauGRyE+r7EQfFhnjWpKnAcsVRp+EPPvjgnkPE+pXxtK+5jV+2Hx60m2tY0DSWuC83AIrc1w6jE7oWaDtBdELZh8AsqtM4LFQG7VUYFwzadzN3t0JAV5MbF+/N22k8z9uFgBraxg4AeC9bMd6IwkuYmgo66OuPoLsW6KiCboSvLWbeeuut+YdYcSl82FZw4+3Gc99zh5+110/BpfyNUA0v2G2x4l2uUCJECWc8Uj1X0KdP0KZvEwaMQLlHV8QTV9wbkWB5tJ/L8+MoZ2vjUjiJsl8nEKgD0vaQ+t11112NGTbBmMvRGmN7eU+IkjzJpqw/Xs6XIGwC1cf46Kx/4RYYEAKloU5A+J2kKk9cvrs/MoDZGMsdxsXdE2ZfCYvndd8yKSxBgbSNscMyHRooS3glwt3ro6+rnYsfMBaKaBfmWCSiLTiy2doN/VcwLi+AQQoViiI777xzPmO755575mM1GN4OaNbfeWL1Z331azqvFIJRiHGW1wl7yqx/WXypgSeEucMOO+Tf7ZjDzxebMCAEyg2pgKg6KecpzluE+66RAYqj+mJv7K9qjAKJNyF9WahtnCqRapG+Kjrt3lQRqnYK9Y7MEFS47Hbz6KONokvQp9TahK65FVrWDco+PrOK8h5L9NZgl112yWeO/KQg0viA9t3M3U1bwMymDX1/Y3g3xYBoq2wnm8cPb3LqX3eXQF8nTxHoWqDDYjHRhxsNRtfaWLpUz2qBeF62aYdo4+/Isu7hAUujvLYtkqrhRdcrFt/KgN/OEsr7kgRANCZjdrwQb4IFNgmjVIh2CEXRrq/sdCCAN+IF0OqtS389Qjt0LVDCwVhQWmtiMKZGmQ7UV8FphGA499Gu1uqUQJ0lEnCUC/WtXXJAem9eFwUa6PBCQbzFR0UGrwiHB40C7WQFqjdlAbz8Rw8BhNE2QhHM46cJylqySX0phg12DcL0hqXJGiUEBAbGb4KfWkRmTIFGBbBSBoAvTf9Tohs0CpQ1RPW/CbI0BHhjbpNbF8FVXBDHfQj8JWNldjbRBOrdX/2jHf/7hzsO6y4huzMmpbA5r993qqBIOPS1hqb3kSMC5uvEr75gi0NRGYAKU1Py41l/QkjjKwsafvXVV2crCRcZ1qJo7getfrpnYoQoAsQpb5maBRIYwXiTX8ZDh6yclXGIWHs/T7A9ICTuJgThvWktVGUxgvQazvjO9NjicK1OQhA2xrLy7bbbrtVrxAKNGI1faCr5hR4vsPsC3rnwi0AdDrOtCeCJZ84XlV5L2LGXdQUaLRSRzuRgqhIW98aV+R7Ycssts9Z4gU0Y0m4WQxksisBsyp0sKEGIfsbAurlmwrCpNod+itM77rhjtmLElwvAONuaWKA9nHn0dQ/d+jn54OREfxBzlPPUaHoe3/01t1eDNb/KeBhjxFUCDyg174J/TvqVsC59jB2XOYxf/7KuR6CYSeLcp8vg7rlomr+lxUi3/ZsyJxYipupDYGICzWz3k3qu0wk71RUWZlxzcD0si6DEasKJmBngvv3zKG/5tYm+5rXxdqSFwvQH6I01m8c4Nco2ZSKGwcJO8Iu3qvkV8L0co3wWQLtn5nP0BnyO8T2LceNqUo4xP4UYzdDocsdgVEVK/wd4hw+XY+gpiAAAAABJRU5ErkJggg==";
                doc.addImage(img, 16, 18);

                // Footer
                var str = 'Page ' + doc.internal.getNumberOfPages()

                var printredate = moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
                // Total page number plugin only available in jspdf v1.0+              
                var printedBy = localStorage.getItem("UserId");
                if (typeof doc.putTotalPages === 'function') {
                    str = "          Prtd. Time = " + moment(printredate).format("DD-MM-YYYY HH:mm:ss")
                        + "              Prtd By = " + printedBy
                        + "                                           Checked By       "
                        + "                      Verified By                 " + str + ' of ' + totalPagesExp
                }
                doc.setFontSize(10)

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                //doc.text(str, data.settings.margin.left, pageHeight - 10)


            },
            margin: { top: 37, },
        });

        const pageCount = doc.internal.getNumberOfPages();
        var printredate = moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
        var printedBy = localStorage.getItem("UserId");
        // For each page, print the page number and the total pages
        var str = 'Page ' + doc.internal.getNumberOfPages()
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        for (var i = 1; i <= pageCount; i++) {
            // Go to page i
            doc.setFontSize(10)
            doc.setPage(i);
            //Print Page 1 of 4 for example
            doc.text("Prtd. Time = " + printredate + "               Prtd By = " + printedBy
                + "                          Checked By       " + "                        Verified By                      " +
                'Page ' + String(i) + ' of ' + String(pageCount), 40 - 20, pageHeight - 10, null, null, "left");
        }
        doc.save('LineEventReport' + moment(new Date()).format("DDMMYYHHmmss") + '.pdf')
    }
    render() {
        return (
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Biometric / PLC Events Report</h3>
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
                                                                                dateFormat="dd-MM-yyyy"
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
                                                                                dateFormat="dd-MM-yyyy"
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
                                                <table id="tblHeader" style={{ display: 'none' }} className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <tr>
                                                        <td rowspan="2">
                                                            <img src={logo} alt="logo"></img>
                                                        </td>
                                                        <td rowspan="2" >
                                                            <br></br>
                                                            <h1 >{localStorage.getItem('plant')}</h1>
                                                        </td>
                                                        <td><h3>{localStorage.getItem('app')}</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3> {this.state.SelectedLineName} : Biometric / PLC Events Report</h3></td>
                                                    </tr>
                                                </table>
                                                <table id="my-table" className="table display nowrap table-striped table-bordered scroll-horizontal">
                                                    <thead>
                                                        <tr>
                                                            <th>DateTime</th>
                                                            <th>User Name</th>
                                                            {/* <th>Line Name</th> */}
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
                                                                    {/* <td>{audit.lineName}</td> */}
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