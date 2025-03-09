import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../firebase/configuration";
import { signInWithEmailAndPassword } from "firebase/auth";
import { PFTContext } from "../../store/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const { dispatch } = useContext(PFTContext);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.username, data.password).then(
        (userCredentials) => {
          dispatch({
            type: "SET_USER_CREDENTIALS",
            payload: {
              userId: userCredentials.user.uid,
              email: userCredentials.user.email,
            },
          });
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Personal finance tracker - login: ", err.message);
    }
  };
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
        <Button
          fullWidth
          sx={{ mt: 2, p: 1 }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default Login;
