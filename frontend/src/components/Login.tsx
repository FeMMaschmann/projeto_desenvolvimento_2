import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import {
  baseURL,
  LoginData,
  TypesLogged,
  TypesLoginData,
} from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const loginUser = async (data: LoginData) => {
  try {
    const user = await axios.post("users/login", data, {
      baseURL: baseURL,
    });
    return user.data[0];
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
  }
};

const isRegisterDataValid = (LoginData: LoginData) => {
  if (LoginData.email.length < 2) return false;
  if (LoginData.password.length < 3) return false;
  return true;
};

const theme = createTheme();

export default function Login(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const canSend = isRegisterDataValid(data);

  return (
    <>
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              className="my-icon-back"
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
                value={data.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
                value={data.password}
                placeholder="Digite sua senha"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!canSend}
                onClick={() => {
                  loginUser(data).then(function (result) {
                    props.setLoggedData(result);
                    props.setIsLogged(true);
                  });
                  console.log(props.loggedData);
                  navigate("../Map");
                }}
              >
                Logar
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register">
                    {"Ainda não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
