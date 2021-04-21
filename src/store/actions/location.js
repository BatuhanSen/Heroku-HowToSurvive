import axios from "axios";

import * as actionTypes from "./actionTypes";

export const newloc = (user, city, latitude, longitude) => {
  return (dispatch) => {
    axios
      .post(
        "https://how-to-survive.herokuapp.com/api/location",
        {
          userId: localStorage.getItem("userId"),
          city: city,
          latitude: latitude,
          longitude: longitude,

        },
        { headers: { "Content-type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          //dispatch(setLoc(response.data.data.user, response.data.data.token));
          console.log(response);
        } else {
          dispatch(

          );
        }
      })
      .catch((err) => {
        //dispatch(err.response);
        console.log("ERROR: ", err.response);
      });
  };
};

export const setLoc = (location) => {
  return {
    type: actionTypes.SET_LOC,
    location: location,
  };
};