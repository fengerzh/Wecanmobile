// @flow

import apisauce from 'apisauce';

const create = (baseURL: string = 'https://api.weinnovators.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  });

  // 我们可以把所有公开接口放在这里
  const getActivities = () => api.get('activities?corpid=wxd9ed6139adfa53ce');
  const getActivity = (id: string) => api.get('activities/' + id);
  const getActUsers = (id: string) => api.get('actusers?id=' + id);
  const getNewses = () => api.get('news');
  const setActUser = (token: string, id: string) => api.get('jwtactuser/create', {id}, {headers: {'Authorization': 'Bearer ' + token}});
  const deleteActUser = (token: string, id: string) => api.get('jwtactuser/delete', {id}, {headers: {'Authorization': 'Bearer ' + token}});
  const login = (username: string, password: string) => api.post('gluseruser/login', 'username=' + username + '&password=' + password, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

  return {
    getActivities,
    getActivity,
    getActUsers,
    getNewses,
    setActUser,
    deleteActUser,
    login,
  }
};

export default {
  create,
};
