import {
  TypesLogged,
  TypesLoginData,
  baseURL,
  InstallData,
  TypesPerfilData,
} from "../types/types";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

type PerfData = {
  UserName: string;
  Adress: string;
  Instalations: number;
  PhoneNumber: string;
};

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

const getPerfData = async (UserId: number) => {
  try {
    const user = await axios.get(`${baseURL}/locations/get/${UserId}`);
    return await user.data;
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
    return error;
  }
};

export default function Perfil(
  props: TypesLogged & TypesLoginData & TypesPerfilData
) {
  const [data, setData] = useState<InstallData[] | []>([]);
  const [perfData, setPerfData] = useState<PerfData>({
    UserName: "",
    Adress: "",
    Instalations: 0,
    PhoneNumber: "",
  });

  useEffect(() => {
    getInstallationData(props.perfil.Id).then(function (result) {
      setData(result);
    });
    getPerfData(props.perfil.Id).then(function (result) {
      setPerfData(result);
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
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Perfil de {props.perfil.BusinessName}
            </Typography>
            <div>
              <p>{perfData.UserName}</p>
            </div>
            <div>
              <p>
                Endereço: {perfData.Adress} <br />
                Numero de instalações: {perfData.Instalations}
              </p>
            </div>
            <div>
              Clique{" "}
              <a
                href={`https://api.whatsapp.com/send?phone=${perfData.PhoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                aqui
              </a>{" "}
              para contatar agora
            </div>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/map">Voltar</Link>
                </Grid>
              </Grid>
              <div>
                <p className="my-instalation-title">Instalações</p>
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
