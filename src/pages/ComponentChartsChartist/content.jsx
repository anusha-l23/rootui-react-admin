/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Chartist from 'react-chartist';
import { Bar, Pie } from 'react-chartjs-2';
import axios from "axios";
/**
 * Internal Dependencies
 */
//import Snippet from '../../components/snippet';

/**
 * Component
 */
class Content extends Component {
state = {
    users: [],
    userRegistrations: {},
    genderDistribution: {},
    sizeDistribution: {},
};
  
componentDidMount() {
    this.getAllUsers();
}
  
    getAllUsers = async() => {
        /* eslint-disable */
      try {
        const response = await axios.get('http://localhost:3001/santarun/users');
        const users = response.data;
        this.setState({ users }, () => {
          this.prepareChartData();
          this.prepareGenderData();
          this.prepareSizeData();
        });
      } catch (error) {
        throw error;
      }
    };
  
    prepareChartData = () => {
      const { users } = this.state;
      const userRegistrations = {};
  
      users.forEach(user => {
        const createdAt = new Date(user.createdAt).toLocaleDateString(); // Convert date to a string (MM/DD/YYYY format)
        if (userRegistrations[createdAt]) {
          userRegistrations[createdAt]++;
        } else {
          userRegistrations[createdAt] = 1;
        }
      });
  
      this.setState({ userRegistrations });
    };
  prepareGenderData = () =>{
    const {users} = this.state;
    const genderDistribution = {};
    users.forEach(user => {
        const gender = user.gender;
        if(genderDistribution[gender]){
            genderDistribution[gender]++;
        } 
        else{
            genderDistribution[gender]=1;
        }
    })
    this.setState({ genderDistribution });
  }
  prepareSizeData = () => {
    const { users } = this.state;
    const sizeDistribution = {};
users.forEach(user=> {
    const size = user.tShirtSize;
    if(sizeDistribution[size])
    {
        sizeDistribution[size]++;
    }
    else{
        sizeDistribution[size] = 1;
    }
    this.setState({ sizeDistribution });
})
  }
    render() {
      const { userRegistrations, genderDistribution, sizeDistribution } = this.state;
      const sortedDates = Object.keys(userRegistrations).sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA - dateB;
      });
      const data = {
        labels:sortedDates,
        datasets: [
          {
            label: 'Number of Registrations',
            data: sortedDates.map(date => userRegistrations[date]),
            backgroundColor: 'rgba(94, 119, 255, 0.8)',
            borderColor: 'rgba(94, 119, 255, 1)',
            borderWidth: 1,
            barThickness: 20
          },
        ],
      };
  
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Registrations',
            },
            beginAtZero: true,
          },
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      }; 
      
  
      const genderData = {
        labels: Object.keys(genderDistribution),
        datasets: [
          {
            label: 'Gender Distribution',
            data: Object.values(genderDistribution),
            backgroundColor: ['rgba(94, 119, 255, 0.8)', 'rgba(94, 119, 255, 0.5)'],
            borderColor: ['rgba(94, 119, 255, 1)', 'rgba(94, 119, 255, 0.5'],
            borderWidth: 1,
          },
        ],
      };
      const sizeOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      };
      const sizeData = {
        labels: Object.keys(sizeDistribution),
        datasets: [
          {
            label: 'Gender Distribution',
            data: Object.values(sizeDistribution),
            backgroundColor: ['rgba(135,206,235)', 'rgba(94, 119, 255, 0.8)', 'rgba(70,130,180)', 'rgba(0,191,255)', 'rgba(127,255,212)'],
            borderColor: ['rgba(135,206,250)', '', 'rgba(94, 119, 255, 1)', 'rgba(100,149,237)', 'rgba(30,144,255)', "rgba(176,224,230)"],
            borderWidth: 1,
          },
        ],
      };
      const genderOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      };
        return (
            <div style={{ width: "70%"}}>
                <h2 id="chartBar">Bar</h2>
                
 <Bar data={data} options={options} />

                <div className="rui-gap-4" id="pieGender"></div>
                <h2>Pie_Gender</h2>
                
 <Pie data={genderData} options={genderOptions} />

                <div className="rui-gap-4" id="pieSize"></div>
                <h2>Pie_T-Shirt size</h2>
                <Pie data={sizeData} options={sizeData} />
            </div>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
