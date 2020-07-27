import React, {useContext, useEffect, useState} from 'react';
import Avatar from "../../common/Avatar/Avatar";
import config from "../../config/index";
import "./ProfileUser.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/userContext";


function ProfileUser(props) {

  const [profile, setProfile] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUser = async() => {
      try {
        const result = await fetch(`${config.apiUrl}/users/${props.userId}`, {
          credentials: "include"
        });
        if (result.status === 200) {
          setProfile(await result.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [props.userId]);

  return (
    <div className={"profileUser mt-sm-5 mt-3 row"}>
      <div className="col-sm-4 d-flex justify-content-sm-end justify-content-center">
        <Avatar image={profile.avatar} size={"lg"}/>
      </div>
      <div className="col-sm-4 align-items-center justify-content-center">
        <h4 className={"userProfileDetails"}>
        {profile.username}
        </h4>
        <div className="profileUserDetails d-flex align-items-center">
          <div>
            posts: {props.postsNum}
          </div>
          <div className="ml-3">Followers: 0</div>
          <div className="ml-3">Following: 0</div>
        </div>
        <div className="profileBio mt-1">{profile.bio}</div>
        <div className="mt-1">
          {props.userId === user._id && <Link aria-label={"Edit profile"} to={"/profile/edit"} className={"editProfileIcon"}>
            <FontAwesomeIcon aria-hidden={true} icon={faUserEdit} />
          </Link>}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
