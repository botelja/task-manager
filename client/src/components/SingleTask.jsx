import React, { useState } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import { updateTask, deleteTask } from '../services/index';

const SingleTask = ({ location, history }) => {
  const [task, setTask] = useState(location.state.task);

  const editTask = (task) => {
    updateTask(task).then(() => setTask(task));
  };

  const removeTask = () => {
    deleteTask(task._id).then(() => {
      history.push('/');
    });
  };
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Task name</th>
          <th scope="col">Task description</th>
          <th scope="col">Created</th>
          <th scope="col">Action</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{task._id}</th>
          <td>{task.name}</td>
          <td>{task.description}</td>
          <td>{moment(task.created).format('MMMM Do YYYY, h:mm:ss a')}</td>
          <td className="d-flex">
            <EditTask task={task} editTask={editTask} />
            <DeleteTask className="btn-sm mr-1" style={{width: 50px}} removeTask={removeTask} />
          </td>
          <td>
            <Button
              color="primary"
              className="btn-sm"
              onClick={() => history.push('/')}
            >
              Back
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SingleTask;
