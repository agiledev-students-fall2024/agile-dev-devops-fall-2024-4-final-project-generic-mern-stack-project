import React from 'react';
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

const LoginForm = () => {
  const initialValues = {
        email: '',
        password: '',
  };

  const validationSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),

      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({errors, isSubmitting, touched}) => (
        <Form>
            <div>
                <label htmlFor='email' className='form-label'>Email</label>
                <Field name='email' type='text' className={`form-control ${touched.email && errors.email ? 'is-invalid': ''}`} />
                <ErrorMessage name='email'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div>
                <label htmlFor='password' className='form-label'>Password</label>
                <Field name='password' type='password' className={`form-control ${touched.password && errors.password ? 'is-invalid': ''}`} />
                <ErrorMessage name='password'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div className="d-grid gap-2">
                <Button type='submit' variant='dark' disabled={isSubmitting} >
                    Sign In
                </Button>
            </div>
            <div>
                <Link to='/'>
                    Forgot password?
                </Link>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
