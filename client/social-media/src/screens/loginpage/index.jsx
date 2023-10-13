import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "componets/registeration/Form";

const LoginPage = () => {
  const theme = useTheme();
  const nonScreens = useMediaQuery("(min-width:1000px)");
  const background = theme.palette.background.alt;

  return (
      <Box
        width={nonScreens ? "80%" : "95%"}
        m={nonScreens ? "2rem auto" : "0.5rem auto"}
        borderRadius="1.5rem"
        backgroundColor={background}
      >
        <Form/>
      </Box>
  );
};

export default LoginPage;
