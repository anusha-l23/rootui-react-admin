/**
 * External Dependencies
 */
import classnames from 'classnames/dedupe';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input } from 'reactstrap';
import axios from "axios";
/**
 * Internal Dependencies
 */
//import Icon from '../../components/icon';

import { updateAuth as actionUpdateAuth } from '../../actions';

class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            placeholder: "##########",
            events: [],
            mobileNumberError: "",
            data: {
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
                eventId: null,
            },
           
        };
    }
    componentDidMount() {
        this.fetchEvents();
    }
    
      fetchEvents = async() => {
          try {
              const response = await axios.get('http://localhost:3001/santarun/events');
              this.setState({ events: response.data });
          } catch (error) {
              throw error;
          }
      };
       
      componentDidUpdate(prevProps, prevState) {
          if (prevState.events !== this.state.events) {
              this.updateEventId();
          }
      }

    updateEventId = () => {
        const { events } = this.state;
        const params = new URLSearchParams(this.props.location.search);
        const eventName = params.get('event');
        /* eslint-disable */
console.log(eventName, events, "event");
    /* eslint-enable */
        const selectedEvent = events.find(event => event.eventName === eventName);
        /* eslint-disable */
        console.log(selectedEvent, "selected");
        /* eslint-disable */
        if (selectedEvent) {
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    eventId: selectedEvent.id,
                },
            }));
        }
    };
    handleHover = () => {
        this.setState( { placeholder: "----------" } );
    };
    
      handleMouseOut = () => {
          this.setState( { placeholder: "##########" } );
      };
  
      handleInputChange = (e) => {
          const { name, value, type, checked } = e.target;
          if (e.target.nodeName === 'SELECT') {
              this.setState({
                  data: { ...this.state.data, [ name ]: value },
              } );
          }
          switch ( type ) {
          case 'text':
              this.setState( {
                  data: { ...this.state.data, [ name ]: value },
              } );
              break;
          case 'radio':
              if ( checked ) {
                  this.setState( {
                      data: { ...this.state.data, [ name ]: value },
                  } );
              }
              break;
          case 'checkbox':
              this.setState( { data: { ...this.state.data, [ name ]: checked },
              } );
              break;
          case 'email':
              this.setState( {
                  data: { ...this.state.data, [ name ]: value },
              } );
              break;
          case 'date':
              this.setState( {
                  data: { ...this.state.data, [ name ]: value },
              } );
              break;
          default:
              break;
          }

          switch (name) {
            case 'mobileNumber':
                if (type === 'text' && value.length === 10) {
                    this.setState({
                        data: { ...this.state.data, [name]: value },
                        mobileNumberError: '',
                    });
                } else {
                    this.setState({
                        mobileNumberError: 'Mobile number should be 10 digits',
                    });
                }
                break;
            default:
                break;
        }
    };
      

    handleSubmit = async( e ) => {
        e.preventDefault();
        const {
            updateAuth,
        } = this.props;

        try {
            /* eslint-disable */
console.log(this.state.data);
 /* eslint-enable */
            
            await axios.post( "http://localhost:3001/santarun/register", this.state.data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            } );
            updateAuth( {
                token: 'fake-token',
            } );
            this.props.history.push("/");
        } catch ( error ) {
            throw new Error;
        }
    };

    render() {
        const { data } = this.state;
        return (
            <Fragment>
                <>
                    <div className="App w-50 mx-auto">
                        <div className="block-example border border-gray border-1" style={ { padding: "2em", margin: "1em" } }>
                            <div className="text-center">
                                <img alt="" loading="lazy" style={ { textAlign: "center" } } src="https://reg.myraceindia.com/uploads/MRTS/form_files/regn%20banner.6530ed45e038e6.12464360.png" tabIndex="0" height="200px" width="680px" data-component="image" role="presentation" />
                            </div>
                            <h3 className="text-center mt-5">Registration Details</h3>
                            <hr />
           
                            <Form onSubmit={ this.handleSubmit }>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        { /* <label htmlFor="eventName">Select Event</label>
                                        <select
                                            id="eventName"
                                            className="form-control"
                                            name="eventName"
                                            
                                            onBlur={ this.formik.handleBlur }
                                            value={ this.formik.values.eventName }
                                            invalid={ this.formik.touched.eventName && this.formik.errors.eventName ? true : false }
                                        >
                                            <option value="">Select an event</option>
                                            { events.map( ( event ) => (
                                                <option key={ event.id } value={ event.eventName }>
                                                    { event.eventName }
                                                </option>
                                            ) ) }
                                        </select> */ }
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
  
                                        <p>Name <span className="text-danger">*</span></p>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <Input type="text" className="form-control" id="firstname" name="firstName" value={ data.firstName } onChange={ this.handleInputChange } />
                                  
                                        <label htmlFor="firstname" className="text-sm">First Name</label>
                                    </div>
                                    <div className="form-group col-md-6">
     
                                        <Input type="text"className="form-control" id="lastname" name="lastName" value={ data.lastName } onChange={ this.handleInputChange } />
                                     
                                        <label htmlFor="lastname" className="text-sm">Last Name</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                        <Input type="email"className="form-control" id="email" name="email" value={ data.email } onChange={ this.handleInputChange } />
                                   
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">Mobile Number <span className="text-danger">*</span></label>
                                        <Input type="text"
                                            className={ classnames('form-control', { 'is-invalid': this.state.mobileNumberError }) }
                                            id="mobilenumber" name="mobileNumber" 
                                            placeholder={ this.state.placeholder }
                                            onMouseEnter={ this.handleHover }
                                            onMouseLeave={ this.handleMouseOut }
                                            value={ data.mobileNumber }
                                            onChange={ this.handleInputChange }
                                        />
                                        { this.state.mobileNumberError ? (
                                            <div className="invalid-feedback">{ this.state.mobileNumberError }</div>
                                        ) : null }
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">Gender <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <Input type="radio" id="male" style={ { transform: "scale(1.5)", marginLeft: "0.1em" } }
                                            name="gender" 
                                            value="male"
                                            checked={ data.gender === "male" }
                                            onChange={ this.handleInputChange }
                                            required 
                                            
                                        />
                                        <label htmlFor="male" style={ { marginLeft: "2em" } }>Male</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Input type="radio" id="female" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="gender" 
                                            
                                            value="female"
                                            checked={ data.gender === "female" }
                                            onChange={ this.handleInputChange }
                                            required 
                                        />
                                            
                                        <label htmlFor="female" style={ { marginLeft: "2em" } }>Female</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateofbirth">Date of Birth <span className="text-danger">*</span></label>
                                        <Input type="date" className="form-control" id="dateofbirth" style={ { color: "gray" } } name="dateOfBirth"
                                            value={ data.dateOfBirth }
                                            onChange={ this.handleInputChange }
                                        />
                                   
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobilenumber">T-shirt Size <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="s" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="S"
                                            checked={ data.tShirtSize === "S" } 
                                            onChange={ this.handleInputChange }
                                            required 
                                        />
                                        <label htmlFor="s" style={ { marginLeft: "2em" } }>S</label>
                                    </div>
    
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="m" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="M" 
                                            checked={ data.tShirtSize === "M" }
                                            onChange={ this.handleInputChange } 
                                            required
                                        />
                                        <label htmlFor="m" style={ { marginLeft: "2em" } }>M</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="l" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="L"
                                            checked={ data.tShirtSize === "L" }
                                            onChange={ this.handleInputChange } 
                                            required 
                                        />
                                        <label htmlFor="l" style={ { marginLeft: "2em" } }>L</label>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="xl" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="XL" 
                                            checked={ data.tShirtSize === "XL" }
                                            onChange={ this.handleInputChange } 
                                            required
                                        />
                                        <label htmlFor="xl" style={ { marginLeft: "2em" } }>XL</label>
                                    
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Input type="radio" id="xxl" style={ { transform: 'scale(1.5)', marginLeft: "0.1em" } } name="tShirtSize" value="XXL" 
                                            checked={ data.tShirtSize === "XXL" }
                                            onChange={ this.handleInputChange } 
                                            required 
                                        />
                                        <label htmlFor="xxl" style={ { marginLeft: "2em" } }>XXL</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bib">Name of the bib <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="bib" name="nameOfTheBib"
                                            value={ data.nameOfTheBib }
                                            onChange={ this.handleInputChange }
                                            maxLength={ 16 }
                                            
                                        />
                                        <div className="form-group col-md-6"> 
                                        </div>
                                    </div>
                                   
                                    <div className="form-group col-md-6"> 
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bloodgroup">BloodGroup <span className="text-danger">*</span></label>
                                        { /* eslint-disable */ }
                                        <select id="bloodgroup" className="" name="bloodGroup" style={ { width: "100%", padding: "0.4em", borderRadius: "7px", outline: "none", border: "1px solid lightgray", color: "gray" } }
                                            value={ data.bloodGroup }
                                            onChange={ this.handleInputChange }
                                        >
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

                                       
                                        {/* eslint-enable */ }
                                        { /* <Input type="text" className="form-control" id="bloodgroup" name="bloodGroup"
                                            value={ data.bloodGroup }
                                            onChange={ this.handleInputChange }
                                            
                                        /> */ }
                                    </div>
                                    <div className="form-group col-md-6">
                                    </div>
 
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emergencycontactname">Emergency Contact Name <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="emergencycontactname" name="contactName" 
                                            
                                            value={ data.contactName }
                                            onChange={ this.handleInputChange }
                                        />
                                 
                                    </div>
                                    <div className="form-group col-md-6">
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emergencycontactnumber">Emergency Contact number <span className="text-danger">*</span></label>
                                        <Input type="text"className="form-control" id="emergencycontactnumber" name="contactNumber" 
                                            placeholder={ this.state.placeholder }
                                            onMouseEnter={ this.handleHover }
                                            onMouseLeave={ this.handleMouseOut }
                                            value={ data.contactNumber }
                                            onChange={ this.handleInputChange }
                                        />
                                  
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
                                        checked={ data.acceptedTerms }
                                        onChange={ this.handleInputChange }
                                        required
                                    />
                              
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
                                        <Link to="/event-page" className="btn btn-primary">Back</Link>
                                        <img width="80px" alt="" src="https://myraceindia.com/Live_API/assets/jotform/MRTS_Logo_with_Powered_by.png" />
                                        <button className="btn btn-primary" type="submit">Signup</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        
                    </div>
                </>
                { /* <div className="mt-20 text-grey-5">
                    Already have an account? <Link to="/sign-in" className="text-2">Sign In</Link>
                </div> */ }
            </Fragment>
        );
    }
}

const mapStateToProps = ({ auth, settings }) => ({
    auth,
    settings,
});
  
const mapDispatchToProps = {
    updateAuth: actionUpdateAuth,
};
  
// Connect withRouter to your component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content)
);
