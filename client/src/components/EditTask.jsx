import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const EditTask = ({ className, task, editTask }) => {
  const [modal, setModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(task);
  const toggle = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateTask.name || !updateTask.description) return;

    editTask(updateTask);
    toggle();
  };

  return (
    <div>
      <Button color="warning" className="btn-sm" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={updateTask.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={updateTask.description}
                onChange={handleInputChange}
                id="description"
                placeholder="Description"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditTask;
