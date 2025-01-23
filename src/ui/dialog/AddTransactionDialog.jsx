import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { PFTContext } from "../../store/store";

function AddTransactionDialog({handleClose, openDialog, triggeredFrom}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm({
        defaultValues: {
          name: "",
          amount: 0,
        },
      });
    const {dispatch} = useContext(PFTContext);
      const onSubmit = (data) => {
        dispatch({
          type: triggeredFrom == "income" ? "ADD_INCOME" : "ADD_EXPENSE",
          payload: { ...data, type: triggeredFrom },
        });
        setValue("name", "");
        setValue("amount", 0);
      };
  return (
    <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle> Add new Task</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Transaction Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Transaction Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />
              <Controller
                name="amount"
                control={control}
                rules={{ required: "Transaction Amount is required" }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    {...field}
                    label="Transaction Amount"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.amount}
                    helperText={errors.amount ? errors.amount.message : ""}
                  />
                )}
              />
              <Grid sx={{ mt: 1 }} container spacing={3}>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth type="submit">
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth onClick={handleClose}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
  )
}

export default AddTransactionDialog