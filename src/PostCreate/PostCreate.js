import React from 'react';
import {Field, Form, Formik} from "formik";
import {PostCreateSchema} from "./PostCreateSchema";
import config from "../config/index";

function PostCreate(props) {

    const submit = async (values) => {
        const res = await fetch(`${config.apiUrl}/posts`, {
            method: 'PUT'  ,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(values)
        });
    };

    return (
        <div>
            <h2>Create post</h2>
            <Formik
                initialValues={{image: '', description: ''}}
                validationSchema={PostCreateSchema}
                onSubmit={submit}>
                <Form className="col-lg-4">
                    <div>
                        <label className="col"  htmlFor="image">Image:</label>
                        <Field className={"col rounded-pill"} name="image" placeholder="" type="file" id="image"/>
                    </div>
                    <div>
                        <label className="col"  htmlFor="description">description:</label>
                        <Field className={"col"} as={"textarea"} name="description" placeholder="" id="description"/>
                    </div>
                    <div className="col text-right">
                        <button type="submit" className="btn btn-dark" > Post</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default PostCreate;