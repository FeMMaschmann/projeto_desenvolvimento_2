import {
  TypesLogged,
  TypesLoginData,
  baseURL,
  InstallData,
} from "../types/types";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const getInstallationData = async (UserId: number) => {
  try {
    const locations = await axios.get(`${baseURL}/installations/${UserId}`);
    return await locations.data;
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
    return error;
  }
};

export default function Installations(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<InstallData[] | []>([]);

  useEffect(() => {
    getInstallationData(props.loggedData.Id).then(function (result) {
      setData(result);
    });
  }, []);

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
              <UpgradeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Minhas instalações
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/account">Voltar</Link>
                </Grid>
              </Grid>
              <Link to="/newInstallation">
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  Registrar nova Instalação
                </Button>
              </Link>
              <div>
                {data.map((installation, index) => {
                  return (
                    <div className="my-card">
                      <h5>Cliente {installation.ClientName}</h5>
                      <p>
                        <strong>Veículo</strong>: {installation.Vehicle} <br />
                        {installation.Description ? (
                          <>
                            <strong>Descrição</strong>:{" "}
                            {installation.Description}
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                      <p className="small my-align-right">
                        <strong>Data</strong>: {installation.InstallationDate}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
