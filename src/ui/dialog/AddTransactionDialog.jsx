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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

function AddTransactionDialog({ handleClose, openDialog, triggeredFrom }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      amount: 0,
      date: null,
    },
  });
  const { dispatch } = useContext(PFTContext);
  const onSubmit = (data) => {
    const newId = uuid();
    const formattedDate = dayjs(data.date).format('YYYY-MM-DD');

    dispatch({
      type: triggeredFrom == "income" ? "ADD_INCOME" : "ADD_EXPENSE",
      payload: { ...data, amount: parseInt(data.amount),date: formattedDate, type: triggeredFrom, id: newId },
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
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Controller
          control={control}
          name="date"
          rules={{required: true}}
          render={({field})=> {
            return <DatePicker
            label="Date"
            value={field.value}
            inputRef={field.ref}
            onChange={(date)=> {field.onChange(date)}}
            />
          }}
          />
         </LocalizationProvider>
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
  );
}

export default AddTransactionDialog;
