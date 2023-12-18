import React from 'react';
import { Typography, Grid, Paper, Container } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const bookSalesData = {
  labels: ['Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Non-Fiction'],
  datasets: [
    {
      label: 'Books Sold',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [100, 150, 80, 120, 200],
    },
  ],
};

const monthlyRevenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Monthly Revenue',
      data: [1000, 1500, 1200, 1800, 2000, 1600, 2200],
      fill: false,
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
    },
  ],
};

const DashboardContent = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4">1200</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h4">800</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Revenue
            </Typography>
            <Typography variant="h4">$15,000</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Books Sold by Category
            </Typography>
            <Container>
              <Bar data={bookSalesData} />
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <Container>
              <Line data={monthlyRevenueData} />
            </Container>
          </Paper>
        </Grid>

        {/* Add more Grid items for additional widgets or charts */}
      </Grid>
    </div>
  );
};

export default DashboardContent;
