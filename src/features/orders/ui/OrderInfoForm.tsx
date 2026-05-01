import { useEffect } from "react";
import { useForm, type Path, type UseFormSetError } from "react-hook-form";
import type { ZodIssue } from "zod";

import {
  getShippingRateRequestSchema,
  type shippingRateRequestT,
} from "../../../schemas/shippingSchema";
import Input from "../../auth/ui/Input";
import { useAuth } from "../../auth/hooks/useAuth";

type Props = {
  onSuccess: (data: shippingRateRequestT) => void;
  initialData?: shippingRateRequestT | null;
};

const applyZodIssues = (
  setError: UseFormSetError<shippingRateRequestT>,
  issues: ZodIssue[],
) => {
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string") {
      setError(key as Path<shippingRateRequestT>, {
        type: "manual",
        message: issue.message,
      });
    }
  }
};

const OrderInfoForm = ({
  onSuccess,
  initialData,
}: Props) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<shippingRateRequestT>({
    defaultValues: initialData || {
      name: "",
      street1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    setValue("name", user.userName || "");
    setValue("email", user.email || "");
    setValue("phone", user.phoneNumber || "");
  }, [user, setValue]);

  const onSubmit = async () => {
    clearErrors();

    const parsed = getShippingRateRequestSchema.safeParse(getValues());

    if (!parsed.success) {
      applyZodIssues(setError, parsed.error.issues);
      return;
    }

    onSuccess(parsed.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <p className="text-dark py-4 text-3xl">Contact info</p>
      <p className="text-dark px-3 font-semibold">Full Name</p>
      <Input
        type="text"
        register={register}
        name="name"
        disabled
        error={errors.name?.message}
      />
      <p className="text-dark px-3 font-semibold">Phone Number</p>
      <Input
        type="text"
        register={register}
        name="phone"
        disabled
        error={errors.phone?.message}
      />
      <p className="text-dark px-3 font-semibold">Email</p>
      <Input
        type="email"
        register={register}
        name="email"
        disabled
        error={errors.email?.message}
      />

      <p className="text-dark px-3 font-semibold">Delivery Location</p>

      <Input
        label="Country"
        type="text"
        register={register}
        name="country"
        error={errors.country?.message}
      />
      <Input
        label="City"
        type="text"
        register={register}
        name="city"
        error={errors.city?.message}
      />
      <Input
        label="Street"
        type="text"
        register={register}
        name="street1"
        error={errors.street1?.message}
      />
      <Input
        label="State"
        type="text"
        register={register}
        name="state"
        error={errors.state?.message}
      />
      <Input
        label="Zip Code"
        type="text"
        register={register}
        name="zip"
        error={errors.zip?.message}
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-primary h-12 w-full rounded-2xl text-white"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default OrderInfoForm;
