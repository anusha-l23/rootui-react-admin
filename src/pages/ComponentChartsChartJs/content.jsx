import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class Content extends Component {
  state = {
      users: [],
      userRegistrations: {},
  };

  componentDidMount() {
      this.getAllUsers();
  }

  getAllUsers = async() => {
      {/* eslint-disable */}
    try {
      const response = await axios.get('http://localhost:3001/santarun/users');
      const users = response.data;
      this.setState({ users }, () => {
        this.prepareChartData();
      });
    } catch (error) {
      throw error;
    }
  };

  prepareChartData = () => {
    const { users } = this.state;
    const userRegistrations = {};

    users.forEach(user => {
      const createdAt = new Date(user.createdAt).toDateString(); // Assuming createdAt is in UTC format
      if (userRegistrations[createdAt]) {
        userRegistrations[createdAt]++;
      } else {
        userRegistrations[createdAt] = 1;
      }
    });

    this.setState({ userRegistrations }, () => {
      this.renderChart();
    });
  };

  renderChart = () => {
    const { userRegistrations } = this.state;
    const ctx = document.getElementById('registrationChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(userRegistrations),
        datasets: [
          {
            label: 'Number of Registrations',
            data: Object.values(userRegistrations),
            backgroundColor: 'rgba(94, 119, 255, 0.8)',
            borderColor: 'rgba(94, 119, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
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
      },
    });
  };

  render() {
      {/* eslint-disable */}
    return (
      <div>
        <canvas id="registrationChart" width="400" height="200"></canvas>
      </div>
    );
    {/* eslint-enable */}
  }
}

export default Content;
