import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox: React.FC = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (keyword.trim()) history.push(`/search/${keyword}`);
    else history.push("/");
  }

  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        name="q"
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
