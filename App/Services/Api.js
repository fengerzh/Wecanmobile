// @flow

import apisauce from 'apisauce';

// 公开接口，不需认证即可调用
const publicAPI = (baseURL: string = 'https://api.weinnovators.com/') => {
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
  const getResources = () => api.get('facitems');
  const getNewses = () => api.get('news');
  const login = (username: string, password: string) => api.post('gluseruser/login', 'username=' + username + '&password=' + password, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

  return {
    getActivities,
    getActivity,
    getActUsers,
    getResources,
    getNewses,
    login,
  }
};

// 调用以下接口时要求用户必须已登录
const privateAPI = (baseURL: string = 'https://jwt.weinnovators.com/') => {
  let api;

  const setToken = (token: string) => {
    api = apisauce.create({
      baseURL,
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 10000,
    });
    return '';
  }
  const getProjectsByUser = () => api.get('aproject/index');
  const getActUsersByUser = () => api.get('actuser/index');
  const getActivitiesByUser = () => api.get('activity/index');
  const setActUser = (id: string) => api.get('actuser/create', {id});
  const deleteActUser = (id: string) => api.get('actuser/delete', {id});

  return {
    setToken,
    getProjectsByUser,
    getActUsersByUser,
    getActivitiesByUser,
    setActUser,
    deleteActUser,
  }
};

export default {
  publicAPI,
  privateAPI,
};
