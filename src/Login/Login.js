import React from 'react';
import {Formik, Form, Field} from 'formik';
import {LoginSchema} from './loginSchema';
import loginImage from "../Login/login-image.png";
import { useHistory } from "react-router-dom";
import config from "../config/index";

import "./Login.scss";


function Login(props) {

    const history = useHistory();

    const loginHandler = async (values) =>{
        const res = await fetch(`${config.apiUrl}/users/login`, {
            method: 'POST'  ,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(values)
        });
        if(res.status === 200) {
            props.onUserLogIn(await res.json());
            history.push("/");
        } else if(res.status === 401) {
            console.log('failed');
        } else {
            console.log('error');
        }
        return res;
    }
    return (
        <div className={"Login row"}>
            <div className={"loginImage col-12 col-md-6 justify-content-md-end justify-content-center"}>
                <img alt={"login image"} src={loginImage} />
            </div>
            <div className={"col-12 col-md-6 justify-content-md-end justify-content-center"}>

                <Formik initialValues={{username: '', password: ''}}
                        validationSchema={LoginSchema}
                        onSubmit={loginHandler}
                >
                    {({errors, touched, isSubmitting }) => (
                        <Form className={" registerForm col-12 mt-4"}>
                            <h2>Login page</h2>
                            <div className={"form-group"}>
                                <label htmlFor={"username"}>Username</label>
                                <Field name={"username"} type={"text"} id={"username"} className={"form-control"} placeholder={"2-16 chars"}/>
                                {errors.username && touched.username && <small className={"text-danger pl-2"}>{errors.username}</small>}
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"password"}>Password</label>
                                <Field name={"password"} type={"password"} id={"password"} className={"form-control"} placeholder={"6-16 chars"}/>
                                {errors.password && touched.password && <small className={"text-danger pl-2"}>{errors.password}</small>}
                            </div>
                            <div className={"form-group text-left"}>
                                <button type={"submit"} className={"btn btn-dark login-button"} disabled={isSubmitting}>Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default Login;