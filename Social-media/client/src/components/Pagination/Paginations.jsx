import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

const Paginations = () => {
  return (
    <Pagination
      className="ul"
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => {
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />;
      }}
    />
  );
};

export default Paginations;
