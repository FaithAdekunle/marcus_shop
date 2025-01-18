export const FORM_SUBSCRIPTION = {
  errors: true,
  invalid: true,
  submitting: true,
  hasValidationErrors: true
};

export const required = value => (value ? undefined : "This field is required");

export const disabledSubmitClass = " opacity-50 cursor-not-allowed";
