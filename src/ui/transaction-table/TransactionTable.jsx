import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { PFTContext } from "../../store/store";
import { sortByType } from "../../utils/sortByType";
import { convertToCSV } from "../../utils/convertToCSV";
import { downloadToCSV } from "../../utils/downloadCSV";

function createData(name, type, amount, date) {
  return { name, type, amount,date };
}

function TransactionTable({ filterKW, filterOpt, sortType, changeSortType }) {
  const [rows, setRows] = useState([]);
  const { state } = useContext(PFTContext);
  useEffect(() => {
    if (!state.income || !state.expenses) return;
    console.log("Does this run?");
    const transaction = [...state.income, ...state.expenses].map(
      ({ name, type, amount, date }) => {
        return createData(name, type, amount, date);
      }
    );
    setRows(transaction);
  }, [state]);
  const filteredRows = rows.filter((row) => {
    return filterKW !== ""
      ? row.name.includes(filterKW) &&
          (filterOpt == "all" || row.type == filterOpt)
      : filterOpt == "all" || row.type == filterOpt;
  });

  const sortedRows = sortByType(sortType,filteredRows);

 const exportToCSV = () =>{
  const convertedData = convertToCSV(sortedRows);
  downloadToCSV(convertedData);
 }

  return (
    <>
      {(state.income.length > 0 || state.expenses.length > 0) && (
        <Card sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={5} alignItems={"center"}>
            <Grid item xs={12} md={2}>
              <Typography variant="h4" sx={{ fontSize: "20px" }}>
                My Transaction
              </Typography>
            </Grid>
            <Grid item container xs={6}>
              {[
                { label: "Sort By Date", value: "date" },
                { label: "Sort By Amount", value: 'amount' },
                {label:"Sort By Alphabet", value: 'alphabet'},
              ].map(({label, value}, index) => {
                return (
                  <Grid key={value+index} item xs={12} md={4}>
                    <Button  onClick={()=>{changeSortType(value)}} fullWidth variant={value == sortType ? "contained" :"outlined"}>
                      {label}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={12} md={6}>
                <Button onClick={exportToCSV} fullWidth variant="contained">
                  Export CSV
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button fullWidth variant="contained">
                  Import CSV
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Amount&nbsp;(Rs)</TableCell>
                  <TableCell align="right">Date(AD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows &&
                  sortedRows.map((row) => {
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
}

export default TransactionTable;
