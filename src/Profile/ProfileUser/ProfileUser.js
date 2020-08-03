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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follow, setFollow] = useState(false);
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

  useEffect(() => {
    if (!profile._id) {
      return;
    }
    const getFollowers = async () => {
      try {
        const result = await fetch(`${config.apiUrl}/users/${profile._id}/follow/followers`, {
          credentials: "include",
        })
        if (result.status === 200) {
          setFollowers(await result.json());
        }
      } catch (error) {
        console.log(error);
      }
    }
    getFollowers();
  }, [profile._id])

  useEffect(() => {
    if (!profile._id) {
      return;
    }
    const getFollowing = async () => {
      try {
        const result = await fetch(`${config.apiUrl}/users/${profile._id}/follow/following`, {
          credentials: "include",
        });
        if (result.status === 200) {
          setFollowing(await result.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getFollowing();
  }, [profile._id])

  useEffect(() => {
    if (followers.find((follow) => follow.userId === user._id)) {
      setFollow(true);
    }
  }, [followers, user._id])

  const followUser = async () => {
    const result = await fetch(`${config.apiUrl}/users/${profile._id}/follow`, {
      method: "PUT",
      credentials: "include",
    });
    if (result.status === 201) {
      console.log(result);
      setFollow(true);
      console.log(follow);
    }
  }

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
          <div className="ml-3">Following: {following.length}</div>
          <div className="ml-3">Followed: {followers.length}</div>
        </div>
        <div className="profileBio mt-1">{profile.bio}</div>
        <div className="mt-1">
          {props.userId === user._id && <Link aria-label={"Edit profile"} to={"/profile/edit"} className={"editProfileIcon"}>
            <FontAwesomeIcon aria-hidden={true} icon={faUserEdit} />
          </Link>}
        </div>
        {profile._id !== user._id && (follow
          ? <button type="button" className="followButton btn btn-dark btn-sm">
              Unfollow
            </button>
          : <button onClick={followUser} type="button" className="followButton btn btn-dark btn-sm">
              Follow
            </button>)}
      </div>
    </div>
  );
}

export default ProfileUser;
