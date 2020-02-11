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

const AddTask = ({ className, saveTask }) => {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.description) return;

    saveTask(task);
    setTask({ name: '', description: '' });
    toggle();
  };

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="success" className="btn-block" onClick={toggle}>
        New Task
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add New Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={task.name}
                id="name"
                onChange={handleInputChange}
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={task.description}
                id="description"
                onChange={handleInputChange}
                placeholder="Description"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddTask;
