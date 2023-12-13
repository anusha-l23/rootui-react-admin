// import React, { Component } from 'react';
// import Chart from 'chart.js';
// import axios from 'axios';

// class Content extends Component {
//   state = {
//       users: [],
//       userRegistrations: {},
//   };

//   componentDidMount() {
//       this.getAllUsers();
//   }

//   getAllUsers = async() => {
//       {/* eslint-disable */}
//     try {
//       const response = await axios.get('http://localhost:3001/santarun/users');
//       const users = response.data;
//       this.setState({ users }, () => {
//         this.prepareChartData();
//       });
//     } catch (error) {
//       throw error;
//     }
//   };

//   prepareChartData = () => {
//     const { users } = this.state;
//     const userRegistrations = {};

//     users.forEach(user => {
//       const createdAt = new Date(user.createdAt).toDateString(); // Assuming createdAt is in UTC format
//       if (userRegistrations[createdAt]) {
//         userRegistrations[createdAt]++;
//       } else {
//         userRegistrations[createdAt] = 1;
//       }
//     });

//     this.setState({ userRegistrations }, () => {
//       this.renderChart();
//     });
//   };

//   renderChart = () => {
//     const { userRegistrations } = this.state;
//     const ctx = document.getElementById('registrationChart');

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: Object.keys(userRegistrations),
//         datasets: [
//           {
//             label: 'Number of Registrations',
//             data: Object.values(userRegistrations),
//             backgroundColor: 'rgba(94, 119, 255, 0.8)',
//             borderColor: 'rgba(94, 119, 255, 1)',
//             borderWidth: 1,
//             barThickness: 20,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'Date',
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Number of Registrations',
//             },
//             beginAtZero: true,
//           },
//         },
//         indexAxis: 'x', // Ensure horizontal bars
//         layout: {
//           padding: {
//             left: 10,
//             right: 10,
//             top: 10,
//             bottom: 10,
//           },
//         },
//         plugins: {
//           legend: {
//             display: true,
//           },
//         },
//         // Adjust these properties to reduce the gap between bars
//         barPercentage: 0, // Adjust bar width
//         categoryPercentage: 0.8, // Adjust gap between bars
//         barSpacing: 0,
//       },
//     });
//   };

//   render() {
//       {/* eslint-disable */}
//     return (
//       <div>
//         <canvas id="registrationChart" width="400" height="200"></canvas>
//       </div>
//     );
//     {/* eslint-enable */}
//   }
// }

// export default Content;
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
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
      /* eslint-disable */
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
      const createdAt = new Date(user.createdAt).toLocaleDateString(); // Convert date to a string (MM/DD/YYYY format)
      if (userRegistrations[createdAt]) {
        userRegistrations[createdAt]++;
      } else {
        userRegistrations[createdAt] = 1;
      }
    });

    this.setState({ userRegistrations });
  };

  render() {
    const { userRegistrations } = this.state;

    const data = {
      labels: Object.keys(userRegistrations),
      datasets: [
        {
          label: 'Number of Registrations',
          data: Object.values(userRegistrations),
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

    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default Content;
