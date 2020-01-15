import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);


export default function CustomizedDialogs({ onDialogCloseEvent, dialogTitle = '', dialogMessage = '' }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        onDialogCloseEvent();
    };

    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {dialogMessage}
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}

CustomizedDialogs.propTypes = {
    onDialogCloseEvent: PropTypes.func.isRequired, //Used for signaling the parent component that the dialog was close
    dialogTitle: PropTypes.string.isRequired,
    dialogMessage: PropTypes.string.isRequired,
};


