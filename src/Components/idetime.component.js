import React, { useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function IdleTimeOut() {
    let history = useHistory();
    const idleTimerRef = useRef(null)
    let idletime = 0
    let login = false
    if (localStorage.getItem('timeout') == null)
        idletime = 0
    else
        idletime = localStorage.getItem('timeout')

    if (localStorage.getItem('UserId'))
        login = true;
    const [isLogged, setIsLoggedIn] = useState(login)
    const [modalIsOpen, setModalIsOPen] = useState(false)
    const [modalIsClose, setModalisclose] = useState(false)
    const sessionTimeoutRef = useRef(null)
    // alert(idletime)
    const onIdle = (e) => {
    
        console.log('user is idle')
        if (login) {
            //alert(login)
            setModalIsOPen(true)
            sessionTimeoutRef.current = setTimeout(autologout, 10000)
            console.log('user is idle')
        }
    }
    const clickModalHine = () => {
        setModalIsOPen(false)
    }
    const stayActive = () => {
        console.log('user is active')
        if (login) {
            setModalIsOPen(false)
            clearTimeout(sessionTimeoutRef.current)
            console.log('user is active')
        }
    }
    const autologout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem('FirstName');
        localStorage.removeItem('timeout');
        localStorage.removeItem('UserId');
        setModalIsOPen(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user auto logged out')
        history.push('/')
    }
    const logout = () => {

        localStorage.removeItem("Token");
        localStorage.removeItem('FirstName');
        localStorage.removeItem('timeout');
        localStorage.removeItem('UserId');
        setModalIsOPen(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user logged out')
        history.push('/')

    }
    
    return (
        <div>
            <IdleTimer
                ref={idleTimerRef}
                timeout={1000 * idletime}
                onIdle={onIdle}>
                    
            </IdleTimer>
            <Modal className="modal-dialog modal-lg" style={{ width: "900px" }}
                show={modalIsOpen} onHide={clickModalHine}>
                <Modal.Header className="modal-header bg-danger white">
                    <Modal.Title >
                        <h4 className="" id="myModalLabel10"> Hello! {localStorage.getItem('FirstName')} </h4>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={e => e.preventDefault()} className="col-md-12">
                    <Modal.Body className="modal-body">
                        <div >
                            <h2>You've been idle for a while </h2>

                            <div className="form-group">
                                <p>You will logged out soon </p>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button variant="secondary" onClick={logout}> Logout </Button>
                        <Button type="Submit" onClick={stayActive} variant="secondary"> Stay Active </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default IdleTimeOut


