import { gql } from "apollo-boost";

/* Centralized file where all the queries should be (by convention) in 
    order to have a single source of truth
*/


/* If the graphql schema of this query or any object schema related to this query changes (that is, the graphql API changes this query or affects this query), 
    add here all the files that have a dependency of this query to have a reference of what
    needs to be change when this query gets modified 

    Dependencies: 
        - pages/login/login.js
*/
export const LOGIN_QUERY = gql`
    mutation login($credentials: UserCredentialInput!){
        login(credentials: $credentials) {
            success
            userInformation {
                email
                role
            }
        }
    }
`;

/* If the graphql schema of this query or any object schema related to this query changes, 
    add here all the files that have a dependency of this query to have a reference of what
    needs to be change when this query gets modified

    Dependencies: 
        - components/Patient.js
        - components/PatientCard.js
        - pages/doctor/doctor.js
        - pages/hospital/hospital.js
*/
export const GET_PATIENT_BY_ID_NUMBER = gql`
    query getPatientByIdNumber($numberId: String!){
        getPatientByIdNumber(idNumber: $numberId) {
          success
          patientInformation {
            identityNumber
            name
            isActive
            activePlan
            description
          }
        }
    }
`;