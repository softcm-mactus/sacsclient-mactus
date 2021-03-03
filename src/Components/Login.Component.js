import React from 'react';
// import {useFormik} from 'formik';
// import FeatherIcon from 'feather-icons-react';
// import * as Icon from 'feather-icons-react';
// import logo from '../app-assets/images/logo/logo-org.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import SACSDataServices from "../Services/sacs.services";
// import { connect } from 'react-redux';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: '',
            FirstName: '',
            LastName: "",
            ActionName: "Login",
            loginErrors: "",
            Alert: "none",
            Token: "",
            timeout: 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
       
        this.setState({
            [event.target.name]: event.target.value
            
        });
    }

    handleSubmit(event) {

        const { UserId, Password } = this.state;
       
        var data = {
            UserId: this.state.UserId,
            Password: this.state.Password
        };
       
        SACSDataServices.CheckUserskLogin(data).then(user => {
            
            if (user.data != null && user.data != "") {
               
                this.setState({
                    ActionName: "Logout",
                    UserId: user.data.userId,
                    FirstName: user.data.firstName,
                    LastName: user.data.lastName,
                    Token: user.data.token,
                    timeout: user.data.timeOut,
                });               
                if(this.state.UserId!=null && this.state.UserId!=""){
                    localStorage.setItem('UserId', this.state.UserId);
                    localStorage.setItem('Token', this.state.Token);
                    localStorage.setItem('FirstName', this.state.FirstName);
                    localStorage.setItem('timeout', this.state.timeout);                           
                    this.props.history.push("/");
                }                
            }
            else {
                //alert(JSON.stringify(user.data))
                SACSDataServices.CheckUserLoginError(data).then(error => {                                    
                    this.setState({
                        loginErrors: error.data,
                        Alert: ""
                    })
                }).catch(e=>{

                })                
            }            
            console.log(user.data);
        }).catch(e => {
            console.log("login error", e);            
           // alert(JSON.stringify(e))
            this.setState({
                loginErrors:"Something went wrong ",
                Alert: ""
            })
        });
        event.preventDefault();
    }
    render() {
        const { loggingIn } = this.props;
        const { UserId, FirstName, LastName, Token } = this.state;
        return (
            <section className="row flexbox-container" style={{ paddingTop: "20px" }}>
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                        <div className="card border-grey border-lighten-3 m-0">
                            <div className="card-header border-0">

                                <div className="card-title text-center" >
                                    {/* <div className="p-1"><img  src={logo} style={{maxHeight:"50px"}}  alt="branding logo"></img></div> */}
                                    <h1 className="card-subtitle line-on-side text-muted text-center font-small-4 pt-2">
                                        <span>Login</span></h1>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <form onSubmit={e => e.preventDefault()} className="form-horizontal form-simple"  >
                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                            <input type="text" onChange={this.handleChange} 
                                            // style={{textTransform:"uppercase"}}
                                                className="form-control form-control-lg" autoComplete="false"
                                                id="UserId" name="UserId" placeholder="Please enter username" required></input>
                                            <div className="form-control-position">
                                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                            </div>
                                        </fieldset>
                                        <br></br>
                                        <fieldset className="form-group position-relative has-icon-left">
                                            <input type="password" className="form-control form-control-lg"
                                                autoComplete="false" id="Password" name="Password"
                                                onChange={this.handleChange} placeholder="Please enter password" required></input>
                                            <div className="form-control-position">
                                                <FontAwesomeIcon icon={faKey} ></FontAwesomeIcon>
                                            </div>
                                        </fieldset>

                                        <div className={this.state.loginErrors != "Success" ? "alert alert-danger" : "alert alert-success"} role="alert" style={{ display: this.state.Alert }}>
                                            <span className="text-bold-600 text-center">{this.state.loginErrors}</span>
                                        </div>
                                        {loggingIn && <span>Loggedin</span>}
                                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block">
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
// function mapStateToProps(state) {
//     const { loggingIn } = state.authentication;
//     return {
//         loggingIn
//     };
// }

// const connectedLoginPage = connect(mapStateToProps)(LoginComponent);
// export { connectedLoginPage as LoginComponent };
