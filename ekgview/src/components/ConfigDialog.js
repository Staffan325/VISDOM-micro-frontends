/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import {
  Button,
  Modal
} from "react-bootstrap";


/**
 *
 * @param {title} param0 title.button && title.dialog && title.confirm
 * @returns Dialog
 */
const ConfigDialog = ({ title, children, openDialog, setOpenDialog, showButton=true, additionalFooter=null }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () =>
  {
    setOpen(true);
    if (setOpenDialog) {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (setOpenDialog) {
      setOpenDialog(false);
    }
  };
  useEffect(() => {
    if (openDialog !== undefined){
      setOpen(openDialog);
    }
  }, [openDialog]);
  return (
    <div>
      {
        showButton &&
        <Button variant="outline-primary" onClick={handleClickOpen}>
          {title.button}
        </Button>
      }
      <Modal
        show={open}
        onHide={handleClose}
        size="xl"
        centered
      >
        <Modal.Header id="alert-dialog-title">
          <Modal.Title>{title.dialog}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflow: "scroll" }}>{children}</Modal.Body>
        <Modal.Footer>
          {additionalFooter}
          <Button variant="outline-success" onClick={handleClose}>
            {title.confirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ConfigDialog;
