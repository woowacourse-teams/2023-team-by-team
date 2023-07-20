const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}}`,
  },
};

export const http = {
  get: <T>(url: RequestInfo | URL): Promise<T> => {
    return fetch(url, options).then((response) => response.json());
  },

  post: (url: RequestInfo | URL, body: unknown) => {
    return fetch(url, {
      method: 'POST',
      ...options,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  patch: (url: RequestInfo | URL, body: unknown) => {
    return fetch(url, {
      method: 'PATCH',
      ...options,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  delete: (url: RequestInfo | URL) => {
    return fetch(url, {
      method: 'DELETE',
      ...options,
    }).then((response) => response.json());
  },
};
