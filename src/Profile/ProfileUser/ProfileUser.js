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
  const [userStats, setUserStats] = useState({});
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
    const getUserStats = async () => {
      try {
        const result = await fetch(`${config.apiUrl}/users/${profile._id}/stats`, {
          credentials: "include",
        })
        if (result.status === 200) {
          const stats = await result.json();
          setUserStats(stats);
          setFollow(stats.isFollowedByCurrentUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserStats();
  }, [profile._id, follow])



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

  const unfollowUser = async () => {
    const result = await fetch(`${config.apiUrl}/users/${profile._id}/unfollow`, {
      method: "POST",
      credentials: "include"
    });
    if (result.status === 200) {
      console.log(result);
      setFollow(false);
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
            Posts: {userStats.postsCount}
          </div>
          <div className="ml-3">Following: {userStats.followsCount}</div>
          <div className="ml-3">Followed: {userStats.followersCount}</div>
        </div>
        <div className="profileBio mt-1">{profile.bio}</div>
        <div className="mt-1">
          {props.userId === user._id && <Link aria-label={"Edit profile"} to={"/profile/edit"} className={"editProfileIcon"}>
            <FontAwesomeIcon aria-hidden={true} icon={faUserEdit} />
          </Link>}
        </div>
        {profile._id !== user._id && (follow
          ? <button onClick={unfollowUser} type="button" className="followButton btn btn-dark btn-sm">
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
