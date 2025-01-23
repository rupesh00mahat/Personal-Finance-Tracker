import {
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { PFTContext } from "../../store/store";
function Info({setDialogOpen, setTriggerFrom}) {
    const {dispatch, state} = useContext(PFTContext);
    const {incomeAmt, expenseAmt} = state;
    
  return (
    <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "600", fontSize: "20px", mb: 1 }}
        >
          Current Balance
        </Typography>
        <Typography>${parseInt(incomeAmt)-parseInt(expenseAmt)}</Typography>
        <Button
          onClick={() => {
          dispatch({type: 'RESET_BALANCE'})
          }}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset Balance
        </Button>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "600", fontSize: "20px", mb: 1 }}
        >
          Income
        </Typography>
        <Typography>${incomeAmt}</Typography>
        <Button
          onClick={() => {
            setDialogOpen(true);
            setTriggerFrom("income");
          }}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Income
        </Button>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "600", fontSize: "20px", mb: 1 }}
        >
          Expenses
        </Typography>
        <Typography>${expenseAmt}</Typography>{" "}
        <Button
          onClick={() => {
            setDialogOpen(true);
            setTriggerFrom("expense");
          }}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Expenses
        </Button>
      </Card>
    </Grid>
  </Grid>
  )
}

export default Info