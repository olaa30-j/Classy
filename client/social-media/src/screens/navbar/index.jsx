import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  Close,
  Help,
  LightMode,
  Notifications,
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "componets/FlexBetween";

const Navbar = () => {
  const [menuToggaled, setMenuToggaled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const nonScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralColorLight = theme.palette.neutral.light;
  const background = theme.palette.background.alt;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={background}>
      <FlexBetween>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: neutralColorLight,
              cursor: "pointer",
            },
          }}
        >
          Classy
        </Typography>
        {nonScreens && (
          <FlexBetween
            backgroundColor={neutralColorLight}
            borderRadius="9px"
            gap="0.5rem"
            padding="0.1rem 1rem"
            marginLeft="1rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop for Mobile Screen*/}
      {nonScreens ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontsize: "25px" }} />
            ) : (
              <LightMode sx={{ color:"orange" , fontsize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ fontsize: "25px" }} />
          </IconButton>
          <IconButton>
            <Notifications sx={{ fontsize: "25px" }} />
          </IconButton>
          <IconButton>
            <Help sx={{ fontsize: "25px" }} />
          </IconButton>

          <FormControl variant="standard" value="Ed Roh">
            <Select
              value={"name"}
              sx={{
                background: neutralColorLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralColorLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value="name">
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogOut)}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : !menuToggaled ? (
        <IconButton onClick={() => setMenuToggaled(!menuToggaled)}>
          <Menu />
        </IconButton>
      ) : null}

      {/* Navbar for Mobile Screen*/}
      {!nonScreens && menuToggaled && (
        <Box
          position="fixed"
          top="20px"
          right="50px"
          height="fit-content"
          maxWidth="400px"
          minWidth="200px"
          zIndex="20"
          padding="1rem 0"
          borderRadius="1rem"
          backgroundColor={background}
        >
          {/* close */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setMenuToggaled(!menuToggaled)}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <FlexBetween>
              <IconButton
                onClick={() => {
                  dispatch(setMode());
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontsize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: "dark", fontsize: "25px" }} />
                )}
                </IconButton>
              <IconButton>
                <Message sx={{ fontsize: "25px" }} />
                </IconButton>
              <IconButton>
                <Notifications sx={{ fontsize: "25px" }} />
                </IconButton>
              <IconButton>
                <Help sx={{ fontsize: "25px" }} />
              </IconButton>
            </FlexBetween>
            <FormControl variant="standard" value="Ed Roh">
              <Select
                value={"name"}
                sx={{
                  background: neutralColorLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralColorLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value="name">
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogOut())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
