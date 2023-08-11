import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';

const resetAccessToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  alert('로그인이 필요합니다.');
  window.location.href = PATH_NAME.LANDING;
};

export const http = {
  get: async <T>(url: RequestInfo | URL): Promise<T> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
    });

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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      resetAccessToken();
      throw new Error('유효한 사용자 정보가 아닙니다.');
    }

    if (response.status === 404) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  patch: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
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
