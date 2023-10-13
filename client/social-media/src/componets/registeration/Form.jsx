import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FlexBetween from "componets/FlexBetween";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { setLogin } from "state";
import FlexColumn from "componets/FlexColumn";

//<<<<<<<<<<<<<<<<<<<<<<<<<<< Register validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(20, "Password cannot exceed 20 characters")
        .required("Password is required"),
    // confirmPassword: yup
    //     .string()
    //     .oneOf([yup.ref('password'), null], 'Passwords must match')
    //     .required('Confirm Password is required'),
    location: yup.string().required("Location is required"),
    picture: yup.string().required("Picture is required"),
    occupation: yup.string().required("Occupation is required"),
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<< Login validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(20, "Password cannot exceed 20 characters")
        .required("Password is required"),
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<< initial values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirmPassword: "",
    location: "",
    picture: "",
    occupation: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {

    const theme = useTheme();
    const paletteColor = theme.palette.neutral.medium;

    const [LoginPage, setLoginPage] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => { setShowPassword((show) => !show) };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const { palette } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nonScreens = useMediaQuery("(min-width: 756px)");
    const isLogin = LoginPage === "login";
    const isRegister = LoginPage === "register";



    // <<<<<<<<<<<<<<<<<<<<<<<<<<<  New Register >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picture", values.picture.name);

        try {
            const savedUserResponse = await fetch(
                "http://localhost:4000/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!savedUserResponse.ok) {
                // Handle error response here, e.g., display an error message.
                throw new Error("Registration failed");
            }

            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if (savedUser) {
                setLoginPage("login");
            }
        } catch (error) {
            console.error("Registration error:", error);
            // Handle the error, e.g., display an error message to the user.
        }

    };


    // <<<<<<<<<<<<<<<<<<<<<<<<<<<  User Login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const login = async (values, onSubmitProps) => {
        try {
            const loggedInResponse = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!loggedInResponse.ok) {
                throw new Error("Failed to login");
            }

            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();

            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<  handle Submit >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) return await login(values, onSubmitProps);
        if (isRegister) return await register(values, onSubmitProps);
    };



    // <<<<<<<<<<<<<<<<<<<<<<<<<<<  Begin jsx code  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <FlexBetween 
            position="relative"
            min-height="140vh"
            overflow="hidden"
        >
            {nonScreens &&
                <Box
                    textAlign="center"
                    backgroundColor={palette.primary.main}
                    width="100%" 
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    borderRadius="30%"
                    position="absolute"
                    right= "60%"
                    p="10%"
                >
                    <Typography
                        fontWeight="500"
                        variant="h3"
                        width="190px"
                        color="white"
                        sx={{
                            m: "1rem",
                        }}
                    >
                        {isLogin ? ("Hello, Friend!") : ("Welcome Back, share your experience with us!")}

                    </Typography>
                    <Button
                        onClick={() => {
                            setLoginPage(isLogin ? "register" : "login")
                        }
                        }
                        sx={{
                            m: "2rem 1rem",
                            p: "1rem 4rem",
                            borderRadius: "20px",
                            backgroundColor: palette.background.alt,
                            color: palette.primary.main,
                            "&:hover": {
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                border: "2px solid white"

                            },
                        }}
                    >
                        {isLogin ? "Sign up" : "Sign in"}
                    </Button>
                </Box>}
            <FlexColumn
                m={nonScreens ? '1rem 4rem' : '1rem 1rem'}
                p="1rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width= {nonScreens ? "50%" : "100%"}
                position="relative"
                top="0"
                left= {nonScreens ? "40%" : "0"}
                >
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                    validationSchema={isLogin ? loginSchema : registerSchema}
                >

                    {({
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        handleBlur,
                        handleSubmit,
                        handleChange,
                        resetForm,
                    }) => (

                        <>
                            <Box mb="4rem" textAlign="center">
                                <Typography
                                    fontWeight="500"
                                    variant="h3"
                                    color="primary"
                                    sx={{
                                        m: "1rem",
                                    }}
                                >
                                    {isLogin ? ("Sign in to Classy") : ("Create Account")}

                                </Typography>
                            </Box>

                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: nonScreens ? undefined : "span 4" },
                                    }}
                                >
                                    {isRegister && (
                                        <>
                                            <TextField
                                                name="firstName"
                                                label="First Name"
                                                id="outlined-required"
                                                onChange={handleChange}
                                                value={values.firstName || ''}
                                                type="text"
                                                onBlur={handleBlur}
                                                error={
                                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                                }
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                            />


                                            <TextField
                                                name="lastName"
                                                label="Last Name"
                                                id="outlined-required"
                                                value={values.lastName || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <Box
                                                gridColumn="span 4"
                                                border={`1px solid ${paletteColor}`}
                                                borderRadius="5px"
                                                p="1rem"
                                            >
                                                <Dropzone
                                                    acceptedFiles=".jpg,.jpeg,.png"
                                                    multiple={false}
                                                    onDrop={(acceptedFiles) =>
                                                        setFieldValue("picture", acceptedFiles[0])
                                                    }
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {!values.picture ? (
                                                                <p>Add Picture Here</p>
                                                            ) : (
                                                                <FlexBetween>
                                                                    <Typography>{values.picture.name}</Typography>
                                                                    <EditOutlinedIcon />
                                                                </FlexBetween>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Dropzone>
                                            </Box>
                                            <TextField
                                                name="location"
                                                label="Location"
                                                id="outlined-required"
                                                value={values.location || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.location) && Boolean(errors.location)}
                                                helperText={touched.location && errors.location}
                                                sx={{ gridColumn: "span 2" }}
                                            />

                                            <TextField
                                                name="occupation"
                                                label="Occupation"
                                                id="outlined-required"
                                                value={values.occupation || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                                helperText={touched.occupation && errors.occupation}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                        </>
                                    )}
                                    <TextField
                                        name="email"
                                        label="Email"
                                        id="outlined-required"
                                        value={values.email || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        label="Password"
                                        id="outlined-required"
                                        value={values.password || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: 'span 4' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {/* BUTTONS */}
                                    <Box>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                m: "2rem 0",
                                                p: "1rem",
                                                borderRadius: "20px",
                                                backgroundColor: palette.primary.main,
                                                color: palette.background.alt,
                                                "&:hover": { color: palette.primary.main },
                                            }}
                                        >
                                            {isLogin ? "LOGIN" : "REGISTER"}
                                        </Button>
                                    </Box>

                                    <FlexBetween>
                                        <Typography onClick={() => {
                                            setLoginPage(isLogin ? "register" : "login");
                                            resetForm();
                                        }}
                                            sx={{
                                                color: palette.primary.main,
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    color: palette.primary.light,
                                                },
                                            }}
                                        >
                                            {isLogin ? "create new account" : " Already have an account"}
                                        </Typography>
                                    </FlexBetween>
                                </Box>
                            </form>
                        </>
                    )}
                </Formik>
            </FlexColumn>
        </FlexBetween>
    );
};

export default Form;
