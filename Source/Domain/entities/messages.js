const functionalMessage = require('./businessMessageConfigurationHandler');

/**
 * InputValidationCommonErrorMessage Function
 * @param {Object} errors : Errors Object allows us to control both input validation errors and business rule validation
 * @returns {Object} errors : Errors_Response with errors details (message field).
 */
function InputValidationCommonErrorMessage (errors) {
        switch (errors.code) {
            // You can add somme validation logic here ! it's upp to you ! Enjoy ;)
            // .....
            default:
                errors[0].message = {
                    message: `${errors}`,
                    id: functionalMessage.UNDEFINED_VALIDATION_ERROR.ID,
                    type: functionalMessage.UNDEFINED_VALIDATION_ERROR.TYPE,
                };
                break;
        }
        return errors;
}

module.exports = {
    InputValidationCommonErrorMessage,
};
