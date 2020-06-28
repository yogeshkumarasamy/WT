import React, { useState, createContext, useReducer } from "react";
import trackerReducer from "./tracker-reducer";

const initial_state = {};

export const TrackerContext = createContext(initial_state);

export const TrackerProvider = props => {
  // const [loading, setLoading] = useState(true);
  // const [tracker, dispatch] = useReducer(trackerReducer, initial_state);

  return (
    <TrackerContext.Provider value={{ test: "test" }}>
      {props.children}
    </TrackerContext.Provider>
  );
};
