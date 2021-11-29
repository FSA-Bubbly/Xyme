import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addPillToWallet } from "../store/wallet";
import { useSelector } from "react-redux";
import history from "../history";

const PillCalender = () => {
  useEffect(() => {
    showCal();
  });

  const user = useSelector((s) => s.auth);

  const showCal = () => {
    var iframe = document.getElementById("calendarEmbed");

    var blocker = document.getElementById("calendarEmbedBlocker");
    if (user.email && /.+\@.+/.test(user.email)) {
      iframe.src =
        "https://calendar.google.com/calendar/embed?src=" +
        encodeURI(user.email);
    } else {
      alert("That doesn't look like a valid email...");
    }
  };

  return (
    <div>
      <h3>Your calendar:</h3>
      <div
        id='calendarEmbedWrapper'
        className={" h-0 relative pb-9/12 overflow-scroll"}
      >
        <iframe
          id='calendarEmbed'
          className={"w-full h-full absolute bg top-0 left-0"}
        ></iframe>
      </div>
    </div>
  );
};

export default PillCalender;
