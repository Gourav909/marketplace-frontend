import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import router from "./routers";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
