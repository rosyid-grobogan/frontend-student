import React, { Component } from 'react';
import { Formik } from 'formik';
import { Input, Button } from 'antd';

const inputButtomMargin = { marginBottom: '5px' };
class AddStudentForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,

          errors,

          touched,

          handleChange,

          handleBlur,

          handleSubmit,

          isSubmitting,

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              style={inputButtomMargin}
              name='firstName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder='First Name'
            />
            {errors.firstName && touched.firstName && errors.firstName}

            <Input
              style={{ marginBottom: '5px' }}
              name='lastName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder='Last Name'
            />
            {errors.lastName && touched.lastName && errors.lastName}

            <Input
              style={inputButtomMargin}
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder='Email'
            />
            {errors.email && touched.email && errors.email}

            <Button type='submit' disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    );
  }
}

export default AddStudentForm;
