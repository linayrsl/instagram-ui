import React, {useEffect, useState} from 'react';
import config from "../config/index";
import SearchResult from "./SearchResult/SearchResult";
import noResultImage from "./no-result-image.jpg";

import "./Search.scss";

let searchTimeout = null;

function Search() {

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [requestProcess, setRequestProcess] = useState(false);

  useEffect(() => {
    const searchUser = async (event) => {
      try {
        const result = await fetch(`${config.apiUrl}/users?username=${query}`, {
          credentials: "include",
        });
        if (result.status === 200) {
          const users = await result.json();
          console.log(users);
          setUsers(users);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (!query) {
      setUsers([]);
    } else {
      setRequestProcess(true);
      searchTimeout = setTimeout(
        () => {
          searchUser().then(() => {
            searchTimeout = null;
            setRequestProcess(false);
          })
        }, 500);
    }
  }, [query]);

  return (
    <div className={"search container-fluid mt-4"}>
      <div className={"row"}>
        <div className={"offset-0 offset-sm-2 col-sm-8 col-12 d-inline-block"}>
          <input
            placeholder={"Start typing to search users..."}
            value={query}
            onChange={(event) => setQuery(event.target.value)} type={"text"}/>
          {users && users.map((user) => <SearchResult user={user} key={user._id} />)}
          {(!requestProcess && query && users.length === 0) &&
          <div className={"emptyResultNotification mt-1"}>
            <img src={noResultImage} alt={""} />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Search;
