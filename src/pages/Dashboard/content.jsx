// /**
//  * External Dependencies
//  */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
//import { Row, Col } from 'reactstrap';
import axios from "axios";
import { Table, Container, Row, Col } from 'reactstrap';

/**
 * Internal Dependencies
 */
// import Carousel from './components/carousel';
// import WidgetMemory from './components/widget-memory';
// import WidgetDisc from './components/widget-disc';
// import WidgetCPU from './components/widget-cpu';
// import WidgetTasks from './components/widget-tasks';
// import WidgetUploads from './components/widget-uploads';
// import WidgetActivity from './components/widget-activity';
// import Map from './components/map';
// import WidgetCountries from './components/widget-countries';

class Content extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            users: [],
            selectedGender: "",
            selectedSize: "",
            selectedAgeRange: "",
            selectedEventName: "",
            events: [],
        };
        this.getChartjsOptions = this.getChartjsOptions.bind( this );
        this.getChartjsData = this.getChartjsData.bind( this );
        this.getChartistOptions = this.getChartistOptions.bind( this );
    }

    getChartjsOptions( label ) {
        return {
            tooltips: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#393f49',
                bodyFontSize: 11,
                bodyFontColor: '#d7d9e0',
                bodyFontFamily: "'Open Sans', sans-serif",
                xPadding: 10,
                yPadding: 10,
                displayColors: false,
                caretPadding: 5,
                cornerRadius: 4,
                callbacks: {
                    title: () => {},
                    label,
                },
            },
            legend: {
                display: false,
            },
            maintainAspectRatio: true,
            spanGaps: false,
            plugins: {
                filler: {
                    propagate: false,
                },
            },
            scales: {
                xAxes: [ { display: false } ],
                yAxes: [ {
                    display: false,
                    ticks: {
                        beginAtZero: true,
                    },
                } ],
            },
        };
    }

    getChartjsData( canvas, data, color = '#8e9fff' ) {
        const ctx = canvas.getContext( '2d' );
        const gradient = ctx.createLinearGradient( 0, 0, 0, 90 );
        gradient.addColorStop( 0, Chart.helpers.color( color ).alpha( 0.1 ).rgbString() );
        gradient.addColorStop( 1, Chart.helpers.color( color ).alpha( 0 ).rgbString() );

        return {
            labels: data,
            datasets: [
                {
                    backgroundColor: gradient,
                    borderColor: color,
                    borderWidth: 2,
                    pointHitRadius: 5,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBorderWidth: 0,
                    pointHoverBackgroundColor: color,
                    data,
                },
            ],
        };
    }

    getChartistOptions() {
        return {
            type: 'Pie',
            options: {
                donut: true,
                showLabel: false,
                donutWidth: 4,
                width: 150,
                height: 150,
            },
            listener: {
                created( ctx ) {
                    const defs = ctx.svg.elem( 'defs' );
                    defs.elem( 'linearGradient', {
                        id: 'gradient',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0,
                    } ).elem( 'stop', {
                        offset: 0,
                        'stop-color': '#8e9fff',
                    } ).parent().elem( 'stop', {
                        offset: 1,
                        'stop-color': '#2bb7ef',
                    } );
                },
            },
        };
    }
    /**
 * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object.
 */
handleGenderChange = ( e ) => {
    this.setState( { selectedGender: e.target.value } );
}

handleSizeChange = ( e ) => {
    this.setState({ selectedSize: e.target.value } );
}
handleAgeRangeChange = (e) => {
    const selectedAgeRange = e.target.value;
    this.setState({ selectedAgeRange });
    /* eslint-disable */
console.log(selectedAgeRange, "select age range");
/* eslint-enable */
}
handleEventNameChange =(e)=> {
    this.setState({ selectedEventName: e.target.value });
}

componentDidMount() {
    this.fetchEvents();
}
fetchEvents = async() => {
    try {
        const response = await axios.get("http://localhost:3001/santarun/events");
        this.setState({ events: response.data });
        /* eslint-disable */
        console.log(this.state.events, "events");
        /* eslint-enable */
    } catch (error) {
        throw error;
    }
}

getAllUsers = async() => {
    try {
        const response = await axios.get("http://localhost:3001/santarun/users");
        const users = response.data; 
        this.setState( { users } );
/* eslint-disable */
console.log(users, "users");
 /* eslint-enable */
    } catch (error) {
        throw error;
    }
}
calculateAge = (dateOfBirth)=> {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
ageRanges = [
    { label: '0-10', minAge: 0, maxAge: 10 },
    { label: '11-20', minAge: 11, maxAge: 20 },
    { label: '21-30', minAge: 21, maxAge: 30 },
    { label: '31-40', minAge: 31, maxAge: 40 },
    { label: '41-50', minAge: 41, maxAge: 50 },
]

render() {
    { /* eslint-disable */}
 
    const displayUsers = this.state.users.filter(( user ) => {
        const genderCondition = this.state.selectedGender === "" || user.gender.toLowerCase() === this.state.selectedGender.toLowerCase();
        const sizeCondition = this.state.selectedSize === "" || user.tShirtSize.toLowerCase() === this.state.selectedSize.toLowerCase();
        const age = this.calculateAge(user.dateOfBirth);
        
        const ageCondition = this.state.selectedAgeRange === "" || this.ageRanges.some((range) => {
            if (range.label === this.state.selectedAgeRange) {
                const isInRange = age >= range.minAge && age <= range.maxAge; 
                
                console.log(range.label, isInRange, "isIn range");
                
                return isInRange;
            }
            return false;
        });
        const eventIdToName = {};
        this.state.events.forEach((event) => {
            eventIdToName[event.id] = event.eventName;
        });
    const userEventId = user.eventId;
console.log(user.eventId, "user.eventId")
        const userEventName = eventIdToName[userEventId];

        console.log(userEventName, "userEventName")
        const eventNameCondition = this.state.selectedEventName === "" || (userEventName && userEventName.toLowerCase() === this.state.selectedEventName.toLowerCase());

     return genderCondition && sizeCondition && ageCondition && eventNameCondition;
    });
    
    console.log(displayUsers.map(user => this.calculateAge(user.dateOfBirth)), "ages");
    { /* eslint-enable */}
    return (
        <Fragment>
            <div>
                { /* eslint-disable */}
                <Container>
      <Row>
        <Col>
                <button onClick={this.getAllUsers} style={{border: "1px solid", padding:"0.5em"}}>Get all users</button>
                </Col>

<Col>                <select style={{padding: "0.5em"}}
                        value={this.state.selectedGender}
                        onChange={this.handleGenderChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
        </Col>
        <Col>
        <select style={{padding: "0.5em"}}
        value={this.state.selectedSize}
        onChange={this.handleSizeChange}
        >
<option value="">Select T-Shirt Size</option>
<option value="S">S</option>
<option value="M">M</option>
<option value="L">L</option>
<option value="XL">XL</option>
<option value="XXL">XXL</option>
        </select>
        </Col>
        <Col>
        <select
    style={{ padding: "0.5em" }}
    value={this.state.selectedAgeRange}
    onChange={this.handleAgeRangeChange}
>
    <option value="">Select Age Range</option>
    {this.ageRanges.map((range) => (
        <option key={range.label} value={range.label}>
            {range.label}
        </option>
    ))}
</select>
        </Col>
        <Col>
        <select style={{padding: "0.5em"}}
        value={this.state.selectedEventName}
        onChange={this.handleEventNameChange}
        >
<option value="">Select Event Name</option>
<option value="5K Run - SANTA RUN">5K Run - SANTA RUN</option>
<option value="10K Run - SANTA RUN">10K Run - SANTA RUN</option>
<option value="21.1K RUN - SANTA RUN">21.1K RUN - SANTA RUN</option>
<option value="50K CYCLING">50K CYCLING</option>
        </select>
        </Col>
                  </Row>
                  </Container>
                  {this.state.users.length > 0 && (
            <Table responsive style={{marginTop:"1em"}}>
           
                <thead>
                    <tr>
                      <th scope="col">#</th> 
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile Number</th>
                    <th scope="col">Gender</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">T-Shirt Size</th>
                        
                        <th scope="col">Name on the Bib</th>
                        
                        <th scope="col">Blood Group</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Terms & Conditions</th>
                        <th scope="col">Event Id</th>
                        
                    </tr>
                </thead>
                <tbody>
            {/* { this.state.users.map((user, index) => (
                    <tr>
                         <td>{ user.id }</td> 
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.mobileNumber}</td>
                        <td>{user.gender}</td>
                        <td>{user.dateOfBirth}</td>
                        <td>{user.tShirtSize}</td>
                        <td>{user.nameOfTheBib}</td>
                        <td>{user.bloodGroup}</td>
                        <td>{user.contactName}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.acceptedTerms ? 'True' : 'False'}</td>
                        <td>{user.eventId}</td>
                        
                    </tr>
    ) ) } */}
{ displayUsers.map((user, index) => (
               
 
        <tr key={user.id}>
             <td>{ user.id }</td> 
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.mobileNumber}</td>
            <td>{user.gender}</td>
            <td>{user.dateOfBirth}</td>
            <td>{user.tShirtSize}</td>
            <td>{user.nameOfTheBib}</td>
            <td>{user.bloodGroup}</td>
            <td>{user.contactName}</td>
            <td>{user.contactNumber}</td>
            <td>{user.acceptedTerms ? 'True' : 'False'}</td>
            <td>{user.eventId}</td>
            </tr>
) ) }
            
    
           </tbody>
            </Table>
                  )}

            { /* eslint-enable */ }
            </div>
        </Fragment>
    );
}
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
