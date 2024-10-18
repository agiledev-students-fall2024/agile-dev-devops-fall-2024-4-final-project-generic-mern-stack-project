import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

const RegisterForm = () => {
  const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
  };

  const validationSchema = Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Required'),

      username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username cannot exceed 30 characters')
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Username can only contain letters, numbers, underscores, hyphens, and periods.')
        .required('Required'),

      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),

      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .required('Required')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),

      confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
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
                <label htmlFor='name' className='form-label'>Name</label>
                <Field 
                  name='name' 
                  type='text' 
                  className={`form-control ${touched.name && errors.name ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='name'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div>
                <label htmlFor='username' className='form-label'>Username</label>
                <Field 
                  name='username' 
                  type='text' 
                  className={`form-control ${touched.username && errors.username ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='username'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div>
                <label htmlFor='email' className='form-label'>Email</label>
                <Field 
                  name='email' 
                  type='email'
                  autoComplete="email" 
                  className={`form-control ${touched.email && errors.email ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='email'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div>
                <label htmlFor='password' className='form-label'>Password</label>
                <Field 
                  name='password' 
                  type='password'
                  autoComplete='new-password' 
                  className={`form-control ${touched.password && errors.password ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='password'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div>
                <label htmlFor='confirm' className='form-label'>Confirm Password</label>
                <Field 
                  name='confirm' 
                  type='password' 
                  autoComplete='new-password' 
                  className={`form-control ${touched.confirm && errors.confirm ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='confirm'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div className='d-grid gap-2'>
                <Button type='submit' variant='dark' disabled={isSubmitting} >
                    Sign Up
                </Button>
            </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm
