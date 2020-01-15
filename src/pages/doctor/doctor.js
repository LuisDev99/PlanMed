import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import CustomSnackbar from '../../components/SnackBar.js';
import SearchBar from '../../components/SearchBar.js';
import LinearProgress from '../../components/LinearProgress.js';

import Patient from '../../components/Patient.js';

import './../../utilities/styles.css';

import { GET_PATIENT_BY_ID_NUMBER } from '../../graphql/queries/index.js';


function DoctorPage() {

    /* numberId (numero de identidad) is the string in which we will look up the patient */
    const [numberId, setnumberId] = useState('');

    /* 
       Boolean variable used when the user does not enter any text on the searchbar.
       If true, a snackbar will appear notifying the user to enter a text before searching.
       When the snackbar dissappears, with the help of the snackbar's onClose event, we set isInputEmpty to false again
    */
    const [isInputEmpty, setInputEmpty] = useState(false);

    const [getPatient, { loading, data, error }] = useLazyQuery(GET_PATIENT_BY_ID_NUMBER, {
        onCompleted: (response) => {
            /* This function gets called when the getPatient query is successful */
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
                color='primary'
            />

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

        </div>
    );
}


export default DoctorPage;
