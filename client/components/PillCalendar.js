import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
// import  'react-big-calendar/lib/css/react-big-calendar.css'

import React, { useRef } from "react";
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const PillCalendar = (props) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
        efaultView="month"
        style={{ height: "100vh" }}
      />
    </div>
  );
};
export default PillCalendar;
