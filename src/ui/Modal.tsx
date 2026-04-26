import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  cloneElement,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

interface OpenProps {
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  opens: string;
}

const Open = ({ children, opens }: OpenProps) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used inside <Modal>");

  const { open } = context;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (children.props.onClick) children.props.onClick(e);
      open(opens);
    },
  });
};

interface WindowProps {
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: ReactElement<{ onCloseModal?: () => void }>;
}

const Window = ({ name, icon, title, description, children }: WindowProps) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used inside <Modal>");

  const { openName, close } = context;

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, close);

  if (openName !== name) return null;

  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  return createPortal(
    <div className="fixed inset-0 z-999 flex h-full items-center justify-center bg-black/20 backdrop-blur-sm transition-all">
      <div
        ref={ref}
        className="relative mx-4 w-fit max-w-[calc(100vw-2rem)] rounded-xl bg-white p-8 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="border-black-400 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
            {icon}
          </div>
          <div>
            <p className="text-black-500 text-xl">{title}</p>
            <p className="text-black-600 text-base">{description}</p>
          </div>
        </div>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    modalRoot,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
