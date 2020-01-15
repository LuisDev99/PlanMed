import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import PDFIcon from '@material-ui/icons/PictureAsPdf'

import CustomSnackbar from '../../components/SnackBar.js';
import SearchBar from '../../components/SearchBar.js';
import LinearProgress from '../../components/LinearProgress.js';
import Patient from '../../components/Patient.js';
import CustomDialog from '../../components/AlertDialog.js';

import './../../utilities/styles.css';

import { GET_PATIENT_BY_ID_NUMBER } from '../../graphql/queries/index.js';


function HospitalPage() {

    /* numberId (numero de identidad) is the string in which we will look up the patient */
    const [numberId, setnumberId] = useState('');

    /* Boolean variable use to display a dialog when the user clicks the floating action button
        If true, the dialog gets displayed
        If false, the dialog is not displayed
     */
    const [shouldPDF_FormAppear, setPDF_Form] = useState(false);

    /* 
       Boolean variable used when the user does not enter any text on the searchbar.
       If true, a snackbar will appear notifying the user to enter a text before searching.
       When the snackbar dissappears, with the help of the snackbar's onClose event, we set isInputEmpty to false again
    */
    const [isInputEmpty, setInputEmpty] = useState(false);

    /* Using Apollo's client hook that returns a function that gets used to fetch a patient */
    const [getPatient, { loading, data, error }] = useLazyQuery(GET_PATIENT_BY_ID_NUMBER, {
        onCompleted: (response) => {
            /* This function gets called when the getPatient query is successful. NOT NEEDED */
        }
    });

    function handleSearchValueChange(event) {
        setnumberId(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearchPatient();
        }
    }

    function handleSearchPatient() {

        /* If text is empty, do not continue execution */
        if (!numberId) {
            setInputEmpty(true);
            return;
        }

        /* Fetch the query with the getPatient function provided by the useLazyQuery hook */
        getPatient({
            /* This query expects a parameter. See the 'GET_PATIENT_BY_ID_NUMBER' query defined in the queries folder for more information */
            variables: {
                numberId: numberId
            }
        });

    }

    function handleInputEmptySnackbarClose() {
        setInputEmpty(false);
    }

    function handlePDFButtonClick() {
        setPDF_Form(true);
    }

    function handleDialogCloseEvent() {
        setPDF_Form(false);
    }

    if (error) {
        return (
            <div>{error.message}
                <div>Asegurate de que tengas conexion a internet. Intentalo mas tarde</div>
                <div>Si este mensaje sigue apareciendo, haz contacto con PlanMed para solucionar esta falla</div>
            </div>
        );
    }

    return (
        <div>
            {loading && <LinearProgress />}

            <SearchBar
                onValueChange={handleSearchValueChange}
                onKeyPress={handleKeyPress}
                value={numberId}
                onSearchButtonClick={handleSearchPatient}
                color='secondary' />

            <Patient data={data} loading={loading} />

            <CustomSnackbar message="Haz ingresado exitosamente!" messageStatus="success" />

            {isInputEmpty &&
                <CustomSnackbar
                    message="Ingresa un numero de identidad antes de realizar la busqueda del paciente"
                    messageStatus="info"
                    duration={5000}
                    onClose={handleInputEmptySnackbarClose}
                />
            }

            <div className="floating-action-btn">
                <Fab color='secondary' title="Enviar PDF" onClick={handlePDFButtonClick}>
                    <PDFIcon></PDFIcon>
                </Fab>
            </div>

            {shouldPDF_FormAppear &&
                <CustomDialog
                    dialogTitle="Enviar PDF a correo electronico"
                    dialogMessage="Aqui se implementara la funcionalidad para llenar el formulario del pdf y enviarlo por correo"
                    onDialogCloseEvent={handleDialogCloseEvent}
                />
            }

        </div>
    );
}


export default HospitalPage;
