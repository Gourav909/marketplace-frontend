import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "src/components/NavBar/NavBar";
import Dashboard from "src/components/Dashboard/Dashboard";
import { fetchProperties } from "src/redux/actions/utilsAction";

const DashboardPage = () => {
  const { properties } = useSelector(
    (state) => state.fetchPropertiesReducer.properties
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperties(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <NavBar />
      <Dashboard
        properties={properties}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default DashboardPage;
