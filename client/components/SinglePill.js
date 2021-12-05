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
      </h1>
      <br/>
      <h2>
          Generic Drug Concept (may not refer to drug by brand name): {singlePill.description}
        </h2>
        <br/>
      <h2>It may look like this...</h2>
      <img src={singlePill.image} />
      </>
    );
  } else return <div>loading...</div>;
};

export default SinglePill;
