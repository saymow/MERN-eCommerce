import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<Props> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> PROSHOP | {title} </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Home",
  description: "The best products for the cheap",
  keywords: "eletronics, buy eletronics",
};

export default Meta;
