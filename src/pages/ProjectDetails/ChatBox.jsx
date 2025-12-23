import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/Redux/Chat/Action";
import { useParams } from "react-router-dom";

function ChatBox() {

  const [message, setMessage] = useState("")
  const dispatch = useDispatch();
  const { auth, chat } = useSelector(store => store)
  const { id } = useParams()

  const handleSendMessage = () => {
    dispatch(sendMessage({
      senderId: auth.user?.id,
      projectId: id,
      content: message
    }))
    setMessage("")
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id]);

  // useEffect(() => {
  //   if (chat.chat?.id) {
  //     dispatch(fetchChatMessages(chat.chat.id));
  //   }
  // }, [chat.chat?.id]);/

  useEffect(() => {
    if (id) {
      dispatch(fetchChatMessages(id));
    }
  }, [id]);


  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex flex-col gap-3">
          {/* {chat.messages?.map((item, index) =>
            index % 2 === 0 ? (
              <div className="flex items-start gap-2 mb-2" key={index}>
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div className="space-y-1 py-2 px-4 border rounded-ss-2xl rounded-e-xl">
                  <p className="font-medium">{item.sender?.fullName}</p>
                  <p className="text-gray-500">{item.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-end gap-2 mb-2" key={index}>
                <div className="space-y-1 py-2 px-4 border rounded-se-2xl rounded-s-xl bg-gray-100">
                  <p className="font-medium">You</p>
                  <p className="text-gray-500">I’m good!</p>
                </div>
                <Avatar>
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              </div>
            )
          )} */}
          {chat.messages?.map((item, index) => (
            item.sender?.id === auth.user?.id ? ( // ✅ check real sender
              <div className="flex items-start justify-end gap-2 mb-2" key={index}>
                <div className="space-y-1 py-2 px-4 border rounded-se-2xl rounded-s-xl bg-gray-100">
                  <p className="font-medium">You</p>
                  <p className="text-gray-500">{item.content}</p> {/* ✅ show actual content */}
                </div>
                <Avatar>
                  <AvatarFallback>
                    {auth.user?.fullName?.[0] || "Y"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex items-start gap-2 mb-2" key={index}>
                <Avatar>
                  <AvatarFallback>
                    {item.sender?.fullName?.[0] || "R"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 py-2 px-4 border rounded-ss-2xl rounded-e-xl">
                  <p className="font-medium">{item.sender?.fullName}</p>
                  <p className="text-gray-500">{item.content}</p>
                </div>
              </div>
            )
          ))}

        </ScrollArea>
        <div className="relative p-2 border-t">
          <Input
            className="py-7 border-t outline-none focus:outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            placeholder="type message..."
            value={message}
            onChange={handleMessageChange} />
          <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full" size="icon" variant="ghost">
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
