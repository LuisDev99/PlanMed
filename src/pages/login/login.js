import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AlertDialog from '../../components/AlertDialog.js';
import CircularProgress from '../../components/CircularProgress.js';

import { useMutation } from '@apollo/react-hooks';

import { LOGIN_QUERY } from '../../graphql/queries/index.js';


const useStyles = makeStyles(theme => ({
    loginPage: {
        backgroundColor: '#982cfc',
        width: '100vw',
        height: '100vh',
        padding: '50px'
    },
    paper: {
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailure] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const [login, { loading, error }] = useMutation(LOGIN_QUERY, {
        onCompleted(loginResult) {

            if (loginResult && loginResult.login && loginResult.login.success) {

                const userInformation = loginResult.login.userInformation;

                //Old
                /* if (userInformation.role === "Doctor") {
                    localStorage.setItem('user', JSON.stringify(userInformation));
                    window.location = "/DoctorPage";
                }
                else if (userInformation.role === "Hospital") {
                    localStorage.setItem('user', JSON.stringify(userInformation));
                    window.location = "/HospitalPage";
                } */

                //New ?
                if (userInformation.role === "Doctor" || userInformation.role === "Hospital") {
                    localStorage.setItem('user', JSON.stringify(userInformation));
                    window.location = "/" + userInformation.role + "Page";
                }

            } else {
                setLoginFailure(true);
            }

        }
    });

    function handleOnSubmit(event) {
        event.preventDefault();

        handleLogin();
    }

    function handleLogin(event) {

        if (!email) {
            setIsEmailEmpty(true);
            return;
        } else {
            setIsEmailEmpty(false);
        }

        if (!password) {
            setIsPasswordEmpty(true);
            return;
        } else {
            setIsPasswordEmpty(false);
        }

        event.preventDefault();

        const userCredential = {
            email: email,
            password: password
        };

        /*
            The LOGIN_QUERY has one parameter of object type UserCredential
            Set the parameter using the variables key
            See the 'LOGIN_QUERY' query in the queries folder for more information
        */
        login({ variables: { credentials: userCredential } });

    }

    function handleLostPasswordClick() {
        setIsAlertDialogOpen(true);
    }

    function handleDialogCloseEvent() {
        setIsAlertDialogOpen(false);
    }

    if (error) {

        return (
            <div>
                Ocurrio un error. Asegurate de que tengas conexion a internet antes de hacer inicio de sesion. Haz contacto con Plan Med para mas ayuda si el problema aun persiste.
            <br /> Mensaje del error: {error.message}.
                {error.networkError && <div>Estado de la conexion {error.networkError.name}: {error.networkError.message} </div>}
            </div>
        );
    }

    return (
        <div className={classes.loginPage}>

            {loading && <CircularProgress />}

            <Container component="main" maxWidth="xs">

                <CssBaseline />

                <form onSubmit={handleOnSubmit}>
                    <Paper className={classes.paper} elevation={3}>

                        {loginFailed && <Typography component="h1" variant="h5" color='error'>Usuario o Contraseña incorrecta</Typography>}

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Inicio de Sesion
                        </Typography>

                        {isEmailEmpty && <Typography color='error'>*Ingresa el correo electronico</Typography>}

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            onChange={(event) => { setEmail(event.target.value); }}
                            id="email"
                            label="Correo Electronico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        {isPasswordEmpty && <Typography color='error'>*Ingresa la contraseña</Typography>}

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={(event) => { setPassword(event.target.value); }}
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Iniciar sesion
                        </Button>

                        <div style={{ margin: '20px' }} />


                        <Button color="primary" onClick={handleLostPasswordClick}>
                            ¿Olvidaste la contraseña?
                        </Button>

                        {isAlertDialogOpen &&
                            <AlertDialog
                                dialogTitle="Ayuda"
                                dialogMessage="Aegurate que estas escribiendo bien la contraseña. Tienes que contactarte con PlanMed para reestablecer la contraseña. Este sistema no provee la funcionalidad para reestablecer tu contraseña."
                                onDialogCloseEvent={handleDialogCloseEvent}
                            />
                        }

                    </Paper>
                </form>

            </Container>

        </div>
    );
}
