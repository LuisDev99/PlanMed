import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 2,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(20),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
    },
    logoutBtn: {
        flexGrow: 1,
    },
    searchBtn: {
        flexGrow: 3
    }

}));

export default function SearchAppBar({ onValueChange, onKeyPress, value, onSearchButtonClick, color }) {
    const classes = useStyles();

    function handleLogout() {
        localStorage.removeItem('user');
        window.location = "/";
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" color={color}>
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        PlanMed
                    </Typography>

                    <div className={classes.search}>

                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>

                        <Tooltip TransitionComponent={Zoom} title="Si el paciente esta suscrito a PlanMed, ingresa el # de identitdad de dicho paciente para ver su informacion" arrow>
                            <InputBase
                                placeholder="# de identidad"
                                inputMode='decimal'
                                onChange={onValueChange}
                                onKeyPress={onKeyPress}
                                value={value}
                                autoFocus={true}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Tooltip>

                    </div>

                    <Button color='inherit' className={classes.searchBtn} onClick={onSearchButtonClick} >Buscar paciente</Button>

                    <Button color='inherit' className={classes.logoutBtn} onClick={handleLogout}>Cerrar Sesion</Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}

SearchAppBar.propTypes = {
    onValueChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    value: PropTypes.string,
    onSearchButtonClick: PropTypes.func,
    color: PropTypes.oneOf(['primary', 'secondary']).isRequired
};