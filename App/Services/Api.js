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
  const getActivity = (id: string) => api.get(`activities/${id}`);
  const getActUsers = (id: string) => api.get(`actusers?id=${id}`);
  const getResources = () => api.get('facitems');
  const getResource = (id: number) => api.get(`facitems/${id}`);
  const getNewses = () => api.get('news');
  const login = (username: string, password: string) => api.post('gluseruser/login', `username=${username}&password=${password}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  const wxLogin = (code: string) => api.get(`gluseruser/verify?code=${code}&state=APPLOGIN`);

  return {
    getActivities,
    getActivity,
    getActUsers,
    getResources,
    getResource,
    getNewses,
    login,
    wxLogin,
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
  const getFacprojsByUser = () => api.get('facproj/index');
  const getFacItems = () => api.get('facitem/index');
  const setActUser = (id: string) => api.get('actuser/create', {id});
  const deleteActUser = (id: string) => api.get('actuser/delete', {id});
  const insertFacProj = (item_id: number, proj_id: number, start_time: string, end_time: string) => api.get('facproj/create', {
    item_id,
    proj_id,
    start_time,
    end_time,
  });
  const deleteFacProj = (id: number) => api.get('facproj/delete', {id});

  return {
    setToken,
    getProjectsByUser,
    getActUsersByUser,
    getActivitiesByUser,
    getFacprojsByUser,
    getFacItems,
    setActUser,
    deleteActUser,
    insertFacProj,
    deleteFacProj,
  }
};

export default {
  publicAPI,
  privateAPI,
};
