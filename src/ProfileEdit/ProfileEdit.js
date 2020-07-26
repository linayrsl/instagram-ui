import React, {useContext, useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {ImageInput} from "../ImageInput/ImageInput";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import config from "../config";
import editProfileImage from "./edit-profile-image.png";
import "./ProfileEdit.scss";
import {ProfileEditSchema} from "./ProfileEditSchema";
import {UserContext} from "../context/userContext";


function ProfileEdit() {

  const { user, setUser } = useContext(UserContext);
  const [postImage, setPostImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({biography: null});

  useEffect(() => {

  }, [user]);

  const submit = async (values) => {
    try {
      setIsProcessing(true);
      const result = await fetch(`${config.apiUrl}/user/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({...values, image: postImage}),
      });
      if (result.status === 200) {
        setIsProcessing(false);
        console.log(result);
        setUser(await result.json());
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="editProfile row d-flex justify-content-center align-items-start mt-sm-4 mt-2">
      <div className="createPostImage col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
        <img aria-hidden src={postImage || editProfileImage} />
      </div>
      <div className="col-12 col-md-6 justify-content-md-end justify-content-center">
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={ProfileEditSchema}
          onSubmit={submit}
        >
          {({values, isSubmitting, setFieldValue}) => (
            <Form className={"editProfileForm col-12 mt-2 form"}>
              <h2>Edit profile</h2>
              <div className={"form-group editAvatarProfile"}>
                <ImageInput id={"postImage"} onChange={(image) => setPostImage(image)} />
              </div>
              <div className={"form-group editProfileBiography"}>
                <label className="" htmlFor="biography">Biography</label>
                <Field value={values.biography} className="form-control" as="textarea" name="biography" placeholder="" id="biography" />
              </div>
              <div className="form-group text-left">
                {isProcessing ? <div><LoadingIndicator /></div> : <button type="submit" className="btn btn-dark submitPostButton"> Edit</button>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileEdit;
