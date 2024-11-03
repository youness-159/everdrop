import { cloneElement, createContext, useContext, useState } from "react";
import useClose from "../hooks/useClose.js";
import PropTypes from "prop-types";

const ModalContext = createContext({});

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Close({ children }) {
  return cloneElement(children, { onClick: close });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useClose(close);

  if (openName !== name) return null;
  return cloneElement(children, { ref });
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Open.propTypes = {
  children: PropTypes.node.isRequired,
  opens: PropTypes.string.isRequired,
};

Close.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};
