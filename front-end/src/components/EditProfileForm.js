import React from 'react'
import { useParams } from "react-router-dom"
import userData from '../fillerData/users.json'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

const EditProfileForm = () => {
    const { username } = useParams()
    const user = userData.find(user => user.username === username);

    if (!user) {
        return <h2>User not found</h2>;
    }
    
    const initialValues = {
        name: user.name,
        bio: user.bio
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters')
            .required('Required'),
        
        bio: Yup.string()
            .min(0, 'This field must be at least 2 characters')
            .max(300, 'This field cannot exceed 300 characters')
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
                    <Field name='name' type='text' className={`form-control ${touched.name && errors.name ? 'is-invalid': ''}`} />
                </div>
                <ErrorMessage name='name'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
                <div>
                    <label htmlFor='bio' className='form-label'>Bio</label>
                    <Field name='bio' as='textarea' className={`form-control bio ${touched.bio && errors.bio ? 'is-invalid': ''}`} />
                </div>
                <ErrorMessage name='bio'>
                    {msg => <div className='text-danger'>{msg}</div>}
                </ErrorMessage>
                <div className="d-grid gap-2">
                    <Button type='submit' variant='dark' disabled={isSubmitting} >
                        Update
                    </Button>
                </div>
            </Form>
        )}
        </Formik>
    )
}

export default EditProfileForm
