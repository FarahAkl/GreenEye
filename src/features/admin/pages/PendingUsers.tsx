import { useState } from "react";
import { useGetPendingUsers } from "../hooks/useGetPendingUsers";
import { useApproveUser } from "../hooks/useApproveUser";
import { useRejectUser } from "../hooks/useRejectUser";
import { LuCalendar, LuCheck, LuCircleAlert, LuX, LuUser } from "react-icons/lu";
import Spinner from "../../../ui/Spinner";
import type { pendingUserT } from "../../../schemas/adminSchema";
import Modal from "../../../ui/Modal";
import RejectionForm from "../ui/RejectionForm";

const BASE_URL = import.meta.env.VITE_API_URL;

const UserImage = ({ src, name }: { src: string; name: string }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center">
      {!imgError && src ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <LuUser className="text-gray-300" size={16} />
        </div>
      )}
    </div>
  );
};

const PendingUsers = () => {
  const { pendingUsers, isFetchingUsers, isFetching } = useGetPendingUsers();
  const { approveUser, isApproving } = useApproveUser();
  const { rejectUser, isRejecting } = useRejectUser();

  if (isFetchingUsers || isFetching) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const usersList = pendingUsers?.data || [];

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Header */}
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Pending Users
        </h1>
      </div>

      {/* Table Area */}
      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">User</th>
                <th className="px-4 py-4 font-medium">Phone Number</th>
                <th className="px-4 py-4 font-medium">Email</th>
                <th className="px-4 py-4 font-medium">Role</th>
                <th className="px-4 py-4 font-medium">File Attached</th>
                <th className="px-4 py-4 font-medium">Join Date</th>
                <th className="px-4 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.length === 0 || usersList === null ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#6b7280]">
                    No pending users found.
                  </td>
                </tr>
              ) : (
                usersList.map((user: pendingUserT) => (
                  <tr
                    key={user.id}
                    className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <UserImage src={user.imageUrl ? `${BASE_URL}${user.imageUrl}` : ""} name={user.name} />
                        <span className="text-dark font-semibold">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {user.phoneNumber}
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {user.email}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-600 font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {user.logoUrl ? (
                        <a
                          href={`${BASE_URL}${user.logoUrl}`}
                          className="text-primary hover:text-dark font-medium underline underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          File
                        </a>
                      ) : (
                        <span className="text-gray-400">No file</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          disabled={isApproving}
                          onClick={() => approveUser(String(user.id))}
                          className="flex items-center justify-center rounded-lg bg-secondary p-1.5 text-white shadow-sm transition-colors hover:bg-secondary/80 disabled:opacity-50"
                          title="Approve"
                        >
                          <LuCheck size={18} />
                        </button>
                        
                        <Modal.Open opens={`reject-${user.id}`}>
                          <button
                            className="flex items-center justify-center rounded-lg bg-red-500 p-1.5 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                            title="Reject"
                          >
                            <LuX size={18} />
                          </button>
                        </Modal.Open>

                        <Modal.Window 
                          name={`reject-${user.id}`} 
                          icon={<LuCircleAlert size={24} className="text-red-500" />}
                          title="Reject User"
                          description={`Are you sure you want to reject ${user.name}?`}
                        >
                          <RejectionForm 
                            isSubmitting={isRejecting}
                            onConfirm={(reason) => rejectUser({ userId: String(user.id), params: { rejectedReason: reason } })}
                            placeholder="Please explain why this user is being rejected..."
                          />
                        </Modal.Window>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default PendingUsers;
