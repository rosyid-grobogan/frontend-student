import React, { Component } from 'react';
import { Formik } from 'formik';
import { Input, Button, Select, Tag } from 'antd';

const { Option } = Select;
const inputButtomMargin = { marginBottom: '5px' };
const tagStyle = {
  backgroundColor: '#f50',
  color: 'white',
  ...inputButtomMargin,
};
class AddStudentForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          gender: '',
          mustBe: '',
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
          }
          if (!values.mustBe) {
            errors.mustBe = 'Required';
          } else if (
            !['MALE', 'male', 'FEMALE', 'female'].includes(values.mustBe)
          ) {
            errors.mustBe = 'Gender must be (MALE, male, FEMALE, female)';
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
              name='mustBe'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mustBe}
              placeholder='Must be'
            />
            {errors.mustBe && touched.mustBe && (
              <Tag style={tagStyle}>{errors.mustBe}</Tag>
            )}
            <br />
            <Select
              defaultValue='Gender'
              style={{ width: 120, marginBottom: '10px' }}
              onChange={handleChange}
            >
              <Option value='disabled' disabled>
                Gender:
              </Option>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
            {errors.gender && touched.gender && (
              <Tag style={tagStyle}>{errors.gender}</Tag>
            )}
            <br />
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
