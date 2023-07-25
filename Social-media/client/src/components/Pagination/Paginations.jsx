import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/posts";

const Paginations = ({ page }) => {
  const dispatch = useDispatch();

  const { numberOfPage } = useSelector((state) => state.posts);
  // console.log(numberOfPage);
  useEffect(() => {
    if (page) {
      // send action
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      className="ul"
      count={numberOfPage}
      page={Number(page) || 1}
      // variant="outlined"
      color="secondary"
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        );
      }}
    />
  );
};

export default Paginations;
