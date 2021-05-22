import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../helpers/client';

const inputButtomMargin = { marginBottom: '5px' };
const tagStyle = {
  backgroundColor: '#f50',
  color: 'white',
  ...inputButtomMargin,
};
const AddStudentForm = (props) => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
    }}
    validate={(values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Email Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.firstName) {
        errors.firstName = 'First Name Required';
      }
      if (!values.lastName) {
        errors.lastName = 'Last Name Required';
      }
      if (!values.gender) {
        errors.gender = 'Gender Required';
      } else if (
        !['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)
      ) {
        errors.gender = 'Gender must be (MALE, male, FEMALE, female)';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));

      //   setSubmitting(false);
      // }, 400);
      addNewStudent(values)
        .then(() => {
          //alert(JSON.stringify(values));
          props.onSuccess();
          setSubmitting(false);
          console.log(values);
        })
        .catch((err) => {
          props.onFailure(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
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
      submitForm,
      isValid,
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
        {errors.firstName && touched.firstName && (
          <Tag style={tagStyle}>{errors.firstName}</Tag>
        )}

        <Input
          style={{ marginBottom: '5px' }}
          name='lastName'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder='Last Name'
        />
        {errors.lastName && touched.lastName && (
          <Tag style={tagStyle}>{errors.lastName}</Tag>
        )}

        <Input
          style={inputButtomMargin}
          name='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder='Email'
        />
        {errors.email && touched.email && (
          <Tag style={tagStyle}>{errors.email}</Tag>
        )}

        <Input
          style={inputButtomMargin}
          name='gender'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          placeholder='Gender must be (MALE, male, FEMALE, female)'
        />
        {errors.gender && touched.gender && (
          <Tag style={tagStyle}>{errors.gender}</Tag>
        )}
        <br />
        <Button
          onClick={() => submitForm()}
          type='submit'
          disabled={isSubmitting | (touched && !isValid)}
        >
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default AddStudentForm;
