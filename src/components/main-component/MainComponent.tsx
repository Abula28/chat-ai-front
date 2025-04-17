import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { BiLibrary } from "react-icons/bi";
import { BsImage, BsLink45Deg } from "react-icons/bs";
import { IoGridOutline } from "react-icons/io5";
import { AiImage } from "../../assets";
import { isAuth } from "../../utils/helperFuncs";
import { Modal, Divider, Button, TextView } from "../common";
import Login from "../auth-components/login/Login";
import Register from "../auth-components/register/Register";
import useAuthModalStore from "../../store/authModalStore";
import { useParams, useNavigate } from "react-router";
import {
  useCreateSession,
  useGetSessionMessages,
  useSendMessage,
} from "../../backend/requests/chat";
import { GetSessionMessagesResT } from "../../backend/types";
import useUserStore from "../../store/userStore";
import useLayoutStore from "../../store/sidebarStore";
import ReactMarkdown from "react-markdown";
import { useQueryClient } from "@tanstack/react-query";
const MainComponent = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { isOpen, setIsOpen, isLogin, setIsLogin } = useAuthModalStore();
  const { selectedPrompt } = useLayoutStore();
  const { data: user } = useUserStore();
  const queryClient = useQueryClient();

  const { mutate: getSessionMessages, isPending: isSessionLoading } =
    useGetSessionMessages();
  const { mutate: postMessage, isPending: isMessageSending } = useSendMessage();
  const { mutate: createSession } = useCreateSession();

  const [messages, setMessages] = useState<GetSessionMessagesResT[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      if (textareaRef.current.scrollHeight >= 100) {
        textareaRef.current.style.height = `100px`;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleSendMessage = (id: string) => {
    if (!isAuth) return;
    postMessage(
      {
        sessionId: id,
        content: value,
        systemId: selectedPrompt!,
      },
      {
        onSuccess: () => {
          getSessionMessages(id, {
            onSuccess: (data) => {
              setMessages(data);
            },
          });
        },
      },
    );
  };

  const handleSubmit = () => {
    if (!isAuth()) {
      setIsOpen(true);
      return;
    }
    if (!value.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(), // temporary ID
        sessionId: sessionId as string,
        content: value,
        sender: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as GetSessionMessagesResT,
    ]);

    if (!sessionId) {
      const title = value.length > 20 ? value.slice(0, 17) + "..." : value;

      createSession(
        { title },
        {
          onSuccess: (data) => {
            navigate(`/${data.sessionId}`, { replace: true });
            handleSendMessage(data.sessionId);
            queryClient.invalidateQueries({ queryKey: ["useGetUserSessions"] });
          },
        },
      );
    } else {
      handleSendMessage(sessionId as string);
    }

    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsLogin(true);
  };

  useEffect(() => {
    if (!sessionId || !isAuth()) {
      setMessages([]);
      return;
    }
    getSessionMessages(sessionId, {
      onSuccess: (data) => {
        setMessages(data);
      },
    });
  }, [sessionId]);

  const messageRenderer = () => {
    if (isSessionLoading) return <div>Loading...</div>;
    if (messages.length === 0)
      return (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <TextView type="display-8" weight="medium">
              Start Conversation
            </TextView>
            <TextView type="display-3" weight="medium">
              No messages yet
            </TextView>
          </div>
        </div>
      );
    return (
      <div className="flex h-[600px] flex-col gap-6 overflow-y-auto pr-4">
        {messages.map(({ content, sender, createdAt, _id }) => (
          <div className="flex w-full flex-col gap-6" key={_id}>
            {/* User Message */}
            {sender === "user" && (
              <div className="flex w-full gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                  <TextView
                    type="display-2"
                    weight="medium"
                    className="text-black"
                  >
                    {user?.username.charAt(0).toUpperCase()}
                  </TextView>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <TextView type="display-2">{user?.username}</TextView>
                    <Divider type="vertical" />
                    <TextView
                      type="display-2"
                      className="text-textView-neutral"
                      weight="medium"
                    >
                      {format(createdAt, "h:mm a")}
                    </TextView>
                  </div>
                  <div className="max-h-96 overflow-y-auto whitespace-pre-wrap break-words rounded-lg text-[#ACB4C0]">
                    {content}
                  </div>
                </div>
              </div>
            )}

            {/* AI Response */}
            {sender === "assistant" && (
              <div className="flex w-[90%] gap-3">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blue-600">
                  <img
                    src={AiImage}
                    alt="AI"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <TextView type="display-2">LanguageGUI</TextView>
                    <Divider type="vertical" />
                    <TextView
                      type="display-2"
                      className="text-textView-neutral"
                      weight="medium"
                    >
                      {format(createdAt, "h:mm a")}
                    </TextView>
                  </div>
                  <div className="rounded-lg bg-[#1E2235] p-4 text-[#ACB4C0]">
                    <div className="prose prose-invert max-w-none overflow-x-auto break-words">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isMessageSending && <div>Loading...</div>}
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={isLogin ? "Log in" : "Sign up"}
      >
        <div className="flex items-center justify-center gap-2">
          <TextView type="paragraph-small" weight="medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </TextView>
          <TextView
            type="paragraph-small"
            weight="medium"
            className="cursor-pointer text-primary-100"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </TextView>
        </div>
        {isLogin ? <Login /> : <Register />}
      </Modal>
      <div className="z-10 flex h-full w-full items-center justify-center px-4 py-5">
        <div className="flex h-full w-full max-w-[900px] flex-col justify-between gap-6">
          {/* Messages Container */}
          {messageRenderer()}

          {/* Input Area */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#4B5268] bg-neutral-650 p-4">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="How can I help you?"
              className="min-h-[40px] w-full resize-none bg-[unset] outline-none"
            />

            <Divider />

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <BiLibrary className="h-5 w-5 cursor-pointer text-[#4B5268] hover:text-[#6B7280]" />
                <BsImage className="h-5 w-5 cursor-pointer text-[#4B5268] hover:text-[#6B7280]" />
                <BsLink45Deg className="h-5 w-5 cursor-pointer text-[#4B5268] hover:text-[#6B7280]" />
                <IoGridOutline className="h-5 w-5 cursor-pointer text-[#4B5268] hover:text-[#6B7280]" />
              </div>

              <Button
                className="!rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={handleSubmit}
              >
                {isAuth() ? "Send message" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
