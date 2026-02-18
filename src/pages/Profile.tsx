import { FiEdit, FiMail } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Input from "../features/auth/ui/Input";
import type { updateProfileT } from "../schemas/profileSchema";
import useOutsideClick from "../hooks/useOutsideClick";
import { useForm } from "react-hook-form";
import { useProfile } from "../features/profile/hooks/useProfile";
import { FaRegUser } from "react-icons/fa";
import { CgPhone } from "react-icons/cg";
import { GoLocation } from "react-icons/go";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfile } = useProfile();
  const formRef = useRef(null);

  const { register, handleSubmit, reset, setValue } = useForm<updateProfileT>({
    defaultValues: {
      name: profileData?.data.name,
      phoneNumber: profileData?.data.phoneNumber,
      address: profileData?.data.address,
      newImage: profileData?.data.newImage,
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

  const onSubmit = (data: updateProfileT) => {
    updateProfile(data, {
      onSuccess: () => setIsEditing(false),
    });
  };

  // Click outside → submit
  useOutsideClick(formRef, () => {
    if (isEditing) handleSubmit(onSubmit)();
  });

  return (
    <section className="bg-black-50 px-8 py-16 md:px-12 lg:px-24">
      <div className="border-black-100 rounded-3xl border bg-white px-6 py-10">
        <div className="my-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-volkhov rtl:font-alexandria text-2xl">
            {"Info"}
          </h2>
          <button
            type={isEditing ? "submit" : "button"}
            onClick={() => {
              if (!isEditing) {
                setIsEditing(true);
              }
            }}
            className="border-black-100 flex cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 outline-none"
          >
            <FiEdit />
            <span>{isEditing ? "Save" : "Edit"}</span>
          </button>
        </div>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label={"Name"}
              type="text"
              disabled={!isEditing}
              prefix={<FaRegUser size={18} />}
              register={register}
              name="name"
            />
            <Input
              label={"Email"}
              placeholder={"Email"}
              type="text"
              disabled
              value={profileData?.data.email}
              prefix={<FiMail size={18} />}
              name="email"
            />
            <Input
              label={"Phone"}
              placeholder={"Phone"}
              type="text"
              disabled={!isEditing}
              prefix={<CgPhone size={18} />}
              register={register}
              name="phoneNumber"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
              <div className="sm:col-span-2">
                <Input
                  label={"Address"}
                  placeholder={"Address"}
                  type="text"
                  disabled={!isEditing}
                  prefix={<GoLocation size={18} />}
                  register={register}
                  name="address"
                />
              </div>

              <div>
                <input
                  type="file"
                  disabled={!isEditing}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setValue("newImage", file);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
