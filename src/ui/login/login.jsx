import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import cong from "../../firebase/configuration";
import { getDatabase, ref, onValue } from "firebase/database";

function Login() {

    useEffect(()=>{
        const database = getDatabase(cong);
        const collectionRef = ref(database,'your_collection');

        const fetchData = () =>{
            onValue(collectionRef, (snapshot)=>{
                console.log('snapshot', snapshot);
                const dataItem = snapshot.val();
                if(dataItem){
                    const displayItem = Object.values(dataItem);
                    console.log(displayItem);
                }
            })
        }
fetchData();
    },[])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <Card sx={{ p: 2, width: "50%", m: "5rem auto", textAlign: "center" }}>
      <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
        Login Page
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{ required: "User name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="User Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />
        <Button fullWidth sx={{mt:2,p:1}} variant="contained" type="submit">Submit</Button>
      </form>
    </Card>
  );
}

export default Login;
