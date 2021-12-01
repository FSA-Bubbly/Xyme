import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addPillToWallet } from "../store/wallet";
import history from "../history";
import DatePicker from "react-datepicker";


// we want to grab and render the pills depending on their frequency being 1 or 2, and the elapsed time from the date.now and the expected next time. At the end of the day we want to counter the expencted next time by 24 hours and restart the cycle.

// backend has to adjust the expected next date when we've completed a full cycle.

// backend also has to decipher which pills in wallet have frequency of 1 or 2.
// if frequency of 1 - 0900
// if frequency of 2 = 0900 and 2100


// if date.now is before time slot 1, render pills with both frequency of 1 and 2

// time slot 1 0900

// if date.now is after time slot 1 but before time slot 2, render pills with only with frequency of 2

//time slot 2 2100

// if date.now is after both time slot 1 and after time slot 2, render neither pills with frequency of 1 or 2 (you've taken all pills for today)

// when date.now is equal to 24 hours past the expected next date, expected next date gets increased by 24 hours and cycle restarts.

// when the pill has been taken, we want to mark it off and adjust the pill in db to be taken/not taken, wallet view will reflect taken/not taken

// every rest in cycle will reset the taken field to false

const DailyPillView = {

  

}
