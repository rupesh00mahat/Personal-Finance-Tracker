import { Search } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useRef } from "react";
import { PFTContext } from "../../store/store";

function SearchAndFilter({setFilterKW, setFilterOpt, filterKW, filterOpt}) {
  const {state} = useContext(PFTContext);
  const sortRef = useRef();
  
  return (
    <Grid container spacing={6} sx={{ mt: 2 }}>
    {(state.income.length > 0 ||state.expenses.length > 0) && (
      <>
    <Grid item xs={12} md={9}>
    <TextField
        label='Sort By'
        placeholder="Sort By"
          fullWidth
          value={filterKW}
          onChange={(e, value)=>{setFilterKW(e.target.value)}}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton >
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
          value={filterOpt}
          onChange={(e) => {
            setFilterOpt(e.target.value);
          }}
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
