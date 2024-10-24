import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'

const EditProfileForm = () => {
    const loggedInUser = loggedInData[0]
    const user = userData.find(user => user.id === loggedInUser.id)
    const [show, setShow] = React.useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const layoutChoices = [
                            { val: 'list', label: 'List'},
                            { val: 'list-title', label: 'List (title only)'},
                            { val: 'grid', label: 'Grid (image only)'},
                            { val: 'masonry', label: 'Masonry (image only)'},
                            { val: 'masonry-title', label: 'Masonry'}]

    const initialValues = {
        name: user.name,
        bio: user.bio ? user.bio : '',
        layout: user.layout,
        file: null
    }

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
              return !value || value.size <= 1024 * 1024 // 1 MB size limit
            })
            .test('fileType', 'Only image files are allowed.', value => {
                return !value || value.type.startsWith('image/'); // Only allow images
            }),
    })

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {({errors, isSubmitting, setFieldValue, touched, values}) => (
                <>
                    <label htmlFor='fileInput'>Edit picture</label>
                    <input
                        type='file'
                        id='fileInput'
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0]
                            setFieldValue('file', file)
                            setShow(false)
                        }}
                        className={`form-control ${touched.file && errors.file ? 'is-invalid': ''}`}
                    />
                    <Form>
                        <div>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <Field name='name' type='text' className={`form-control custom-input ${touched.name && errors.name ? 'is-invalid': ''}`} />
                        </div>
                        <ErrorMessage name='name'>
                            {msg => <div className='text-danger'>{msg}</div>}
                        </ErrorMessage>
                        <div>
                            <label htmlFor='layout' className='form-label'>Layout</label>
                            <Field
                                as='select'
                                name='layout'
                                className='form-select'
                                onChange={(event) => {
                                    setFieldValue('layout', event.currentTarget.value)
                                }}
                            >
                                {
                                    layoutChoices.map( choice => (
                                        <option key={`layout-choice-${choice.val}`} value={choice.val} label={choice.label} />
                                    ))
                                }
                            </Field>
                            <ErrorMessage name='layout' component='div' style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label htmlFor='bio' className='form-label'>Bio</label>
                            <Field name='bio' as='textarea' className={`form-control custom-input bio ${touched.bio && errors.bio ? 'is-invalid': ''}`} />
                        </div>
                        <ErrorMessage name='bio'>
                            {msg => <div className='text-danger'>{msg}</div>}
                        </ErrorMessage>
                        <div className='grid gap-2'>
                            <button 
                                type='submit'
                                className='bg-gray-900 text-white py-2 px-2 rounded hover:bg-gray-500'
                                disabled={isSubmitting}
                            >
                                Update
                            </button>
                        </div>
                        {errors.file && touched.file ? (
                            <div className='text-danger'>{errors.file}</div>
                        ) : null}
                    </Form>
                </>
            )}
            </Formik>
        </>
    )
}

export default EditProfileForm
