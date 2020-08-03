import React from 'react';
import {Field, Form, Formik} from "formik";
import LoadingIndicator from "../../../LoadingIndicator/LoadingIndicator";
import {commentCreateSchema} from "./commentCreateSchema";
import config from "../../../config";
import "./CommentCreate.scss";

function CommentCreate(props) {

  const submit = async (values) => {

    try {
      const result = await fetch(`${config.apiUrl}/posts/${props.postId}/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      if (result.status === 201) {
        console.log(result);
        props.onCommentCreate(await result.json());
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className={"createComment mt-4"}>
      <Formik
        initialValues={{content: ""}}
        validationSchema={commentCreateSchema}
        onSubmit={submit}
      >
        {({values, isSubmitting, setFieldValue}) => (
          <Form className={"createComment col-11 mt-2 form"}>
            <h5>Create Comment:</h5>
            <div className={"form-group createComment"}>
              <Field className="form-control" as="textarea" name="content" placeholder="" id="content" />
            </div>
            <div className="form-group text-left">
               <button type="submit" className="btn btn-dark submitCommentButton"> Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommentCreate;
