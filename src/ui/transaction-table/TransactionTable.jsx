import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { PFTContext } from '../../store/store';

function createData(name, type, amount) {
  return { name,type, amount};
}

function TransactionTable() {
  const [rows, setRows] = useState([]);
  const {state} = useContext(PFTContext);
  console.log(state);

  useEffect(()=>{
    let income = state.income && state.income.map(({name, type, amount})=> {return createData(name, type, amount)})
    let expense = state.expenses && state.expenses.map(({name, type, amount})=> {return createData(name, type, amount)})
    setRows([...income, ...expense])
  },[state])

  return (
  <>
  {(state.income.length > 0 || state.expenses.length > 0) && (
      <Card sx={{ p: 2, mt: 2 }}>
      <Grid container spacing={5} alignItems={'center'}>
      <Grid item xs={12} md={2}>
      <Typography variant="h4" sx={{ fontSize: "20px" }}>
            My Transaction
          </Typography>
        </Grid>
        <Grid item container xs={6}>
        <Grid item xs={12} md={4}>
        <Button fullWidth variant="outlined">No Sort</Button>
          </Grid>
          <Grid item xs={12} md={4}>
          <Button fullWidth variant="outlined">No Sort</Button>{" "}
          </Grid>
          <Grid item xs={12} md={4}>
          <Button fullWidth variant="outlined">No Sort</Button>{" "}
          </Grid>
        </Grid>
        <Grid item container xs={4} spacing={2}>
        <Grid item xs={12} md={6}>
        <Button fullWidth variant="contained">Export CSV</Button>
          </Grid>
          <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained">Import CSV</Button>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Amount&nbsp;(Rs)</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )}
  </>
  )
}

export default TransactionTable