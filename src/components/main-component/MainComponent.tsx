import React, { useEffect, useRef, useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { BsImage, BsLink45Deg } from "react-icons/bs";
import { IoGridOutline } from "react-icons/io5";
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
import useLayoutStore from "../../store/sidebarStore";
import MessagesComponent from "./components/MessagesComponent";
import { useQueryClient } from "@tanstack/react-query";
import ForgotPassword from "../auth-components/forgot-password/ForgotPassword";

const MainComponent = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { isOpen, setIsOpen, authState, setAuthState } = useAuthModalStore();
  const { selectedPrompt } = useLayoutStore();
  const queryClient = useQueryClient();

  const { mutate: getSessionMessages } = useGetSessionMessages();
  const { mutate: postMessage } = useSendMessage();
  const { mutate: createSession } = useCreateSession();
  const [isSending, setIsSending] = useState(false);

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

  const handleSendMessage = (id: string, userTempId: string) => {
    if (!isAuth()) return;

    setIsSending(true);
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
              const filtered = data.filter(
                (msg) =>
                  msg._id !== userTempId && msg._id !== userTempId + "-ai",
              );
              setMessages(filtered);
            },
          });
        },
        onSettled: () => {
          setIsSending(false);
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

    const tempId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      {
        _id: tempId,
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
            handleSendMessage(data.sessionId, tempId);
            queryClient.invalidateQueries({ queryKey: ["useGetUserSessions"] });
          },
        },
      );
    } else {
      handleSendMessage(sessionId as string, tempId);
    }

    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setAuthState("login");
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

  const authModalTitle = () => {
    if (authState === "login") return "Log in";
    if (authState === "register") return "Sign up";
    return "Forgot Password";
  };

  const authModalContentRenderer = () => {
    if (authState === "login") return <Login />;
    if (authState === "register") return <Register />;
    if (authState === "forgotPassword") return <ForgotPassword />;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={authModalTitle()}
      >
        {authState !== "forgotPassword" && (
          <div className="flex items-center justify-center gap-2">
            <TextView type="paragraph-small" weight="medium">
              {authState === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </TextView>
            <TextView
              type="paragraph-small"
              weight="medium"
              className="cursor-pointer text-primary-100"
              onClick={() =>
                setAuthState(authState === "login" ? "register" : "login")
              }
            >
              {authState === "login" ? "Sign up" : "Log in"}
            </TextView>
          </div>
        )}
        {authModalContentRenderer()}
      </Modal>

      <div className="z-10 flex h-full w-full items-center justify-center px-4 py-5">
        <div className="flex h-full w-full max-w-[900px] flex-col justify-between gap-6">
          {/* Messages Container */}
          <MessagesComponent data={messages} isSending={isSending} />

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
                {isAuth() ? "Send" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
