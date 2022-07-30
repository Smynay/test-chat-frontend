import React, { FC } from "react";
import { Box } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useRefWithScrollToBottom,
} from "../../common/hooks";
import { MessageForm, MessageRoll } from "../../components/organisms";
import { send } from "../../../store/features/chat";
import { Navigate } from "react-router-dom";

export const Chat: FC = () => {
  const chat = useAppSelector((state) => state.chat);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const rollRef = useRefWithScrollToBottom();

  const handleSend = (text: string) => {
    if (user.userData) {
      dispatch(
        send({
          senderId: user.userData.id,
          senderName: user.userData.name,
          text,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  if (!user.isAuthorized) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Box height={"800px"} display={"flex"} flexDirection={"column"}>
      <Box
        flexGrow={1}
        position={"relative"}
        maxHeight={"100%"}
        overflow={"auto"}
        ref={rollRef}
      >
        <MessageRoll
          currentUserId={user.userData?.id}
          messages={chat.messages}
        />
      </Box>
      <MessageForm onSend={handleSend} />
    </Box>
  );
};
