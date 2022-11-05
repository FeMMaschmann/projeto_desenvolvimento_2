import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import {
  baseURL,
  InstallData,
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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const insertInstallation = async (data: InstallData, Id: number) => {
  try {
    const sendData = {
      UserId: Id,
      Description: data.Description,
      ClientName: data.ClientName,
      Vehicle: data.Vehicle,
    };
    await axios.post(`/installations/`, sendData, {
      baseURL: baseURL,
    });
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
  }
};

const isRegisterDataValid = (data: InstallData) => {
  if (data.ClientName.length < 2) return false;
  if (data.Vehicle.length < 2) return false;
  if (data.Description.length < 0) return false;
  return true;
};

const theme = createTheme();

export default function NewInstallation(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<InstallData>({
    InstallationDate: undefined,
    ClientName: "",
    Vehicle: "",
    Description: "",
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
              <AddBusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Alterar dados
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="clientName"
                    label="Nome do cliente"
                    name="clientName"
                    onChange={(e) => {
                      setData({
                        ...data,
                        ClientName: e.target.value,
                      });
                    }}
                    value={data.ClientName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="vehicle"
                    label="Veículo"
                    name="vehicle"
                    onChange={(e) => {
                      setData({
                        ...data,
                        Vehicle: e.target.value,
                      });
                    }}
                    value={data.Vehicle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="desc"
                    label="Descrição"
                    name="desc"
                    onChange={(e) => {
                      setData({
                        ...data,
                        Description: e.target.value,
                      });
                    }}
                    value={data.Description}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!canSend}
                onClick={() => {
                  insertInstallation(data, props.loggedData.Id);
                  alert("Cadastro feito com sucesso");
                  navigate("../Installations");
                }}
              >
                Alterar
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/installations">Voltar</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
