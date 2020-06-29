import React, {useState} from 'react';
import "./Register.scss";
import {Formik, Form, Field} from "formik";
import {RegisterSchema} from "./RegisterSchema";
import {useHistory} from "react-router-dom";
import registerImage from "./register-image.png";
import config from "../config/index";

function Register() {

    const [showError, setError] = useState(false);
    const history = useHistory();

    const submit = async (values) => {
        setError(false);
            const res = await fetch(config.apiUrl + '/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (res.status === 201) {
                history.push("/login");
            }
            else if (res.status === 409) {
                setError(true);
            } else {
                console.log("Unknown error");
            }
            return res;
    };

    return (
        <div className={"Register row"}>
            <div className={"registerImage col-12 col-md-6 justify-content-md-end justify-content-center"}>
                <img alt={"register image"} src={registerImage} />
            </div>
            <div className={"col-12 col-md-6 justify-content-md-end justify-content-center"}>

            <Formik initialValues={{username: "", password: "", email: "", terms: false}}
            validationSchema={RegisterSchema}
            onSubmit={submit}>

                {({errors, touched, isSubmitting}) => (
                    <Form className={" registerForm col-12 mt-4"}>
                        <h2>Register page</h2>
                        <div className={"form-group"}>
                            {showError && <div className={"alert alert-danger"}>
                                Email or username already exists
                            </div>}
                            <label htmlFor={"username"}>Username</label>
                            <Field name={"username"} type={"text"} id={"username"} className={"form-control"} placeholder={"2-16 chars"}/>
                            {errors.username && touched.username && <small className={"text-danger pl-2"}>{errors.username}</small>}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password</label>
                            <Field name={"password"} type={"password"} id={"password"} className={"form-control"} placeholder={"6-16 chars"}/>
                            {errors.password && touched.password && <small className={"text-danger pl-2"}>{errors.password}</small>}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"email"}>Email</label>
                            <Field type={"email"} id={"email"} name={"email"} className={"form-control"} placeholder={"Email address"}/>
                            {errors.email && touched.email && <small className={"text-danger pl-2"}>{errors.email}</small>}
                        </div>
                        <div className={"form-group form-check"}>
                            <Field name={"terms"} type="checkbox" className="form-check-input" id="terms"/>
                            <label className="form-check-label" htmlFor="terms">Agree to terms</label>
                            {errors.terms && touched.terms && <small className={"text-danger pl-2"}>{errors.terms}</small>}
                        </div>
                        <div className={"form-group text-left"}>
                            <button type={"submit"} className={"btn btn-dark register-button"} disabled={isSubmitting}>Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    );
}
export default Register;