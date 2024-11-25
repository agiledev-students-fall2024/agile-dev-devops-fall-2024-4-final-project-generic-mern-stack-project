import React, { useState, useEffect } from "react";
import { BsSearchHeart } from "react-icons/bs";
import axios from "axios";

const Blocked = (props) => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleMute = () => {
    if (input) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/muted-words`,
          { request: "mute", word: input, words: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setInput("");
          setMessage(response.data.message);
          setData(response.data.words);
        })
        .catch((err) => {
          console.log("Failed to mute word");
          console.log(err);
        });
    }
  };

  const handleBlockC = () => {
    if (input) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-communities`,
          { request: "block", name: input, communities: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setInput("");
          setMessage(response.data.message);
          setData(response.data.communities);
        })
        .catch((err) => {
          console.log("Failed to block community");
          console.log(err);
        });
    }
  };

  const handleBlockU = () => {
    if (input) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-users`,
          {
            withCredentials: true,
          },
          { request: "block", user: input, users: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setInput("");
          setMessage(response.data.message);
          setData(response.data.users);
        })
        .catch((err) => {
          console.log("Failed to block user");
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    let url = "";

    // set api url based on type of data needed
    if (props.type === "blocked_users") {
      url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-users`;
    }
    if (props.type === "blocked_communities") {
      url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-communities`;
    }
    if (props.type === "muted_words") {
      url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/muted-words`;
    }

    // fetch data
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(`Could not get data.`);
        console.error(err);
      });
  }, [props.type]);

  const handleClick = async (e, id) => {
    e.preventDefault();

    if (props.type === "blocked_users") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-users/`,
          {
            withCredentials: true,
          },
          { request: "unblock", id: id, users: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("Failed to unblock user");
          console.log(err);
        });
    }

    if (props.type === "blocked_communities") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/blocked-communities/`,
          { request: "unblock", id: id, communities: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("Failed to unblock community");
          console.log(err);
        });
    }

    if (props.type === "muted_words") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/muted-words/`,
          { request: "unmute", id: id, words: data },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("Failed to unmute word");
          console.log(err);
        });
    }
  };

  // blocked users page
  if (props.type === "blocked_users") {
    return (
      <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-xl text-ebony-700 text-center font-bold">
          {props.text}
        </h1>
        {/* input bar at top */}
        <div className="flex flex-row justify-center w-[50%]">
          <input
            className="h-10 px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold rounded-md placeholder-rose-600 rounded-r-none"
            type="text"
            placeholder="Enter a user to block"
            onChange={handleChange}
            value={input || ""}
          />
          <button
            onClick={handleBlockU}
            className="h-10 rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[15%] md:w-[10%] lg:w-[8%] flex flex-col justify-center items-center rounded-l-none"
          >
            <BsSearchHeart size={24} />
          </button>
        </div>
        <p className="mt-2 text-center text-ebony">{message}</p>
        <div>
          {/* if user has blocked users */}
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center space-x-40 bg-lavender_blush-900 py-4 px-8 border-[1px] border-rose-900 w-full"
              >
                <p className="text-ebony font-bold">{item.username}</p>
                <button
                  className="text-ebony-700 font-bold border border-ebony-800 py-1 px-2 rounded-md hover:border-rose hover:text-rose"
                  onClick={(e) => handleClick(e, item.id)}
                >
                  Unblock
                </button>
              </div>
            ))
          ) : (
            // if no blocked users
            <p className="text-center text-ebony-700">
              You have no blocked users!
            </p>
          )}
        </div>
      </div>
    );
  }
  // blocked communities page
  else if (props.type === "blocked_communities") {
    return (
      <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-xl text-ebony-700 text-center font-bold">
          {props.text}
        </h1>
        {/* input bar at top */}
        <div className="flex flex-row justify-center w-[50%]">
          <input
            className="h-10 px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold rounded-md placeholder-rose-600 rounded-r-none"
            type="text"
            placeholder="Enter a community to block"
            onChange={handleChange}
            value={input || ""}
          />
          <button
            onClick={handleBlockC}
            className="h-10 rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[15%] md:w-[10%] lg:w-[8%] flex flex-col justify-center items-center rounded-l-none"
          >
            <BsSearchHeart size={24} />
          </button>
        </div>
        <p className="mt-2 text-center text-ebony">{message}</p>
        <div>
          {/* if user has blocked communities */}
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center space-x-40 bg-lavender_blush-900 py-4 px-8 border-[1px] border-rose-900 w-full"
              >
                <p className="text-ebony font-bold">{item.community}</p>
                <button
                  className="text-ebony-700 font-bold border border-ebony-800 py-1 px-2 rounded-md hover:border-rose hover:text-rose"
                  onClick={(e) => handleClick(e, item.id)}
                >
                  Unblock
                </button>
              </div>
            ))
          ) : (
            // if no blocked communities
            <p className="text-center text-ebony-700">
              You have no blocked communities!
            </p>
          )}
        </div>
      </div>
    );
  }
  // muted words page
  else if (props.type === "muted_words") {
    return (
      <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-xl text-ebony-700 text-center font-bold">
          {props.text}
        </h1>
        {/* input bar at top */}
        <div className="flex flex-row justify-center w-[50%]">
          <input
            className="h-10 px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold rounded-md placeholder-rose-600 rounded-r-none"
            type="text"
            placeholder="Enter a word to mute"
            onChange={handleChange}
            value={input || ""}
          />
          <button
            onClick={handleMute}
            className="h-10 rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[15%] md:w-[10%] lg:w-[8%] flex flex-col justify-center items-center rounded-l-none"
          >
            <BsSearchHeart size={24} />
          </button>
        </div>
        <p className="mt-2 text-center text-ebony">{message}</p>
        <div>
          {/* if user has muted words */}
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center space-x-40 bg-lavender_blush-900 py-4 px-8 border-[1px] border-rose-900 w-full"
              >
                <p className="text-ebony font-bold">{item.muted_word}</p>
                <button
                  className="text-ebony-700 font-bold border border-ebony-800 py-1 px-2 rounded-md hover:border-rose hover:text-rose"
                  onClick={(e) => handleClick(e, item.id)}
                >
                  Unmute
                </button>
              </div>
            ))
          ) : (
            // if no muted words
            <p className="text-center text-ebony-700">
              You have no muted words!
            </p>
          )}
        </div>
      </div>
    );
  }
};

export default Blocked;
