import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate: React.FC<Props> = ({
  pages,
  page,
  isAdmin = false,
  keyword,
}) => {
  return pages === 1 ? null : (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
