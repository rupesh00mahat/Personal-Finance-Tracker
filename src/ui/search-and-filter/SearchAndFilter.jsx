import { Search } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { PFTContext } from "../../store/store";

function SearchAndFilter() {
  const {state} = useContext(PFTContext);
  
  return (
    <Grid container spacing={6} sx={{ mt: 2 }}>
    {(state.income.length > 0 ||state.expenses.length > 0) && (
      <>
    <Grid item xs={12} md={9}>
    <TextField
        label='Sort By'
        placeholder="Sort By"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => {}}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
      <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort By"
          onChange={() => {}}
        >
          <MenuItem value={"income"}>Income</MenuItem>
          <MenuItem value={"expenses"}>Expenses</MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </Grid>
      </>
    )}
    </Grid>
  );
}

export default SearchAndFilter;
