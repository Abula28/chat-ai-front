import React, { useState } from "react";
import { Modal } from "../common/modal/Modal";
import {
  useGetAllSystemPromptsReq,
  useCreateSystemPromptReq,
  useUpdateSystemPromptReq,
  useDeleteSystemPromptReq,
} from "../../backend/requests/admin";
import { toast } from "react-toastify";
import { ErrorResT } from "../../backend";
import {
  CreateSystemPromptReqT,
  UpdateSystemPromptReqT,
} from "../../backend/types/requestsT/adminReuqests";

const SystemPrompts: React.FC = () => {
  const { data: prompts } = useGetAllSystemPromptsReq();
  const { mutate: createPrompt } = useCreateSystemPromptReq();
  const { mutate: updatePrompt } = useUpdateSystemPromptReq();
  const { mutate: deletePrompt } = useDeleteSystemPromptReq();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] =
    useState<UpdateSystemPromptReqT | null>(null);

  const [newPrompt, setNewPrompt] = useState<CreateSystemPromptReqT>({
    content: "",
    category: "",
    role: "default",
    label: "",
  });

  const handleCreate = async () => {
    createPrompt(newPrompt, {
      onSuccess: (data) => {
        toast.success(data.message);
        setNewPrompt({ content: "", category: "", role: "default", label: "" });
        setShowCreateModal(false);
      },
      onError: (error) => {
        toast.error(
          (error as ErrorResT).response?.data?.message || "An error occurred",
        );
      },
    });
  };

  const handleUpdate = async () => {
    if (!selectedPrompt) return;

    updatePrompt(selectedPrompt, {
      onSuccess: (data) => {
        toast.success(data.message);
        setShowUpdateModal(false);
        setSelectedPrompt(null);
      },
      onError: (error) => {
        toast.error(
          (error as ErrorResT).response?.data?.message || "An error occurred",
        );
      },
    });
  };

  const handleDelete = async (id: string) => {
    deletePrompt(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          (error as ErrorResT).response?.data?.message || "An error occurred",
        );
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">System Prompts</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add New Prompt
        </button>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewPrompt({
            content: "",
            category: "",
            role: "default",
            label: "",
          });
        }}
        title="Create New System Prompt"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Content
            </label>
            <textarea
              value={newPrompt.content}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, content: e.target.value })
              }
              className="mt-1 block w-full resize-none rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B5268] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="Enter prompt content..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Category
            </label>
            <input
              type="text"
              value={newPrompt.category}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, category: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B7280] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter category..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Role</label>
            <select
              value={newPrompt.role}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, role: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="system">System</option>
              <option value="persona">Persona</option>
              <option value="tool">Tool</option>
              <option value="assistant">Assistant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Label
            </label>
            <input
              type="text"
              value={newPrompt.label}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, label: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B7280] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter label..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setNewPrompt({
                  content: "",
                  category: "",
                  role: "default",
                  label: "",
                });
              }}
              className="rounded border border-[#4B5268] bg-neutral-650 px-4 py-2 text-sm font-medium text-white hover:border-[#6B7280]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Update Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedPrompt(null);
        }}
        title="Update System Prompt"
      >
        {selectedPrompt && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Content
              </label>
              <textarea
                value={selectedPrompt.content}
                onChange={(e) =>
                  setSelectedPrompt({
                    ...selectedPrompt,
                    content: e.target.value,
                  })
                }
                className="mt-1 block w-full resize-none rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B5268] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={4}
                placeholder="Enter prompt content..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Category
              </label>
              <input
                type="text"
                value={selectedPrompt.category}
                onChange={(e) =>
                  setSelectedPrompt({
                    ...selectedPrompt,
                    category: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B7280] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter category..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Role
              </label>
              <select
                value={selectedPrompt.role}
                onChange={(e) =>
                  setSelectedPrompt({ ...selectedPrompt, role: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="system">System</option>
                <option value="persona">Persona</option>
                <option value="tool">Tool</option>
                <option value="assistant">Assistant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Label
              </label>
              <input
                type="text"
                value={selectedPrompt.label}
                onChange={(e) =>
                  setSelectedPrompt({
                    ...selectedPrompt,
                    label: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-lg border border-[#4B5268] bg-neutral-650 px-3 py-2 text-sm text-white placeholder-[#4B7280] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter label..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedPrompt(null);
                }}
                className="rounded border border-[#4B5268] bg-neutral-650 px-4 py-2 text-sm font-medium text-white hover:border-[#6B7280]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Prompts Table */}
      <div className="overflow-hidden rounded-2xl border border-[#4B5268] bg-neutral-650">
        <table className="min-w-full divide-y divide-[#4B5268]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                Label
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4B5268]">
            {!prompts?.prompts?.length ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-[#6B7280]"
                >
                  No system prompts found
                </td>
              </tr>
            ) : (
              prompts.prompts.map((prompt) => (
                <tr key={prompt._id}>
                  <td className="whitespace-pre-wrap px-6 py-4 text-sm text-white">
                    {prompt.content}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {prompt.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {prompt.role}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {prompt.label}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPrompt({
                            id: prompt._id,
                            ...prompt,
                          });
                          setShowUpdateModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prompt._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemPrompts;
