import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPillToWallet } from "../store/wallet";
import history from "../history";

const PillCalender = () => {
  var gapi = window.gapi;

  var CLIENT_ID =
    "898667664539-tdobicpipnf8c3fc6pg9pqjhr0oee1d0.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCw2s7BgKAA_tReIgazJGxFsWRfxEXVPIY";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "Awesome Event!",
            location: "800 Howard St., San Francisco, CA 94103",
            description: "Really great refreshments",
            start: {
              dateTime: "2021-12-02T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2020-06-28T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          /*
            Uncomment the following block to get events
        */
          /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
        });
    });
  };


  const user = useSelector((s) => s.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pillToAdd = { userId: user.id, pillName, dosage };
    dispatch(addPillToWallet(pillToAdd, history));
  };

  const showCal = () => {
    var iframe = document.getElementById("calendarEmbed");
    var blocker = document.getElementById("calendarEmbedBlocker");
    if (user.email && /.+\@.+/.test(user.email)) {
      iframe.src =
        "https://calendar.google.com/calendar/embed?src=" +
        encodeURI(user.email);
      blocker.style.display = "none";
    } else {
      alert("That doesn't look like a valid email...");
      blocker.style.display = "block";
    }
  };

  return (
    <div>

      <button onClick={showCal}>Load</button>
      <h3>Your calendar:</h3>
      <div id='calendarEmbedWrapper' className={"w-80 min-h-300 relative ml-8"}>
        <iframe
          id='calendarEmbed'
          className={"w-full h-full absolute"}
        ></iframe>
      </div>

    </div>
  );
};

export default PillCalender;