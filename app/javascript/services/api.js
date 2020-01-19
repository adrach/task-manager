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
  projects: {
    get: () => get('api/project'),
    create: data => post('/api/project', data),
    update: (data, id) => put(`/api/project/${id}`, data),
    destroy: id => destroy(`/api/project/${id}`),
    updateOrder: data => post('api/project/update_order', data),
  },
  tasks: {
    create: data => post('/api/task', data),
    update: (data, id) => put(`/api/task/${id}`, data),
    destroy: id => destroy(`/api/task/${id}`),
    updateOrder: data => post('api/task/update_order', data),
    updateBacklogStatus: data => post('api/task/update_backlog_status', data),
  },
  actions: {
    create: data => post('/api/action', data),
    update: (data, id) => put(`/api/action/${id}`, data),
    destroy: id => destroy(`/api/action/${id}`),
  },
};

export default api;
