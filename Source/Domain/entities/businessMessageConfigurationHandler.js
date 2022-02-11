/**
 *
 * @type {{FUNCTIONAL: string, VALIDATION: string, EXCEPTION: string}} Message type (Functional for functional messages and VALIDATION for validation messages applied to the input parameters of the service.
 */
const ERROR_TYPE =  {
    FUNCTIONAL: 'Business rule',
    VALIDATION: 'Validation rule',
    EXCEPTION: 'Exception',
};
/**
 * Functional messages related to the common resource.
 */

/**
 *
 * @type {object} List of functional messages linked to the message resource.
 */
module.exports = {
    UNDEFINED_FUNCTIONAL_ERROR: {
        MESSAGE: 'Erreur Métier non identifiée!',
        ID: 'RV-0000',
        TYPE: ERROR_TYPE.FUNCTIONAL,
    },
    UNDEFINED_VALIDATION_ERROR: {
        MESSAGE: 'Erreur de validation non identifiée!',
        ID: 'RV-0000',
        TYPE: ERROR_TYPE.VALIDATION,
    },
    OBJECT_UNKNOWN: {
        MESSAGE: 'Query filter not allowed',
        ID: 'RV-0001',
        TYPE: ERROR_TYPE.VALIDATION,
    },
    UNDEFINED: {
        MESSAGE: 'At least one query parameter is mandatory',
        ID: 'RV-0002',
        TYPE: ERROR_TYPE.VALIDATION,
    },
    OBJECT_MISSING: {
        MESSAGE: 'Missing query',
        ID: 'RV-0003',
        TYPE: ERROR_TYPE.VALIDATION,
    }
};
