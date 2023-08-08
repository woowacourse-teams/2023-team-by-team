import { PATH_NAME } from '~/constants/routes';

const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');

  return process.env.NODE_ENV === 'production'
    ? accessToken
    : process.env.REACT_APP_ACCESS_TOKEN;
};

const resetAccessToken = () => {
  localStorage.removeItem('accessToken');
  alert('로그인이 필요합니다.');
  history.pushState({}, '', PATH_NAME.LANDING);
};

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
};

export const http = {
  get: async <T>(url: RequestInfo | URL): Promise<T> => {
    const response = await fetch(url, options);

    if (response.status === 401) {
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response.json();
  },

  post: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'POST',
      ...options,
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  patch: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'PATCH',
      ...options,
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  delete: async (url: RequestInfo | URL) => {
    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
    });

    if (response.status === 401) {
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },
};
