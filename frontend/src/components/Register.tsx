import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import {
  baseURL,
  RegisterData,
  TypesLogged,
  TypesLoginData,
} from "../types/types";
import { Link } from "react-router-dom";
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

const registerUser = async (data: RegisterData) => {
  console.log(data);
  try {
    await axios.post("users/test", data, {
      baseURL: baseURL,
    });
    alert("Cadastro efetuado com sucesso!");
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
  }
};

const isRegisterDataValid = (RegisterData: RegisterData) => {
  if (RegisterData.firstName.length < 2) return false;
  if (RegisterData.lastName.length < 2) return false;
  if (RegisterData.email.length < 2) return false;
  if (RegisterData.password.length < 3) return false;
  if (RegisterData.passwordConfirm.length < 3) return false;
  if (RegisterData.password !== RegisterData.passwordConfirm) return false;
  return true;
};

const theme = createTheme();

export default function Register(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
              Registrar
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nome"
                    autoFocus
                    onChange={(e) => {
                      setData({
                        ...data,
                        firstName: e.target.value,
                      });
                    }}
                    value={data.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Sobrenome"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setData({
                        ...data,
                        lastName: e.target.value,
                      });
                    }}
                    value={data.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Endereço de E-mail"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                    value={data.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                    value={data.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confpassword"
                    label="Repita sua Senha"
                    type="password"
                    id="confpassword"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        passwordConfirm: e.target.value,
                      });
                    }}
                    value={data.passwordConfirm}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!canSend}
                onClick={() => {
                  registerUser(data);
                }}
              >
                Registrar
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Já possui uma conta? Faça o login</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
