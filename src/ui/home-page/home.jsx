import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Info from "../info/info";
import LineChartWrapper from "../line-chart/LineChart";
import BarGraph from "../bar-graph/bar-graph";
import SearchAndFilter from "../search-and-filter/SearchAndFilter";
import TransactionTable from "../transaction-table/TransactionTable";
import AddTransactionDialog from "../dialog/AddTransactionDialog";
import { PFTContext } from "../../store/store";
import {  doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/configuration";

function Home() {
  const [openDialog, setDialogOpen] = useState(false);
  const [triggeredFrom, setTriggerFrom] = useState("");
  const [filterKW, setFilterKW] = useState("");
  const [filterOpt, setFilterOpt] = useState("all");
  const {state} = useContext(PFTContext);
  const {userId} = state
  const {dispatch} = useContext(PFTContext);

    useEffect(()=>{
        const fetchTransaction = async () =>{
           try{
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);
            if(userDocSnap.exists()){
                dispatch({type:'INITIATE_DATA', payload:{income: userDocSnap?.data()?.transactions?.income, expense: userDocSnap?.data()?.transactions?.expenses}});
              return {id: userDocSnap.id, ...userDocSnap.data()};
            }else{
              console.log('No such document!');
              return null;
            }
           }catch(error){
              console.error("Error fetching user document:", error);
              return null;
           }
        }
        fetchTransaction();
    },[userId])

    const handleClose = () =>{
        setDialogOpen(false);
    }

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Info setDialogOpen={setDialogOpen} setTriggerFrom={setTriggerFrom} />
        <Grid container sx={{ mt: 2 }} spacing={2}>
          <LineChartWrapper />
          <BarGraph />
        </Grid>
        <SearchAndFilter
          filterKW={filterKW}
          filterOpt={filterOpt}
          setFilterKW={setFilterKW}
          setFilterOpt={setFilterOpt}
        />
        <TransactionTable filterKW={filterKW} filterOpt={filterOpt} />
      </Container>
      <AddTransactionDialog
        handleClose={handleClose}
        openDialog={openDialog}
        triggeredFrom={triggeredFrom}
      />
    </>
  );
}

export default Home;
