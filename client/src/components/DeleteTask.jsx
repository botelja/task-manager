import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteTask = ({ className, removeTask }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    removeTask();
    toggle();
  };
  return (
    <div className="my-2">
      <Button color="danger" className="btn-block" onClick={toggle}>
        Delete Tasks
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Task</ModalHeader>
        <ModalBody>Are you sure you want to delete selected records?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteTask;
