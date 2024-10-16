import React from 'react'
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'react-bootstrap';
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'

const EditProfileForm = () => {
    const loggedInUser = loggedInData[0]
    const user = userData.find(user => user.id === loggedInUser.id)
    const [show, setShow] = React.useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const initialValues = {
        name: user.name,
        bio: user.bio ? user.bio : '',
        file: null
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters')
            .required('Required'),
        
        bio: Yup.string()
            .min(0, 'This field must be at least 2 characters')
            .max(300, 'This field cannot exceed 300 characters'),

        file: Yup.mixed()
            .nullable()
            .test('fileSize', 'File size is too large', value => {
              return !value || value.size <= 1024 * 1024; // 1 MB size limit
            })
            .test('fileType', 'Only JPG and PNG formats are allowed.', value => {
              return !value || ['image/jpeg', 'image/png'].includes(value.type); // JPG and PNG only
            }),
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {({errors, isSubmitting, setFieldValue, touched, values}) => (
                <>
                    <p onClick={handleShow}>Edit picture</p>
                    <Form>
                        <div>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <Field name='name' type='text' className={`form-control custom-input ${touched.name && errors.name ? 'is-invalid': ''}`} />
                        </div>
                        <ErrorMessage name='name'>
                            {msg => <div className='text-danger'>{msg}</div>}
                        </ErrorMessage>
                        <div>
                            <label htmlFor='bio' className='form-label'>Bio</label>
                            <Field name='bio' as='textarea' className={`form-control custom-input bio ${touched.bio && errors.bio ? 'is-invalid': ''}`} />
                        </div>
                        <ErrorMessage name='bio'>
                            {msg => <div className='text-danger'>{msg}</div>}
                        </ErrorMessage>
                        <div className='d-grid gap-2'>
                            <Button type='submit' variant='dark' disabled={isSubmitting} >
                                Update
                            </Button>
                        </div>
                        {errors.file && touched.file ? (
                            <div className='text-danger'>{errors.file}</div>
                        ) : null}


                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Body>
                                <p onClick={handleClose}>Cancel</p>
                                <div className='edit-picture'>
                                    <input
                                        type='file'
                                        id='fileInput'
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0]
                                            setFieldValue('file', file)
                                            setShow(false)
                                        }}
                                        className={`form-control ${touched.file && errors.file ? 'is-invalid': ''}`}
                                    />
                                    <label htmlFor='fileInput' className='btn btn-light btn-file'>Choose File</label>
                                    {
                                        values.file ?
                                        <p className='mt-3'>
                                            You have selected: <span className={touched.file && errors.file ? 'text-danger': 'text-success'}>{values.file.name}</span>
                                        </p>:
                                        <p className='mt-3'>
                                            You haven't selected a file
                                        </p>
                                    }
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Form>
                </>
            )}
            </Formik>
        </>
    )
}

export default EditProfileForm
