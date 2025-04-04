import React, { useRef, useState } from "react";
import { Button } from "../common/button/Button";
import Divider from "../common/divider/Divider";
import { TextView } from "../common/text-view/TextView";
import { format } from "date-fns";
import { BiLibrary } from "react-icons/bi";
import { BsImage, BsLink45Deg } from "react-icons/bs";
import { IoGridOutline } from "react-icons/io5";
import { AiImage } from "../../assets";

const MainComponent = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<
    { request: string; response: string; createdAt: Date; isUser: boolean }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      if (textareaRef.current.scrollHeight >= 360) {
        textareaRef.current.style.height = `360px`;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;

    setResult((prev) => [
      ...prev,
      {
        request: value,
        response:
          "This is an AI response that demonstrates the styling of messages in the chat interface. It can contain multiple lines and will be styled differently from user messages.",
        createdAt: new Date(),
        isUser: true,
      },
    ]);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  return (
    <div className="z-10 flex w-full items-center justify-center px-4 pb-10">
      <div className="flex w-full max-w-[800px] flex-col gap-6">
        {/* Time Separator */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-[#4B5268]/30"></div>
          <TextView type="display-2" className="text-[#4B5268]">
            Today {format(new Date(), "h:mm a")}
          </TextView>
          <div className="h-[1px] flex-1 bg-[#4B5268]/30"></div>
        </div>

        {/* Messages Container */}
        <div className="flex h-[600px] flex-col gap-6 overflow-y-auto pr-4">
          {result.map(({ request, response, createdAt, isUser }, i) => (
            <div className="flex flex-col gap-6" key={i}>
              {/* User Message */}

              <div className="flex max-w-[500px] gap-3">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <img
                    src="https://placehold.co/32x32"
                    alt="user-image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <TextView type="display-2">User name</TextView>
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
                    {request}
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex gap-3">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blue-600">
                  <img
                    src={AiImage}
                    alt="AI"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
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
                    {response}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-neutral-650 flex flex-col gap-4 rounded-2xl border border-[#4B5268] p-4">
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
              Send message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
