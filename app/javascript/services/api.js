const apiFetch = (url, method, body) => (
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
    },
  }).then(res => res.json())
);

const get = url => apiFetch(url, 'GET');
const post = (url, data) => apiFetch(url, 'POST', data);
const put = (url, data) => apiFetch(url, 'PUT', data);
const destroy = url => apiFetch(url, 'DELETE');

const api = {
  posts: {
    getAll: () => get('api/post'),
    get: id => get(`api/post/${id}`),
    create: data => post('/api/post', data),
    update: (data, id) => put(`/api/post/${id}`, data),
    destroy: id => destroy(`/api/post/${id}`),
  },
  projects: {
    get: () => get('api/project'),
    create: data => post('/api/project', data),
    update: (data, id) => put(`/api/project/${id}`, data),
    destroy: id => destroy(`/api/project/${id}`),
  },
  tasks: {
    create: data => post('/api/task', data),
    update: (data, id) => put(`/api/task/${id}`, data),
    destroy: id => destroy(`/api/task/${id}`),
    updateOrder: data => post('api/task/update_order', data),
  },
  actions: {
    create: data => post('/api/action', data),
    update: (data, id) => put(`/api/action/${id}`, data),
    destroy: id => destroy(`/api/action/${id}`),
  },
};

export default api;
