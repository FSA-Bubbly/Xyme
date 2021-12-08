import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePill } from "../store/singlePill";

const SinglePill = (props) => {
  // const singlePill = useSelector((s) => s.singlePill);

  // const dispatch = useDispatch();

  // const [pill, setPill] = useState([]);

  const pill = props.location.state.pill;

  // useEffect(() => {
  //   const singlePill = dispatch(fetchSinglePill(props.match.params.pillId));
  //   setPill(singlePill);
  // }, []);

  return (
    <div>
      <div className="flex flex-col  ">
        <div className="flex items-center justify-center ">
          <div className="bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200">
            <div className="flex items-center justify-center pt-10 flex-col">
              <h1 className="  self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 dark:text-black-200 text-gray-800 ">
                {pill.name}
              </h1>
              <img src={pill.image} className="w-49" />
              <h1 className="text-gray-500 text-sm p-4 text-center font-bold">
                Generic drug description (may not refer to your substance by
                brand name):
              </h1>
              <h2 className="text-gray-500 text-sm p-4 text-left">
                {pill.description}
              </h2>
            </div>
            <div className="flex justify-evenly py-4">
              <div>
                <Link
                  to={`/wallet`}
                  className=" dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800"
                >
                  Return to Wallet
                </Link>
              </div>
              <div>
                <Link
                  to={{
                    pathname: `/wallet/select/${pill.id}/edit`,
                    state: { pill: pill },
                  }}
                  className=" dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800"
                >
                  Edit Pill
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePill;
