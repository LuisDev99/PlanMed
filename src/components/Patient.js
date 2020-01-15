import React from 'react';
import PropTypes from 'prop-types';

import SkeletonPatientCard from './SkeletonPatientCard.js';
import PatientCard from './PatientCard.js';
import CustomSnackBar from './SnackBar';

import './../utilities/styles.css';

/* This object is the schema of the prop 'data' that gets passed in the Patient component 
   For more information on how this object looks like or where did it get its properties (or if some properties do not match), see the 'GET_PATIENT_BY_ID' query in the queries folder */

//eslint-disable-next-line
const dataSchema = {
    getPatientByIdNumber: {
        success: false,
        patientInformation: {
            name: '',
            isActive: false,
            activePlan: '',
            description: '',
        }
    }
};

function Patient({ loading = false, data }) {

    /* 
       Patient Information object that comes from the query response data. 
       The prop 'data' gets destructure to get the 'patientInformation' object IF 'data' is not null 
       See the 'GET_PATIENT_BY_ID_NUMBER' for more information about the patientInformation's object properties
    */
    const { patientInformation } = data ? data.getPatientByIdNumber : {};


    return (
        <div className='content-body'>

            {loading &&
                <SkeletonPatientCard />
            }

            {data &&
                (data.getPatientByIdNumber.success
                    ?
                    <PatientCard patient={patientInformation} />
                    :
                    <CustomSnackBar
                        message="El paciente no fue encontrado. Verifica bien el numero de identidad y vuelve a intentarlo"
                        messageStatus="error"
                        duration={5000}
                    />
                )
            }

        </div>
    );

}

/* The prop 'data' listed below follows the same structure or model (schema, term used in graphql) as define in the 'GET_PATIENT_BY_ID' query in the queries folder */
Patient.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.exact({
        getPatientByIdNumber: PropTypes.shape({
            success: PropTypes.bool,
            patientInformation: PropTypes.shape({
                identityNumber: PropTypes.string,
                name: PropTypes.string,
                isActive: PropTypes.bool,
                activePlan: PropTypes.string,
                description: PropTypes.string
            }),
        }),
    }),

};

export default Patient;