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
      <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-20 md:p-20 overflow-scroll '><h1>
        {" "}
        Drug Name: {singlePill.name}
      </h1>
      <br/>
      <h2>It may look like this...</h2>
      <img src={singlePill.image} />
      <h2>
          Generic Drug Concept (may not refer to drug by brand name): {singlePill.description}
        </h2>
        <br/>

      </div>
    );
  } else return <div>loading...</div>;
};

export default SinglePill;
