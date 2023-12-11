/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
//import classnames from 'classnames/dedupe';
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from "react-router-dom";
// import { Spinner } from 'reactstrap';

/**
 * Internal Dependencies
 */
//import Icon from '../../components/icon';
//import { isValidEmail } from '../../utils';

import { updateAuth as actionUpdateAuth } from '../../actions';

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            selectEvent: "",
        };
    }

    handleNext = async() => {
        const {
            updateAuth,
        } = this.props;

        try {
            await axios.post( "http://localhost:3001/santarun/event", {
                eventName: this.state.selectEvent,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            } );
            updateAuth( {
                token: 'fake-token',
            } );
        } catch ( error ) {
            throw new Error;
        }
    };
    render() {
        const {
            selectEvent,
        } = this.state;

        return (
            <Fragment>
                { /* <div className="bg-image">
                    <div className="bg-grey-1" />
                </div> */ }
                <div className="App w-50">
                    <div className="block-example border border-top-0 border-gray border-1" style={ { padding: "2em" } } >
                        <img alt="" loading="lazy" style={ { textAlign: "center" } } src="https://reg.myraceindia.com/uploads/MRTS/form_files/regn%20banner.6530ed45e038e6.12464360.png" tabIndex="0" height="200px" width="680px" data-component="image" role="presentation" />
                        <div className="text-color my-5 mx-4">Participants aged 65+ can register free of cost. Write to us <br /> at  <span style={ { textDecoration: "none", color: "#001Af5" } }>santarun2023.rcck@gmail.com</span> with age proof and on successful validation a coupon code will be issued for free registration</div>
                        <h3 className="text-center">LAST DATE FOR REGISTRATIONS - 26 Nov 2023</h3>
                        <hr />
                        <h3 className="text-center mt-5">Registration Details</h3>
                        <hr />
                        <div>
                            <p className="mx-4">Category <span className="text-danger">*</span></p>
                        </div>
                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div className="d-flex-inline">
                                <input type="radio" id="customRadio1" style={ { transform: 'scale(1.5)', marginRight: "0.5em" } } value="5K Run - SANTA RUN" checked={ selectEvent === "5K Run - SANTA RUN" } onChange={ ( e ) => this.setState( { selectEvent: e.target.value } ) } />
                                <label htmlFor="customRadio1">5K Run - SANTA RUN</label>
                            </div>
                            <div>
                                <label htmlFor="customRadio1">700.00 INR</label>
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                                <div className="d-flex-inline">
                                    <label htmlFor="customRadio" style={ { marginLeft: "1.2em" } }>Non timed run</label>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <hr style={ { border: "none", borderTop: "2px dashed #999", width: "90%", margin: "auto", marginTop: "1em", marginBottom: "2em" } } />
                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div className="d-flex-inline">
                                <input type="radio" id="customRadio2" style={ { transform: 'scale(1.5)', marginRight: "0.5em" } } value="10K Run - SANTA RUN" checked={ selectEvent === "10K Run - SANTA RUN" } onChange={ ( e ) => this.setState( { selectEvent: e.target.value } ) } />
                                <label htmlFor="customRadio2">10K Run - SANTA RUN</label>
                            </div>
                            <div>
                                <label htmlFor="customRadio2">800.00 INR</label>
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                                <div className="d-flex-inline">
                                    <label htmlFor="customRadio" style={ { marginLeft: "1.2em" } }>Timed run</label>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <hr style={ { border: "none", borderTop: "2px dashed #999", width: "90%", margin: "auto", marginTop: "1em", marginBottom: "2em" } } />
                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div className="d-flex-inline">
                                <input type="radio" id="customRadio3" style={ { transform: 'scale(1.5)', marginRight: "0.5em" } } value="21.1K RUN - SANTA RUN" checked={ selectEvent === "21.1K RUN - SANTA RUN" } onChange={ ( e ) => this.setState( { selectEvent: e.target.value } ) } />
                                <label htmlFor="customRadio3">21.1K RUN - SANTA RUN</label>
                            </div>
                            <div>
                                <label htmlFor="customRadio3">900.00 INR</label>
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                                <div className="d-flex-inline">
                                    <label htmlFor="customRadio" style={ { marginLeft: "1.2em" } }>Timed run</label>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                        <hr style={ { border: "none", borderTop: "2px dashed #999", width: "90%", margin: "auto", marginTop: "1em", marginBottom: "2em" } } />
                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div className="d-flex-inline">
                                <input type="radio" id="customRadio4" style={ { transform: 'scale(1.5)', marginRight: "0.5em" } } value="50K CYCLING" checked={ selectEvent === "50K CYCLING" } onChange={ ( e ) => this.setState( { selectEvent: e.target.value } ) } />
                                <label htmlFor="customRadio4">50K CYCLING</label>
                            </div>
                            <div>
                                <label htmlFor="customRadio4">800.00 INR</label>
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                                <div className="d-flex-inline">
                                    <label htmlFor="customRadio" style={ { marginLeft: "1.2em" } }>Timed event</label>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div className="d-flex-inline">
                                <p className="text-sm">Coupon code applicable to group <br /> registrations only</p>
                            </div>
                            <div>
                                <p className="font-weight-bold">Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 800.00 INR</p>
                            </div>
                        </div>

                        <div style={ { marginBottom: "1em" } }>
                            <input type="text" placeholder="Enter Coupon Code" style={ { outline: "none", border: "1px solid gray", borderRadius: "5px", padding: "5px" } } />&nbsp;
                            <button type="button"className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                    
                    <div className="block-example border border-top-0 border-gray border-1" style={ { padding: "2em" } } >
                        <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                            <div></div>
                            <img width="80px" alt="" src="https://myraceindia.com/Live_API/assets/jotform/MRTS_Logo_with_Powered_by.png" />
                            <Link to={ `/sign-up?event=${ selectEvent }` } className="btn btn-primary"
                                onClick={ this.handleNext }
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect( ( { auth, settings } ) => (
    {
        auth,
        settings,
    }
), { updateAuth: actionUpdateAuth } )( Content );
