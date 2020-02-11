import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import Search from './Search';
import Task from './Task';
import Paginate from './Paginate';
import { getTasks, addTask, updateTask, deleteTask } from '../services/index';
import orderBy from 'lodash.orderby';
import { paginator } from '../helpers/index';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [searchTask, setSearchTask] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [sortColumn, setSortColumn] = useState({ path: 'id', order: 'asc' });

  const listTasks = async () => {
    const logTasks = await getTasks().then((task) => task.data);
    setTasks(logTasks);
  };

  useEffect(() => {
    listTasks();
  }, [newTask]);

  const saveTask = (task) => {
    addTask(task).then(() => setNewTask(task));
  };

  const editTask = (task) => {
    updateTask(task).then(() => setNewTask(task));
  };

  const removeTask = () => {
    const currentTasks = [...tasks];

    currentTasks.map((task) => {
      if (task.selected === true) {
        deleteTask(task._id);
      }
      return task;
    });
    let selectedTasks = [];

    selectedTasks = currentTasks.filter((task) => !('selected' in task));
    setTasks(selectedTasks);
  };

  const handleCheckTask = (e, task) => {
    let checked = e.target.checked;
    setIsChecked(checked);
    setTasks(
      tasks.map((t) => {
        if (task._id === t._id) {
          t.selected = checked;
        }
        return t;
      })
    );
  };

  const handleSort = (path) => {
    const sort = { ...sortColumn };
    if (sort.path === path) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      sort.path = path;
      sort.order = 'asc';
    }
    setSortColumn(sort);
  };

  const search = (task) => {
    setSearchTask(task);
  };

  // Searching
  let filteredTasks = [...tasks];
  if (searchTask.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      return (
        task._id.toString().includes(searchTask) ||
        task.name.toLowerCase().includes(searchTask.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTask.toLowerCase()) ||
        task.created.toLowerCase().includes(searchTask.toLowerCase())
      );
    });
  } else {
    filteredTasks = tasks;
  }

  //Sorting
  const sorted = orderBy(filteredTasks, [sortColumn.path], [sortColumn.order]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentTasks = paginator(sorted, currentPage, tasksPerPage);

  return (
    <div>
      <AddTask saveTask={saveTask} />
      <DeleteTask removeTask={removeTask} disabled={isChecked} />
      <Search search={search} />
      <table className="table mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col" onClick={() => handleSort('_id')}>
              ID
            </th>
            <th scope="col" onClick={() => handleSort('name')}>
              Task name
            </th>
            <th scope="col" onClick={() => handleSort('description')}>
              Task description
            </th>
            <th scope="col" onClick={() => handleSort('created')}>
              Created
            </th>
            <th scope="col">Action</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.length > 0 ? (
            currentTasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onCheckTask={handleCheckTask}
                editTask={editTask}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>No tasks</td>
            </tr>
          )}
        </tbody>
      </table>
      <Paginate
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Tasks;
