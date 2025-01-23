import { Card, Grid, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import React from 'react'

function LineChartWrapper() {
  const showChart = false;
  return (
    <Grid item xs={12} md={8}>
   { 
   showChart
   &&
   (
    <Card sx={{ p: 2 }}>
    <Typography variant="h2" sx={{ fontSize: "20px" }}>
      Financial Statistics
    </Typography>
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 9, 8] }]}
      series={[
        { 
          data: [2, 4, 6, 7, 8],
        },
      ]}
      width={750}
      height={350}
    ></LineChart>
  </Card>
   )}
  </Grid>
  )
}

export default LineChartWrapper