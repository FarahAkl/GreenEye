import { FiEdit, FiMail } from "react-icons/fi";
import { useEffect, useState } from "react";
import Input from "../features/auth/ui/Input";
import type { updateProfileT } from "../schemas/profileSchema";
import { useForm } from "react-hook-form";
import { useProfile } from "../features/profile/hooks/useProfile";
import { useDeleteProfile } from "../features/profile/hooks/useDeleteProfile";
import { FaRegUser } from "react-icons/fa";
import { CgPhone } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import {
  LuCamera,
  LuCheck,
  LuX,
  LuTrash2,
  LuTriangleAlert,
} from "react-icons/lu";
import SEO from "../ui/SEO";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useAuth } from "../features/auth/hooks/useAuth";

const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { userId } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfile, isUpdating } = useProfile(userId||'');
  const { deleteProfile, isDeleting } = useDeleteProfile();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<updateProfileT>({
    defaultValues: {
      name: profileData?.data.name,
      phoneNumber: profileData?.data.phoneNumber,
      address: profileData?.data.address,
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      reset({
        name: profileData.data.name,
        phoneNumber: profileData?.data.phoneNumber,
        address: profileData?.data.address,
      });
    }
  }, [profileData, reset]);

  const displayedImage =
    imagePreview || profileData?.data.profileImageUrl || null;

  const onSubmit = (data: updateProfileT) => {
    updateProfile(data, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("newImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (profileData?.data) {
      reset({
        name: profileData.data.name,
        phoneNumber: profileData?.data.phoneNumber,
        address: profileData?.data.address,
      });
      setImagePreview(null);
    }
  };

  return (
    <section className="min-h-screen bg-page-green px-4 py-12 md:px-12 lg:px-24">
      <SEO
        title="My Profile"
        description="Manage your personal information and preferences."
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-deep-green">
              Profile Settings
            </h1>
            <p className="mt-1 text-light-green">
              Manage your account information and how others see you.
            </p>
          </div>
          {!isEditing ? (
            <Button
              btnLabel=""
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-2xl px-6 py-3"
            >
              <FiEdit />
              <span>Edit Profile</span>
            </Button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-600 transition-all hover:bg-gray-50"
              >
                <LuX />
                <span>Cancel</span>
              </button>
              <Button
                btnLabel=""
                onClick={handleSubmit(onSubmit)}
                disabled={isUpdating}
                className="flex items-center gap-2 rounded-2xl px-6 py-3"
              >
                <LuCheck />
                <span>Save Changes</span>
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Avatar & Summary */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-3xl border border-border-green bg-white p-8 shadow-card-soft">
              <div className="relative mx-auto h-48 w-48">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-soft-green-3 bg-gray-100 shadow-inner ring-4 ring-white">
                  {displayedImage && displayedImage !== "" ? (
                    <img
                      src={
                        displayedImage.startsWith("data:")
                          ? displayedImage
                          : `${BASE_URL}${displayedImage}`
                      }
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300">
                      <FaRegUser size={64} />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="bg-primary absolute right-2 bottom-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110">
                    <LuCamera size={20} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-deep-green">
                  {profileData?.data.name}
                </h3>
                <p className="text-sm text-light-green">
                  {profileData?.data.email}
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-badge-green-bg px-4 py-1 text-xs font-semibold tracking-wider text-accent-green uppercase">
                  Member
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl border border-border-green bg-white p-8 shadow-card-soft">
              <h2 className="mb-6 text-xl font-bold text-deep-green">
                Personal Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-muted-green">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      disabled={!isEditing}
                      prefix={<FaRegUser size={18} />}
                      register={register}
                      name="name"
                      className="mb-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-muted-green">
                      Email Address
                    </label>
                    <Input
                      placeholder={"Email"}
                      type="text"
                      disabled
                      value={profileData?.data.email}
                      prefix={<FiMail size={18} />}
                      name="email"
                      className="mb-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-muted-green">
                      Phone Number
                    </label>
                    <Input
                      placeholder={"Phone"}
                      type="text"
                      disabled={!isEditing}
                      prefix={<CgPhone size={18} />}
                      register={register}
                      name="phoneNumber"
                      className="mb-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="ml-1 text-sm font-semibold text-muted-green">
                      Address
                    </label>
                    <Input
                      placeholder={"Address"}
                      type="text"
                      disabled={!isEditing}
                      prefix={<GoLocation size={18} />}
                      register={register}
                      name="address"
                      className="mb-0"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-card-soft">
              <h2 className="mb-1 text-xl font-bold text-red-600">
                Danger Zone
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Permanently delete your account and all associated data.
              </p>

              <Modal>
                <Modal.Open opens="delete-profile">
                  <button className="flex items-center gap-2 rounded-2xl bg-red-50 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-100">
                    <LuTrash2 />
                    <span>Delete Account</span>
                  </button>
                </Modal.Open>
                <Modal.Window
                  name="delete-profile"
                  title="Delete Account"
                  description="This action is irreversible."
                  icon={<LuTriangleAlert className="text-red-600" size={24} />}
                >
                  <ConfirmDelete
                    resourceName="account"
                    onConfirm={() => deleteProfile()}
                    disabled={isDeleting}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div id="modal-root"></div>
    </section>
  );
};

export default Profile;
