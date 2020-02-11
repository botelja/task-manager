import React from 'react';
import EditTask from './EditTask';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Task = ({ task, onCheckTask, editTask }) => {
  return (
    <tr>
      <th scope="row">{task._id}</th>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{moment(task.created).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td className="d-flex">
        <Link
          to={{
            pathname: `/task/${task._id}`,
            state: { task }
          }}
          className="btn btn-primary btn-sm mr-2"
        >
          Open
        </Link>

        <EditTask task={task} editTask={editTask} />
      </td>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          id="taskSelected"
          onChange={(e) => onCheckTask(e, task)}
        />
      </td>
    </tr>
  );
};

export default Task;
