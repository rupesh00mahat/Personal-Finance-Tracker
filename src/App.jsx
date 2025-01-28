import { useState } from "react";
import "./App.css";
import {
  Container,
  Grid,
} from "@mui/material";
import PFTContextProvider from "./store/store";
import Info from "./ui/info/info";
import LineChartWrapper from "./ui/line-chart/LineChart";
import BarGraph from "./ui/bar-graph/bar-graph";
import SearchAndFilter from "./ui/search-and-filter/SearchAndFilter";
import TransactionTable from "./ui/transaction-table/TransactionTable";
import AddTransactionDialog from "./ui/dialog/AddTransactionDialog";
import Login from "./ui/login/login";

function App() {
  const [openDialog, setDialogOpen] = useState(false);
  const [triggeredFrom, setTriggerFrom] = useState("");
  const [filterKW, setFilterKW] = useState('');
  const [filterOpt, setFilterOpt] = useState('all');
  
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* <PFTContextProvider>
        <Container sx={{ mt: 5 }}>
          <Info setDialogOpen={setDialogOpen} setTriggerFrom={setTriggerFrom}/>
          <Grid container sx={{ mt: 2 }} spacing={2}>
           <LineChartWrapper/>
          <BarGraph/>
          </Grid>
      <SearchAndFilter filterKW={filterKW} filterOpt={filterOpt} setFilterKW={setFilterKW} setFilterOpt={setFilterOpt}/>
         <TransactionTable filterKW={filterKW} filterOpt={filterOpt}/>
        </Container>
        <AddTransactionDialog handleClose={handleClose} openDialog={openDialog} triggeredFrom={triggeredFrom}/>
      </PFTContextProvider> */}
      <Login/>
    </>
  );
}

export default App;
