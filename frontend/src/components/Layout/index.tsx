import React from "react";
import { Container } from "react-bootstrap";

import Footer from "../Footer";
import Header from "../Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
