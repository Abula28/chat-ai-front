import React, { useState } from "react";
import {
  useGetAllSessionsReq,
  useDeleteSessionReq,
} from "../../backend/requests/admin";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { ErrorResT } from "../../backend";
import { Loader } from "../common/loader/Loader";

const ChatSessions: React.FC = () => {
  const { data: sessions, isPending } = useGetAllSessionsReq();
  const { mutate: deleteSession } = useDeleteSessionReq();
  const [usernameFilter, setUsernameFilter] = useState("");

  const handleDelete = async (id: string) => {
    // TODO: Implement API call
    deleteSession(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          (error as ErrorResT).response?.data?.message ||
            "Something went wrong",
        );
      },
    });
  };

  const filteredSessions = sessions?.sessions.filter((session) =>
    session.username.toLowerCase().includes(usernameFilter.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Chat Sessions</h2>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-6">
        <div>
          <label className="block text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            placeholder="Search by username"
            className="mt-1 block w-[200px] rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {isPending ? (
        <div className="flex w-full items-center justify-center">
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
                  Session ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B5268]">
              {!filteredSessions?.length ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-[#6B7280]"
                  >
                    No chat sessions found
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => (
                  <tr key={session._id}>
                    <td className="px-6 py-4 text-sm text-white">
                      {session.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {session._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {session.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {format(
                        new Date(session.createdAt),
                        "MMM d, yyyy h:mm a",
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {format(
                        new Date(session.updatedAt),
                        "MMM d, yyyy h:mm a",
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(session._id)}
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

export default ChatSessions;
