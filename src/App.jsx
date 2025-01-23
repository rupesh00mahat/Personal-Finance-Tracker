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

function App() {
  const [openDialog, setDialogOpen] = useState(false);
  const [triggeredFrom, setTriggerFrom] = useState("");
  

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];



  return (
    <>
      <PFTContextProvider>
        <Container sx={{ mt: 5 }}>
          <Info setDialogOpen={setDialogOpen} setTriggerFrom={setTriggerFrom}/>
          <Grid container sx={{ mt: 2 }} spacing={2}>
           <LineChartWrapper/>
          <BarGraph/>
          </Grid>
      <SearchAndFilter/>
         <TransactionTable rows={rows}/>
        </Container>
        <AddTransactionDialog handleClose={handleClose} openDialog={openDialog} triggeredFrom={triggeredFrom}/>
      </PFTContextProvider>
    </>
  );
}

export default App;
