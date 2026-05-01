import Button from "./Button";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}

const ConfirmDelete = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) => {
  return (
    <div className="flex flex-col gap-3 pt-5">
      <p className="text-gray-600">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          className="rounded-2xl border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-600 transition-all hover:bg-gray-50 disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <Button
          color="primary"
          onClick={onConfirm}
          disabled={disabled}
          className="rounded-2xl bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
          btnLabel="Delete"
        />
      </div>
    </div>
  );
};

export default ConfirmDelete;
