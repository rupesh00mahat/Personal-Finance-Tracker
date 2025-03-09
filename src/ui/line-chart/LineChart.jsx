import { Card, Grid, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import React, { useContext, useEffect, useState } from 'react'
import { PFTContext } from '../../store/store';
import dayjs from 'dayjs';

function LineChartWrapper() {
  const showChart = true;
  const {state} = useContext(PFTContext);
  const [sortedArray, setSortedArray] = useState([]);
  const [sortedAmt, setSortedAmt] = useState([]);

  useEffect(()=>{
    const newData = [...state.income,...state.expenses ];
    const sortedData = newData.sort((a,b)=> new Date(a.date) - new Date(b.date));
    const sortedDate = sortedData.map((item)=> new Date(item.date));
    setSortedArray(sortedDate);
    let newSortedAmt = [];
    let tempSortedAmt = 0;
    sortedData.forEach(item => {
        if(item.type === 'income'){
          tempSortedAmt += parseInt(item.amount);
        }else{
          tempSortedAmt -= parseInt(item.amount)
        }
        newSortedAmt.push(tempSortedAmt);
    })
    setSortedAmt(newSortedAmt);
  },[state])


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
      xAxis={[{label: 'Date', data: sortedArray, tickInterval:sortedArray,scaleType: 'time', valueFormatter: (date)=>dayjs(date).format("MMM D")}]}
      series={[
        { 
          data: sortedAmt,
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