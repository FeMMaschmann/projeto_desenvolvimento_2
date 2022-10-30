import Menu from "./Menu";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  baseURL,
  AdressData,
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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const updateAdress = async (data: AdressData) => {
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

const isRegisterDataValid = (data: AdressData) => {
  if (data.ZipCode.length < 2) return false;
  if (data.Street.length < 2) return false;
  if (data.AdressNumber.length < 0) return false;
  if (data.District.length < 1) return false;
  if (data.City.length < 1) return false;
  if (data.State.length < 0) return false;
  if (data.BusinessName.length < 0) return false;
  return true;
};

const getBdData = async (userId: number) => {
  try {
    const adress = await axios.get(`${baseURL}/locations/${userId}`);
    return await adress.data;
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
    return error;
  }
};

const theme = createTheme();

export default function AccAdress(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<AdressData>({
    ZipCode: "",
    Street: "",
    AdressNumber: "",
    AdressComplement: "",
    District: "",
    City: "",
    State: "",
    BusinessName: props.loggedData.BusinessName,
  });

  useEffect(() => {
    getBdData(props.loggedData.Id).then(function (result) {
      setData({
        ...data,
        ZipCode: result.ZipCode,
        Street: result.Street,
        AdressNumber: result.AdressNumber,
        AdressComplement:
          result.AdressComplement === null ? "" : result.AdressComplement,
        District: result.District,
        City: result.City,
        State: result.State,
      });
    });
  }, []);

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
                    id="businessName"
                    label="Nome do negócio"
                    name="businessName"
                    onChange={(e) => {
                      setData({
                        ...data,
                        BusinessName: e.target.value,
                      });
                    }}
                    value={data.BusinessName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="zipCode"
                    required
                    fullWidth
                    id="zipCode"
                    label="CEP"
                    onChange={(e) => {
                      setData({
                        ...data,
                        ZipCode: e.target.value,
                      });
                    }}
                    value={data.ZipCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="adressNumber"
                    label="Numero"
                    name="adressNumber"
                    onChange={(e) => {
                      setData({
                        ...data,
                        AdressNumber: e.target.value,
                      });
                    }}
                    value={data.AdressNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="street"
                    label="Rua"
                    name="street"
                    onChange={(e) => {
                      setData({
                        ...data,
                        Street: e.target.value,
                      });
                    }}
                    value={data.Street}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="adressComplement"
                    label="Complemento"
                    id="adressComplement"
                    onChange={(e) => {
                      setData({
                        ...data,
                        AdressComplement: e.target.value,
                      });
                    }}
                    value={data.AdressComplement}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="district"
                    label="Bairro"
                    id="district"
                    onChange={(e) => {
                      setData({
                        ...data,
                        District: e.target.value,
                      });
                    }}
                    value={data.District}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="Cidade"
                    id="city"
                    onChange={(e) => {
                      setData({
                        ...data,
                        City: e.target.value,
                      });
                    }}
                    value={data.City}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="state"
                    label="Estado"
                    id="state"
                    onChange={(e) => {
                      setData({
                        ...data,
                        State: e.target.value,
                      });
                    }}
                    value={data.State}
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
                  updateAdress(data);
                }}
              >
                Alterar
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/account">Voltar</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
