import { Card, Grid, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React, { useContext, useEffect, useState } from "react";
import { PFTContext } from "../../store/store";

function BarGraph() {
  const [barData, setBarData] = useState([]);
  const { state } = useContext(PFTContext);
  useEffect(() => {
    if(state.incomeAmt > 0 || state.expenseAmt > 0){
      setBarData([
        { id: 0, value: state.incomeAmt, label: "Income" },
        { id: 1, value: state.expenseAmt, label: "Expense" },
      ]);
    }
  }, [state]);
  return (
    <Grid item xs={12} md={4}>
      {barData.length > 0 && (
        <Card sx={{ p: 2 }}>
          {" "}
          <Typography variant="h2" sx={{ fontSize: "20px" }}>
            Financial Statistics
          </Typography>
          <PieChart
            series={[
              {
                data: barData,
              },
            ]}
            width={400}
            height={350}
          />
        </Card>
      )}
    </Grid>
  );
}

export default BarGraph;
