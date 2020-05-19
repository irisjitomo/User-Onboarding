import React, { useState, useEffect} from 'react';
import { Form, Field, withFormik } from 'formik';
import axios from "axios";
import * as yup from 'yup';

const FormComponent = ({ errors, touched, values, status}) => {

    const [users, setUser] = useState([])
    useEffect(() => {
        if (status) {
            setUser([...users, status])
        }
    }, [status])

    console.log('values', values)
    console.log('touched', touched)

    return(
        <div>
            <h1>Enter Your Formik Form</h1>
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
                <div>   
                    <label>Question 1: Where Did Your Parents Meet?</label><br></br>
                <Field type = 'password' name='question1' placeholder='Please Answer' />
                {touched.question1 && errors.question1 && <p className='error-message'>{errors.question1}</p>}
                </div>
                <div>
                <label>Question 2: What was your first grade teacher's name?</label><br></br>
                <Field type = 'password' name='question2' placeholder="Please Answer" />
                {touched.question2 && errors.question2 && <p className='error-message'>{errors.question2}</p>}
                </div>
                <div>
                <label>Question 3: What is your shoe size?'</label><br></br>
                <Field type = 'password' name='question3' placeholder='Please Answer' />
                {touched.question3 && errors.question3 && <p className='error-message'>{errors.question3}</p>}
                </div>

                <button type="submit">Submit Form!</button>
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
    ))}

        </div>
    )
}

const FormikFormComponent = withFormik({
    mapPropsToValues({ name, email, password, terms, question1, question2, question3 }) {
        return{
            terms : terms || false,
            name: name || "",
            email : email || "",
            password : password || "",
            question1 : question1 || "",
            question2 : question2 || "",
            question3 : question3 || ""
            
        };
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Please Fill in Name Field"),
        email: yup.string().required("Please Fill in Email Field"),
        password: yup.string().required("Please Fill in Password Field"),
        question1: yup.string().required('Please Fill in Question Field'),
        question2: yup.string().required("Please Fill in Question Field"),
        question3: yup.string().required("Please Fill in Question Field")
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