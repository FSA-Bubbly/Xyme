import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPillToWallet } from "../store/wallet";
import history from "../history";

const AddPillForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth);
  const [pillName, setPillName] = useState("");
  const [dosage, setDosage] = useState("");
  var gapi = window.gapi;

  var CLIENT_ID =
    "898667664539-tdobicpipnf8c3fc6pg9pqjhr0oee1d0.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCw2s7BgKAA_tReIgazJGxFsWRfxEXVPIY";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleSubmit = (e) => {
    e.preventDefault();
    const pillToAdd = { userId: user.id, pillName, dosage };
    dispatch(addPillToWallet(pillToAdd, history));
  };
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
            summary: "Take Advil",
            location: "",
            description: "Do not Forget",
            start: {
              dateTime: "2021-12-02T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2021-12-15T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=TU;"],
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
            // window.open(event.htmlLink);
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
  return (
    <div>
      <Link to={"/wallet"}>Cancel</Link>
      <h3>New Pill:</h3>
      <form id='add-pill' onSubmit={handleSubmit}>
        <label htmlFor='pill-name'>Pill Name:</label>
        <input
          name='pill-name'
          value={pillName}
          onChange={(e) => setPillName(e.target.value)}
          plateholder='Enter pill name here'
        />
        <br />

        <label htmlFor=''>Doseage:</label>
        <input
          name='dosage'
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          plateholder='Enter dosage here'
        />
        <br />

        <button type='submit' onClick={handleSubmit}>
          {" "}
          <Link
            to='/wallet'
            className='py-5 px-3 text-black hover:text-gray-900 u'
          >
            add to wallet
          </Link>
        </button>
        <button
          type='submit'
          onClick={handleClick}
          className='py-5 px-3 text-black hover:text-gray-900 u'
        >
          add to calender
        </button>
      </form>
    </div>
  );
};

export default AddPillForm;
