import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../hooks/useGetUsers";
import { useChangeRole } from "../hooks/useChangeRole";
import { useFreezeUser } from "../hooks/useFreezeUser";
import {
  LuLock,
  LuEye,
  LuCalendar,
  LuUser,
  LuLockKeyholeOpen,
  LuTriangleAlert,
} from "react-icons/lu";
import Pagination from "../../../ui/Pagination";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";
import CustomSelect from "../../../ui/CustomSelect";
import type { freezeUserT, userT } from "../../../schemas/adminSchema";
import { formatDate } from "../../../utils/date";
import Modal from "../../../ui/Modal";
import FreezeUserForm from "../ui/FreezeUserForm";
import ConfirmDelete from "../../../ui/ConfirmDelete";

const tabs = [
  { id: "all", label: "ALL", role: undefined },
  { id: "expert", label: "Experts Only", role: "Expert" },
  { id: "supplier", label: "Suppliers Only", role: "Supplier" },
  { id: "farmer", label: "Farmers Only", role: "Farmer" },
];

const BASE_URL = import.meta.env.VITE_API_URL;
const roleOptions = ["Farmer", "Supplier", "Expert", "Admin"] as const;
const roleSelectOptions = roleOptions.map((role) => ({
  value: role,
  label: role,
}));

const UserImage = ({ src, name }: { src: string; name: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-50">
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

const AllUsers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(1);
  const [changingUserId, setChangingUserId] = useState<string | null>(null);
  const { changeRole, isChanging } = useChangeRole();
  const { freezeUser, unfreezeUser, isFreezing, isUnfreezing } =
    useFreezeUser();

  const { users, isFetchingUsers, isFetching } = useGetUsers({
    role: activeTab.role,
    pageNumber: page,
    pageSize: 10,
  });

  const totalPages = users?.data.totalPages;

  const handleRoleChange = (
    userId: string,
    newRole: string,
    currentRole: string,
  ) => {
    if (newRole === currentRole) return;

    setChangingUserId(userId);
    changeRole(
      { userId, newRole },
      {
        onSettled: () => setChangingUserId(null),
      },
    );
  };

  const onFreezeConfirm = (data: freezeUserT, onClose?: () => void) => {
    freezeUser(data, {
      onSuccess: () => onClose?.(),
    });
  };

  const onUnfreezeConfirm = (userId: string, onClose?: () => void) => {
    unfreezeUser(
      {
        userId,
        message: "Account unfreezed by admin",
      },
      {
        onSuccess: () => onClose?.(),
      },
    );
  };

  if (isFetchingUsers || isFetching) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO title="Manage Users" />
      {/* Header */}
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Users
        </h1>
      </div>

      {/* Tabs */}
      <div className="mt-2 flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`rounded-full px-8 py-1.5 text-sm font-bold transition-all ${
              activeTab.id === tab.id
                ? "border-secondary text-dark border-2"
                : "border-primary/80 text-dark hover:border-primary border-2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Area */}
      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b-2 border-gray-200 text-gray-600">
              <th className="w-12 px-4 py-4 font-medium"></th>
              <th className="px-4 py-4 font-medium">User</th>
              <th className="px-4 py-4 font-medium">Phone Number</th>
              <th className="px-4 py-4 font-medium">Email</th>
              <th className="px-4 py-4 font-medium">Role</th>
              <th className="px-4 py-4 font-medium">File Attached</th>
              <th className="px-4 py-4 font-medium">Join Date</th>
              <th className="px-4 py-4 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.data.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-[#6b7280]">
                  No users found for this filter.
                </td>
              </tr>
            ) : (
              users?.data.data.map((user: userT, index: number) => {
                const hasFile = index !== 4 && index !== 8;

                return (
                  <tr
                    key={user.id || index}
                    className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <Modal>
                        <Modal.Open
                          opens={user.isFrozen ? "unfreeze" : "freeze"}
                        >
                          <button
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                              user.isFrozen
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "hover:text-primary bg-gray-50 text-gray-400 hover:bg-gray-100"
                            }`}
                            title={
                              user.isFrozen ? "Unfreeze user" : "Freeze user"
                            }
                            disabled={isFreezing || isUnfreezing}
                          >
                            {user.isFrozen ? (
                              <LuLock size={18} />
                            ) : (
                              <LuLockKeyholeOpen size={18} />
                            )}
                          </button>
                        </Modal.Open>

                        <Modal.Window
                          name="freeze"
                          title="Freeze User Account"
                          description="Restrict user access for a specific duration or permanently."
                          icon={
                            <LuTriangleAlert
                              className="text-red-600"
                              size={24}
                            />
                          }
                        >
                          <FreezeUserForm
                            userId={user.id}
                            isPending={isFreezing}
                            onConfirm={onFreezeConfirm}
                          />
                        </Modal.Window>

                        <Modal.Window
                          name="unfreeze"
                          title="Unfreeze User Account"
                          description="Restore full access to this user account."
                          icon={
                            <LuLockKeyholeOpen
                              className="text-primary"
                              size={24}
                            />
                          }
                        >
                          <ConfirmDelete
                            resourceName="user account restriction"
                            onConfirm={() => onUnfreezeConfirm(user.id)}
                            disabled={isUnfreezing}
                          />
                        </Modal.Window>
                      </Modal>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <UserImage
                          src={
                            user.profileImage
                              ? `${BASE_URL}${user.profileImage}`
                              : ""
                          }
                          name={user.name || "User"}
                        />
                        <span className="text-dark font-semibold">
                          {user.name || "lurem ipsum"}
                        </span>
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {user.phoneNumber || "12345678910"}
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {user.email || ""}
                    </td>
                    <td className="px-4 py-4">
                      <CustomSelect
                        options={roleSelectOptions}
                        value={user.role}
                        onChange={(value) =>
                          handleRoleChange(user.id, value, user.role)
                        }
                        disabled={isChanging && changingUserId === user.id}
                        className="min-w-34"
                      />
                    </td>
                    <td className="px-4 py-4">
                      {hasFile ? (
                        <a
                          href={`${BASE_URL}${user.logoImage}`}
                          className="text-primary hover:text-dark font-medium underline underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {typeof user.logoImage === "string" ? "File" : ""}
                        </a>
                      ) : (
                        <span className="tracking-widest"></span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {user.createdAt
                          ? formatDate(user.createdAt)
                          : index === 0
                            ? "Just now"
                            : index === 1
                              ? "A minute ago"
                              : index === 2
                                ? "1 hour ago"
                                : index === 3
                                  ? "Yesterday"
                                  : "Feb 2, 2023"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            const path =
                              user.role === "Supplier"
                                ? `/admin-dashboard/users/${user.id}/supplier-activity`
                                : `/admin-dashboard/users/${user.id}/activity`;
                            navigate(path);
                          }}
                          className="bg-primary hover:bg-secondary flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white transition-colors"
                          title="View user activity"
                        >
                          <LuEye size={16} />
                          Activity
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
      <div id="modal-root"></div>
    </div>
  );
};

export default AllUsers;
