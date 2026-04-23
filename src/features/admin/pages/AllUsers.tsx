import { useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import {
  // LuLock,
  // LuEye,
  // LuTrash2,
  LuCalendar,
  LuUser
} from "react-icons/lu";
// import { CgLockUnlock } from "react-icons/cg";
import Pagination from "../../../ui/Pagination";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";
import type { userT } from "../../../schemas/adminSchema";
import { formatDate } from "../../../utils/date";

const tabs = [
  { id: "all", label: "ALL", role: undefined },
  { id: "expert", label: "Experts Only", role: "Expert" },
  { id: "supplier", label: "Suppliers Only", role: "Supplier" },
  { id: "farmer", label: "Farmers Only", role: "Farmer" },
];

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

const AllUsers = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(1);

  const { users, isFetchingUsers, isFetching } = useGetUsers({
    role: activeTab.role,
    pageNumber: page,
    pageSize: 10,
  });

  const totalPages = users?.data.totalPages;

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
              {/* <th className="px-4 py-4 text-center font-medium"></th> */}
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
                      {/* {isBanned ? (
                        <div className="relative flex items-center justify-center text-[#eab308]">
                          <LuLock size={20} />
                          <span className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-white">
                            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                              ✕
                            </span>
                          </span>
                        </div>
                      ) : (
                        <CgLockUnlock size={20} className="text-[#d1d5db]" />
                      )} */}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <UserImage 
                          src={user.profileImage ? `${BASE_URL}${user.profileImage}` : ""} 
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
                      <button className="hover:text-dark flex items-center gap-1 font-medium text-gray-600">
                        {user.role}
                        {/* <LuChevronDown
                          size={14}
                          className="font-bold text-[#9ca3af]"
                        /> */}
                      </button>
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
                    {/* <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-6 pr-4">
                        <button className="flex items-center justify-center rounded-lg bg-[#ef4444] p-1.5 text-white shadow-sm transition-colors hover:bg-[#dc2626]">
                          <LuTrash2 size={18} />
                        </button>
                      </div>
                    </td> */}
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
    </div>
  );
};

export default AllUsers;
