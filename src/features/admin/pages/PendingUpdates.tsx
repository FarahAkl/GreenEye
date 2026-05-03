import { useMemo } from "react";
import {
  LuCalendar,
  LuCheck,
  LuCircleAlert,
  LuClock3,
  LuEye,
  LuLoaderCircle,
  LuPackage,
  LuUser,
  LuX,
} from "react-icons/lu";
import { useGetPendingUpdatesResquests } from "../hooks/useGetPendingUpdatesRequests";
import { useUpdateRequestDetails } from "../hooks/useUpdateRequestDetails";
import { useApproveUpdates } from "../hooks/useApproveUpdates";
import { useRejectUpdate } from "../hooks/useRejectUpdate";
import type { pendingProductUpdateT } from "../../../schemas/adminSchema";
import { formatDate, formatDateTime } from "../../../utils/date";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";

const formatLabel = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const renderPrimitiveValue = (value: unknown) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime()) && /date|at/i.test(value)) {
      return formatDateTime(value);
    }
    return value;
  }

  return String(value);
};

const renderDetailValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-gray-soft">Not provided</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-gray-soft">No items</span>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <span
            key={`${String(item)}-${index}`}
            className="text-primary rounded-full bg-pale-green px-2.5 py-1 text-xs font-medium"
          >
            {typeof item === "object" ? JSON.stringify(item) : String(item)}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return <span className="text-gray-soft">No data</span>;
    }

    return (
      <div className="space-y-2 rounded-xl border border-border-green bg-card-green p-3">
        {entries.map(([nestedKey, nestedValue]) => (
          <div
            key={nestedKey}
            className="flex flex-col gap-1 text-sm sm:flex-row sm:items-start sm:justify-between"
          >
            <span className="font-medium text-muted-green">
              {formatLabel(nestedKey)}
            </span>
            <span className="text-deep-green sm:max-w-[65%] sm:text-right">
              {renderPrimitiveValue(nestedValue)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return <span className="text-deep-green">{renderPrimitiveValue(value)}</span>;
};

const UpdateDetailsContent = ({
  requestId,
  productName,
  onCloseModal,
}: {
  requestId: string;
  productName: string;
  onCloseModal?: () => void;
}) => {
  const { requestDetails, isFetchingDetails } =
    useUpdateRequestDetails(requestId);
  const { approveUpdate, isApproving } = useApproveUpdates();
  const { rejectUpdate, isRejecting } = useRejectUpdate();

  const detailsData = requestDetails?.data;
  const detailEntries = useMemo(() => {
    if (!detailsData || typeof detailsData !== "object") return [];

    return Object.entries(detailsData).filter(
      ([, value]) => value !== undefined && value !== null,
    );
  }, [detailsData]);

  const handleApprove = () => {
    approveUpdate(
      { requestId },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  };

  const handleReject = () => {
    rejectUpdate(
      { requestId },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  };

  if (isFetchingDetails) {
    return (
      <div className="flex min-h-50 min-w-[320px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-6 flex w-full max-w-2xl min-w-[320px] flex-col gap-6 md:min-w-170">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border-green bg-card-green p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Request ID
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">
            #{requestId}
          </p>
        </div>
        <div className="rounded-2xl border border-border-green bg-card-green p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Product
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">
            {productName}
          </p>
        </div>
        <div className="rounded-2xl border border-border-green bg-card-green p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Records
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">
            {detailEntries.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border-green bg-card-green p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Status
          </p>
          <p className="mt-2 text-base font-bold text-amber-600">
            Pending Review
          </p>
        </div>
      </div>

      {detailEntries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-dashed-green bg-panel-green px-6 py-10 text-center">
          <p className="font-semibold text-deep-green">
            No update details returned
          </p>
          <p className="mt-2 text-sm text-light-green">
            The request exists, but the API did not return field-level details.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {detailEntries.map(([key, value]) => (
            <div
              key={key}
              className="rounded-2xl border border-border-green bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold tracking-wide text-light-green uppercase">
                {formatLabel(key)}
              </p>
              <div className="mt-3 text-sm text-deep-green">
                {renderDetailValue(value)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border-green-light pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReject}
          disabled={isRejecting || isApproving}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRejecting ? (
            <LuLoaderCircle className="animate-spin" size={16} />
          ) : (
            <LuX size={16} />
          )}
          Reject Update
        </button>
        <button
          type="button"
          onClick={handleApprove}
          disabled={isApproving || isRejecting}
          className="bg-secondary hover:bg-secondary/80 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isApproving ? (
            <LuLoaderCircle className="animate-spin" size={16} />
          ) : (
            <LuCheck size={16} />
          )}
          Approve Update
        </button>
      </div>
    </div>
  );
};

const PendingUpdates = () => {
  const { pendingUpdates, isFetchingUpdates } = useGetPendingUpdatesResquests();
  const { approveUpdate, isApproving } = useApproveUpdates();
  const { rejectUpdate, isRejecting } = useRejectUpdate();

  const updatesList = pendingUpdates?.data || [];

  if (isFetchingUpdates) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO title="Pending Updates" description="Review and approve product update requests from suppliers." />
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Pending Updates
        </h1>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">Request ID</th>
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Product ID</th>
                <th className="px-4 py-4 font-medium">Requested By</th>
                <th className="px-4 py-4 font-medium">Requested At</th>
                <th className="px-4 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {updatesList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-muted">
                    No pending update requests found.
                  </td>
                </tr>
              ) : (
                updatesList.map((update: pendingProductUpdateT) => (
                  <tr
                    key={update.requestId}
                    className="hover:bg-primary/15 border-b border-row-border transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="text-primary rounded-full bg-pale-green px-3 py-1 text-lg font-bold">
                        #{update.requestId}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-pale-green">
                          <LuPackage size={18} />
                        </div>
                        <span className="text-dark font-semibold">
                          {update.productName}
                        </span>
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      #{update.productId}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-medium">
                        <LuUser size={16} className="text-gray-400" />
                        {update.supplierName}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {formatDate(update.requestedAt)}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-light-green">
                        <LuClock3 size={14} />
                        {formatDateTime(update.requestedAt)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Modal.Open opens={`details-${update.requestId}`}>
                          <button
                            className="flex items-center justify-center gap-2 rounded-lg border border-button-border-green bg-white px-3 py-1.5 text-xs font-semibold text-deep-green shadow-sm transition-colors hover:bg-button-hover-green"
                            title="View details"
                          >
                            <LuEye size={16} />
                            Details
                          </button>
                        </Modal.Open>
                        <button
                          type="button"
                          disabled={isApproving}
                          onClick={() =>
                            approveUpdate({
                              requestId: String(update.requestId),
                            })
                          }
                          className="bg-secondary hover:bg-secondary/80 flex items-center justify-center rounded-lg p-1.5 text-white shadow-sm transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <LuCheck size={18} />
                        </button>
                        <button
                          type="button"
                          disabled={isRejecting}
                          onClick={() =>
                            rejectUpdate({
                              requestId: String(update.requestId),
                            })
                          }
                          className="flex items-center justify-center rounded-lg bg-red-500 p-1.5 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                          title="Reject"
                        >
                          <LuX size={18} />
                        </button>

                        <Modal.Window
                          name={`details-${update.requestId}`}
                          icon={
                            <LuCircleAlert size={24} className="text-primary" />
                          }
                          title="Update Request Details"
                          description={`Review the requested changes for ${update.productName}.`}
                        >
                          <UpdateDetailsContent
                            requestId={String(update.requestId)}
                            productName={update.productName}
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

export default PendingUpdates;
