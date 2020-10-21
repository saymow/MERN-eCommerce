import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: string;
}

const Message: React.FC<MessageProps> = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
