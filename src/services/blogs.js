import axios from 'axios';
const baseUrl = '/api/v1/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

const getById = (id) => {
  const response = axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
}

export default { getAll, create, setToken, getById, update, remove };