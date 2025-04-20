import React, { useState } from "react";
import {
  useGetAllMessagesReq,
  useDeleteMessageReq,
} from "../../backend/requests/admin";
import { toast } from "react-toastify";
import { Loader } from "../common/loader/Loader";
import { ErrorResT } from "../../backend";
import { format } from "date-fns";

const Messages: React.FC = () => {
  const [filter, setFilter] = useState<{
    sender?: "assistant" | "user";
    username: string;
  }>({
    sender: undefined,
    username: "",
  });
  const { data: messages, isLoading } = useGetAllMessagesReq(filter.sender);

  const { mutate: deleteMessage } = useDeleteMessageReq();

  const handleDelete = async (id: string) => {
    deleteMessage(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          (error as ErrorResT).response?.data.message || "An error occurred",
        );
      },
    });
  };

  const filteredMessages = messages?.messages.filter((message) => {
    if (filter.sender && message.sender !== filter.sender) return false;
    if (
      filter.username &&
      !message.username.toLowerCase().includes(filter.username.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-6">
        <div>
          <label className="block text-sm font-medium text-white">Role</label>
          <select
            value={filter.sender}
            onChange={(e) =>
              setFilter({
                ...filter,
                sender: e.target.value.toLocaleLowerCase() as
                  | "assistant"
                  | "user",
              })
            }
            className="mt-1 block w-[200px] rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="assistant">Assistant</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            value={filter.username}
            onChange={(e) => setFilter({ ...filter, username: e.target.value })}
            placeholder="Search by username"
            className="mt-1 block w-[200px] rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B5268] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Messages Table */}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#4B5268] bg-neutral-650">
          <table className="min-w-full divide-y divide-[#4B5268]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B5268]">
              {filteredMessages?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-[#6B7280]"
                  >
                    No messages found
                  </td>
                </tr>
              ) : (
                filteredMessages?.map((message) => (
                  <tr key={message._id}>
                    <td className="px-6 py-4 text-sm text-white">
                      {message.username}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          message.sender === "user"
                            ? "bg-blue-600/10 text-blue-500"
                            : "bg-gray-600/10 text-gray-400"
                        }`}
                      >
                        {message.sender}
                      </span>
                    </td>
                    <td className="whitespace-pre-wrap px-6 py-4 text-sm text-white">
                      {message.content}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {format(
                        new Date(message.createdAt),
                        "MMM d, yyyy h:mm a",
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(message._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
