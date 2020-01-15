import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const variantIcon = {
    active: CheckCircleIcon,
    inactive: CancelIcon
};

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 400,
    },
    active: {
        backgroundColor: 'white',
    },
    inactive: {
        backgroundColor: red,
    },
    icon: {
        fontSize: 30,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


function Content({ message, Icon }) {

    return (
        <div className='row-content'>
            <Typography>
                {message}
            </Typography>

            {Icon}

            {/*Icon && <Icon color="secondary" />*/}

        </div>
    )
}

const patientSchema = {
    name: '',
    isActive: false,
    activePlan: '',
    description: '',
};

export default function PatientCard({ patient = patientSchema }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const Icon = patient.isActive ? variantIcon.active : variantIcon.inactive;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card} elevation={3}>
            <CardHeader
                title={patient.name}
                subheader="Activo desde: September 14, 2016"
            />

            <Content
                Icon={<Icon htmlColor={patient.isActive ? "green" : "red"} />}
                message={"Estado del paciente: " + patient.isActive ? "Activo" : "Inactivo"}
            />

            <Content
                message={"Plan Actual: " + patient.activePlan}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {patient.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing onClick={handleExpandClick}>

                <Typography color="textSecondary" style={{ alignSelf: 'inherit' }}>
                    Ver mas informacion
                </Typography>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    title="Ver mas informacion"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Informacion Extra:</Typography>
                    <Typography paragraph>
                        Es un buen paciente! Aqui iria mas info del paciente
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

/* Not defining the shape of the prop 'patient' as it may change along the way */
PatientCard.propTypes = {
    patient: PropTypes.object.isRequired
};
