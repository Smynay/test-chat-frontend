import { Box, Button, TextareaAutosize } from "@mui/material";
import React, { ChangeEventHandler, FC, useRef, useState } from "react";

interface IProps {
  onSend: (text: string) => void;
}

export const MessageForm: FC<IProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const preparedMessage = message.trim();

    if (preparedMessage) {
      onSend(preparedMessage);
    }

    inputRef.current!.focus();
    setMessage("");
  };

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMessage(event.target.value);
  };

  return (
    <Box display="flex">
      <Box p={2} pr={1} width={"100%"}>
        <TextareaAutosize
          ref={inputRef}
          minRows={2}
          maxRows={6}
          style={{ width: "100%" }}
          value={message}
          onChange={handleMessageChange}
        ></TextareaAutosize>
      </Box>
      <Box p={2} pl={1}>
        <Button variant={"contained"} color={"warning"} onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};
