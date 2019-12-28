import React from 'react';

export default function LoginFormValidation(
  initialState,
  validate,
  authenticate
) {
  const [values, setValues] = React.useState(initialState);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, isSubmitting, authenticate]);

  function handleBlur(event) {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    // setSubmitting(true);
  }

  function handleChange(event) {
    // const [name, value] = event.target;
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  };
}
