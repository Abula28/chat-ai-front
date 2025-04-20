import { format } from "date-fns";
import {
  useGetSessionMessages,
  useSendMessage,
} from "../../../backend/requests/chat";
import { Divider, TextView } from "../../common";
import ReactMarkdown from "react-markdown";
import { AiImage } from "../../../assets";
import useUserStore from "../../../store/userStore";
import { GetSessionMessagesResT } from "../../../backend";
import { useParams } from "react-router";
import { AssistantLoader } from "../../common/loader/Loader";

const MessagesComponent = ({
  data,
  isSending,
}: {
  data: GetSessionMessagesResT[];
  isSending: boolean;
}) => {
  const { data: user } = useUserStore();

  const { isPending } = useGetSessionMessages();
  const { sessionId } = useParams();

  if (isPending) return <div>Loading...</div>;

  if (data.length === 0 && !sessionId)
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
      {data.map(({ content, sender, createdAt, _id }) => (
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
      {isSending && <AssistantLoader />}
    </div>
  );
};

export default MessagesComponent;
