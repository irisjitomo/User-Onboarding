import React, { useState, useEffect} from 'react';
import { Form, Field, withFormik } from 'formik';
import axios from "axios";
import * as Yup from 'yup';

const FormComponent = ({ errors, touched, values, status}) => {

    const [users, setUser] = useState([])
    useEffect(() => {
        if (status) {
            setUser([...users, status])
        }
    }, [status])

    return(
        <div>
            <h1>Enter Your Formik Form For a Real One</h1>
            <Form>
                <div>
                <Field type="text" name="name" placeholder="enter your name" />
                {touched.name && errors.name && <p className='error-message'>{errors.name}</p>}
                </div>
                <div>
                <Field type="email" name='email' placeholder="enter your email" />
                {touched.email && errors.email && <p className='error-message'>{errors.email}</p>}
                </div>
                <div>
                <Field type="password" name="password" placeholder="enter your password" />
                {touched.password && errors.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div>
                Terms of service agreement:
                <label className='checkbox-container'>
                <Field type="checkbox" name="terms" checked={values.terms}/>
                <span />
                </label>
                </div>

                <button type="submit">Submit Form!</button>
            </Form>

            {users.map(user => (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
    ))}

        </div>
    )
}

const FormikFormComponent = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return{
            terms : terms || false,
            name: name || "",
            email : email || "",
            password : password || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Yo fill your name fool!"),
        email: Yup.string().required("Where your email at?"),
        password: Yup.string().required("Gimme a password bruh")
    }),
    handleSubmit(values, {setStatus}){
    axios
    .post("https://reqres.in/api/users", values)
    .then(res => {
        setStatus(res.data)
        console.log(res.data)
    })
    .catch(err => console.log(err.response));
}

})(FormComponent);

export default FormikFormComponent;