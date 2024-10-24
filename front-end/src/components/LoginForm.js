import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
                  autoComplete='current-password'
                  className={`form-control ${touched.password && errors.password ? 'is-invalid': ''}`} 
                />
                <ErrorMessage name='password'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
            </div>
            <div className='grid gap-2'>
                <button 
                    type='submit'
                    className='bg-gray-900 text-white py-2 px-2 rounded hover:bg-gray-500'
                    disabled={isSubmitting}
                  >
                    Sign in
                </button>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
