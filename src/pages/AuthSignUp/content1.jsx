/**
 * External Dependencies
 */
//import classnames from 'classnames/dedupe';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Form, Input, FormFeedback } from 'reactstrap';

/**
 * Internal Dependencies
 */
//import Icon from '../../components/icon';
import { isValidEmail } from '../../utils';

import { updateAuth as actionUpdateAuth } from '../../actions';

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            email: '',
            emailError: '',
            name: '',
            nameError: '',
            password: '',
            passwordError: '',
            terms: false,
            termsError: '',
            loading: false,
            placeholder: "##########",
        };

        this.checkEmail = this.checkEmail.bind( this );
        this.checkName = this.checkName.bind( this );
        this.checkPassword = this.checkPassword.bind( this );
        this.checkTerms = this.checkTerms.bind( this );
        this.maybeLogin = this.maybeLogin.bind( this );
    }

    checkEmail() {
        const {
            email,
        } = this.state;

        const isValid = email && isValidEmail( email );

        this.setState( {
            emailError: isValid ? '' : 'Invalid email format',
        } );

        return isValid;
    }

    checkName() {
        const {
            name,
        } = this.state;

        const isValid = name && name.length >= 3;

        this.setState( {
            nameError: isValid ? '' : 'Name must be at least 3 characters long',
        } );

        return isValid;
    }

    checkPassword() {
        const {
            password,
        } = this.state;

        const isValid = password && password.length >= 6;

        this.setState( {
            passwordError: isValid ? '' : 'Password must be at least 6 characters long',
        } );

        return isValid;
    }

    checkTerms() {
        const {
            terms,
        } = this.state;

        this.setState( {
            termsError: terms ? '' : 'Accepting our terms is required',
        } );

        return terms;
    }

    maybeLogin() {
        const {
            updateAuth,
        } = this.props;

        if ( this.state.loading ) {
            return;
        }

        let isValid = true;
        isValid = this.checkEmail() && isValid;
        isValid = this.checkName() && isValid;
        isValid = this.checkPassword() && isValid;
        isValid = this.checkTerms() && isValid;

        // Form is not valid.
        if ( ! isValid ) {
            return;
        }

        this.setState( {
            loading: true,
        }, () => {
            setTimeout( () => {
                updateAuth( {
                    token: 'fake-token',
                } );
            }, 600 );
        } );
    }

    handleHover = () => {
        this.setState( { placeholder: "----------" } );
    };
    
      handleMouseOut = () => {
          this.setState( { placeholder: "##########" } );
      };
    formik = useFormik( {
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: "",
            gender: "",
            dateOfBirth: "",
            tShirtSize: "",
            nameOfTheBib: "",
            bloodGroup: "",
            contactName: "",
            contactNumber: "",
            acceptedTerms: false,
            eventName: "",
        },
        validationSchema: Yup.object( {
            firstName: Yup.string().required( 'This field is required' ),
            lastName: Yup.string().required( 'This field is required' ),
            email: Yup.string().email( 'Invalid email' ).required( 'This field is required' ),
            mobileNumber: Yup.string()
                .required( 'This field is required' ),
            gender: Yup.string().required( 'This field is required' ),
            dateOfBirth: Yup.date()
                .max( new Date(), 'Date of birth must be in the past' ) 
                .required( 'This field is required' ),
            tShirtSize: Yup.string().required( 'This field is required' ),
            nameOfTheBib: Yup.string().required( 'This field is required' ),
            bloodGroup: Yup.string().required( 'This field is required' ),
            contactName: Yup.string().required( 'This field is required' ),
            contactNumber: Yup.string().required( 'This field is required' ),
            acceptedTerms: Yup.boolean().required( 'This field is required' ),
            eventName: Yup.string().required( 'Please select an event' ),
  
        } ),
  
        // onSubmit: async( values ) => {
        //     try {
        //         await dispatch(registerUser( values ) );
        //     } catch ( error ) {
        //         throw new error;
        //     }
        // },
    } );
  
    render() {
        const {
            // email,
            // emailError,
            // name,
            // nameError,
            // password,
            // passwordError,
            // terms,
            // termsError,
        } = this.state;

        return (
            <Fragment>
                <div className="bg-image">
                    <div className="bg-grey-1" />
                </div>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="App w-50">
                        <div className="block-example border border-top-0 border-gray p-4 border-1">
                            <div className="text-center">
                                <img alt="" loading="lazy" style={ { textAlign: "center" } } src="https://reg.myraceindia.com/uploads/MRTS/form_files/regn%20banner.6530ed45e038e6.12464360.png" tabIndex="0" height="200px" width="680px" data-component="image" role="presentation" />
                            </div>
                            <h3 className="text-center mt-5">Registration Details</h3>
                            <hr />
           
                            <Form onSubmit={ ( e ) => {
                                e.preventDefault();
                                this.this.formik.handleSubmit();
                                return false; 
                            } }>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="eventName">Select Event</label>
                                        <select
                                            id="eventName"
                                            className="form-control"
                                            name="eventName"
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.eventName }
                                            invalid={ this.formik.touched.eventName && this.formik.errors.eventName ? true : false }
                                        >
                                            <option value="">Select an event</option>
                                            { /* { events.map( ( event ) => (
                                                <option key={ event.id } value={ event.eventName }>
                                                    { event.eventName }
                                                </option>
                                            ) ) } */ }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
  
                                        <p>Name <span className="text-danger">*</span></p>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <Input type="text" className="form-control" id="firstname" name="firstName" 
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.firstName || "" }
                                            invalid={
                                                this.formik.touched.firstName && this.formik.errors.firstName ? true : false
                                            }
                                        />
                                        { this.formik.touched.firstName && this.formik.errors.firstName ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.firstName }</div></FormFeedback>
                                        ) : null }
                                        <label htmlFor="firstname" className="text-sm">First Name</label>
                                    </div>
                                    <div className="form-group col-md-6">
     
                                        <Input type="text"className="form-control" id="lastname" name="lastName" 
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.lastName || "" }
                                            invalid={
                                                this.formik.touched.lastName && this.formik.errors.lastName ? true : false
                                            }
                                        />
                                        { this.formik.touched.lastName && this.formik.errors.lastName ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.lastName }</div></FormFeedback>
                                        ) : null }
                                        <label htmlFor="lastname" className="text-sm">Last Name</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                        <Input type="email"className="form-control" id="email" name="email" 
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.email || "" }
                                            invalid={
                                                this.formik.touched.email && this.formik.errors.email ? true : false
                                            }
                                        />
                                        { this.formik.touched.email && this.formik.errors.email ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.email }</div></FormFeedback>
                                        ) : null }
   
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">Mobile Number <span className="text-danger">*</span></label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="mobilenumber"
                                            placeholder={ this.state.placeholder }
                                            onMouseEnter={ this.handleHover }
                                            onMouseLeave={ this.handleMouseOut }
                                            name="mobileNumber"
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.mobileNumber || "" }
                                            invalid={
                                                this.formik.touched.mobileNumber && this.formik.errors.mobileNumber ? true : false
                                            }
                                        />
                                        { this.formik.touched.mobileNumber && this.formik.errors.mobileNumber ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.mobileNumber }</div></FormFeedback>
                                        ) : null }
                                        { this.formik.values.mobileNumber.startsWith( 0 ) && 
                                            <div className="text-danger font-weight-bold">Do Not start with 0</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">Gender <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <Input type="radio" id="male" style={ { transform: "scale(1.5)", marginLeft: "0.1em" } } name="gender" 
                                            onBlur={ this.formik.handleBlur }
                                            value="male"
                                            checked={ this.formik.values.gender === "male" }
                                            
                                            required />
                                        <label htmlFor="male" style={ { marginLeft: "2em" } }>Male</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Input type="radio" id="female" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="gender" 
                                            onBlur={ this.formik.handleBlur }
                                            value="female"
                                            checked={ this.formik.values.gender === "female" }
                                            
                                            required />
                                            
                                        <label htmlFor="female" style={ { marginLeft: "2em" } }>Female</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateofbirth">Date of Birth <span className="text-danger">*</span></label>
                                        <Input type="date" className="form-control" id="dateofbirth" style={ { color: "gray" } } name="dateOfBirth"
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.dateOfBirth || "" }
                                            invalid={
                                                this.formik.touched.dateOfBirth && this.formik.errors.dateOfBirth ? true : false
                                            }
                                        />
                                        { this.formik.touched.dateOfBirth && this.formik.errors.dateOfBirth ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.dateOfBirth }</div></FormFeedback>
                                        ) : null }
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">T-shirt Size <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="s" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="S" checked={ this.formik.values.tShirtSize === "S" }  required />
                                        <label htmlFor="s" style={ { marginLeft: "2em" } }>S</label>
                                    </div>
    
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="m" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="M" checked={ this.formik.values.tShirtSize === "M" }  required />
                                        <label htmlFor="m" style={ { marginLeft: "2em" } }>M</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="l" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="L" checked={ this.formik.values.tShirtSize === "L" }  required />
                                        <label htmlFor="l" style={ { marginLeft: "2em" } }>L</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="xl" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="XL" checked={ this.formik.values.tShirtSize === "XL" }  required />
                                        <label htmlFor="xl" style={ { marginLeft: "2em" } }>XL</label>
                                    
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="xxl" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="XXL" checked={ this.formik.values.tShirtSize === "XXL" }  required />
                                        <label htmlFor="xxl" style={ { marginLeft: "2em" } }>XXL</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bib">Name of the bib <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="bib" name="nameOfTheBib"
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.nameOfTheBib || "" }
                                            maxLength={ 16 }
                                            invalid={
                                                this.formik.touched.nameOfTheBib && this.formik.errors.nameOfTheBib ? true : false
                                            }
                                        />
                                        { this.formik.touched.nameOfTheBib && this.formik.errors.nameOfTheBib ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.nameOfTheBib }</div></FormFeedback>
                                        ) : null }
                                    </div>
                                    <div className="form-group col-md-6"> 
                                    </div>
                                    <div className="form-group col-md-6 text-sm">max of 16 characters allowed 
                                    </div>
                                    <div className="form-group col-md-6"> 
                                    </div>
                                    
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bib">Blood Group <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-group col-md-6"> 
                                    </div>
                                    <div className="form-group col-md-6">
                                        <select id="bloodgroup"className="" name="bloodGroup" style={ { width: "100%", padding: "0.4em", borderRadius: "7px", outline: "none", border: "1px solid lightgray", color: "gray" } }
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.bloodGroup || "" }
                                            invalid={
                                                this.formik.touched.bloodGroup && this.formik.errors.bloodGroup ? true : false
                                            }
                                        >
                                            { this.formik.touched.bloodGroup && this.formik.errors.bloodGroup ? (
                                                <FormFeedback type="invalid"><div>{ this.formik.errors.bloodGroup }</div></FormFeedback>
                                            ) : null }

                                            <option value="">Please Select</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>

                                    </div>
                                    <div className="form-group col-md-6">
                                    </div>
 
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emergencycontactname">Emergency Contact Name <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="emergencycontactname" name="contactName" 
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.contactName || "" }
                                            invalid={
                                                this.formik.touched.contactName && this.formik.errors.contactName ? true : false
                                            }
                                        />
                                        { this.formik.touched.contactName && this.formik.errors.contactName ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.contactName }</div></FormFeedback>
                                        ) : null }
                                    </div>
                                    <div className="form-group col-md-6">
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emergencycontactnumber">Emergency Contact number <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="emergencycontactnumber" name="contactNumber" 
                                            onBlur={ this.formik.handleBlur }
                                            placeholder={ this.state.placeholder }
                                            onMouseEnter={ this.handleHover }
                                            onMouseLeave={ this.handleMouseOut }
                                            value={ this.formik.values.contactNumber || "" }
                                            invalid={
                                                this.formik.touched.contactNumber && this.formik.errors.contactNumber ? true : false
                                            }
                                        />
                                        { ( this.formik.values.contactNumber.startsWith( 91 ) || this.formik.values.contactNumber.startsWith( 0 ) ) && 
                                        <div className="text-sm mt-2">DO NOT start with 91 or 0</div> }
                                        { this.formik.touched.contactNumber && this.formik.errors.contactNumber ? (
                                            <FormFeedback type="invalid"><div>{ this.formik.errors.contactNumber }</div></FormFeedback>
                                        ) : null }
                                    </div>
    
                                    <div className="form-group col-md-6">
                                    </div>
                                
                                </div>
                                    
                                <hr />
                                <p>General Terms & Conditions <span className="text-danger">*</span></p>
                                <div className="mx-3">
                                    <Input
                                        type="checkbox"
                                        name="acceptedTerms"
                                        className="form-check-input"
                                        id="acceptedTerms"
                                        checked={ this.formik.values.acceptedTerms }
                                        
                                        required
                                    />
                                    { this.formik.touched.acceptedTerms && this.formik.errors.acceptedTerms ? (
                                        <FormFeedback type="invalid"><div>{ this.formik.errors.acceptedTerms }</div></FormFeedback>
                                    ) : null }
                                    <label
                                        className="form-check-label"
                                        htmlFor="acceptedTerms"
                                    >
                                        { " " } Agree to terms and conditions
                                    </label>
                                    <p><Link to="/termsconditions">click here</Link> to read the terms & conditions</p>
                                </div>

                                <hr />
                                <div className="block-example p-4">
                                    <div className="d-flex flex-row justify-content-between mx-5 align-items-center">
                                        <Link to="/" className="backbutton">Back</Link>
                                        <img width="80px" alt="" src="https://myraceindia.com/Live_API/assets/jotform/MRTS_Logo_with_Powered_by.png" />
                                        <button className="nextbutton">Submit</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        
                    </div>
                </div>
                <div className="mt-20 text-grey-5">
                    Already have an account? <Link to="/sign-in" className="text-2">Sign In</Link>
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
