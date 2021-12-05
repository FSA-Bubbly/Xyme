import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePill } from "../store/singlePill";

const SinglePill = (props) => {
  const singlePill = useSelector((s) => s.singlePill);

  const dispatch = useDispatch();

  const [pill, setPill] = useState([]);

  useEffect(() => {
    const singlePill = dispatch(fetchSinglePill(props.match.params.pillId));
    setPill(singlePill);
  }, []);

  if (pill) {
    return (
      <><h1>
        {" "}
        Drug Name: {singlePill.name}
      </h1><h2>
          Drug Concept: {singlePill.description}
        </h2>
      <h2>It may look like this...</h2>
      <img src={singlePill.image} />
      </>
    );
  } else return <div>loading...</div>;
};

export default SinglePill;
