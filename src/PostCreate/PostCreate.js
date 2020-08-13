import React, {useContext, useState} from "react";
import { Field, Form, Formik } from "formik";
import { PostCreateSchema } from "./PostCreateSchema";
import config from "../config/index";
import { useHistory } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import createPostImage from "./create-post-image.jpeg";

import "./PostCreate.scss";
import {ImageInput} from "../ImageInput/ImageInput";
import {UserContext} from "../context/userContext";

function PostCreate() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [postImage, setPostImage] = useState(null);

  const submit = async (values) => {
    try {
      setIsProcessing(true);
      await fetch(`${config.apiUrl}/posts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.token,
        },
        credentials: "include",
        body: JSON.stringify({...values, image: postImage}),
      });

      history.push("/");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="createPost row d-flex justify-content-center align-items-start mt-sm-4 mt-0">
      <div className="createPostImage col-12 col-md-6 d-flex justify-content-md-end justify-content-center flex-column">
        <img aria-hidden alt="Cute picture" src={postImage || createPostImage} />
      </div>
      <div className="col-12 col-md-6 justify-content-md-end justify-content-center">
        <Formik
          initialValues={{ description: "" }}
          validationSchema={PostCreateSchema}
          onSubmit={submit}
        >
          {({isSubmitting, setFieldValue}) => (
            <Form className={"createPostForm col-12 mt-2 form"}>
              <h2>Create post</h2>
              <div className={"form-group createPostImage"}>
                <ImageInput id={"postImage"} onChange={(image) => setPostImage(image)} />
              </div>
              <div className={"form-group createPostDescription"}>
                <label className="" htmlFor="description">Description</label>
                <Field className="form-control" as="textarea" name="description" placeholder="" id="description" />
              </div>
              <div className="form-group text-left">
                {isProcessing ? <div><LoadingIndicator /></div> : <button type="submit" className="btn btn-dark submitPostButton"> Post</button>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PostCreate;
