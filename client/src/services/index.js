import axios from 'axios';

export const getTasks = async () => {
  const response = await axios.get('/api/tasks');
  return response;
};

export const addTask = async (task) => {
  await axios.post('/api/tasks/', task);
};

export const updateTask = async (task) => {
  await axios.put(`/api/tasks/${task._id}`, task);
};

export const deleteTask = async (id) => {
  await axios.delete(`/api/tasks/${id}`);
};
