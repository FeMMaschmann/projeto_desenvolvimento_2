import { TypesLogged, TypesLoginData } from "../types/types";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Account(props: TypesLogged & TypesLoginData) {
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
              Minha Conta
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Link to="/accAdress">
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  Alterar meu endereço
                </Button>
              </Link>
              <Link to="/newInstallation">
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  Registrar nova instalação
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
