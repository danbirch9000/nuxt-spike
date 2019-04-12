import axios from "axios";

export const axiosGetRequest = ({ commit, mutation, url, errorMessage }) => {
  commit(mutation, { data: null, loading: true, errorMessage: null });
  return axios
    .get(url)
    .then(result => {
      commit(mutation, {
        data: result.data,
        loading: false
      });
      return result;
    })
    .catch(error => {
      commit(mutation, {
        loading: false,
        data: null,
        errorMessage
      });
      return Promise.reject(error);
    });
};

export const axiosPostRequest = ({
  commit,
  mutation,
  payload,
  url,
  errorMessage
}) => {
  commit(mutation, { data: null, loading: true, errorMessage: null });
  return axios
    .post(url, payload)
    .then(result => {
      commit(mutation, {
        data: result.data || { success: true },
        loading: false,
        payload
      });
      return result;
    })
    .catch(error => {
      commit(mutation, {
        loading: false,
        errorMessage
      });
      return Promise.reject(error);
    });
};

export const axiosPatchRequest = ({
  commit,
  mutation,
  payload,
  url,
  errorMessage
}) => {
  commit(mutation, { data: null, loading: true, errorMessage: null });
  return axios
    .patch(url, payload)
    .then(result => {
      commit(mutation, {
        data: result.data || { success: true },
        loading: false,
        payload
      });
      return result;
    })
    .catch(error => {
      commit(mutation, {
        loading: false,
        errorMessage
      });
      return Promise.reject(error);
    });
};

export const axiosDeleteRequest = ({
  commit,
  mutation,
  url,
  errorMessage,
  payload
}) => {
  commit(mutation, { data: null, loading: true, errorMessage: null });
  return axios
    .delete(url)
    .then(result => {
      commit(mutation, {
        data: result.data || { success: true },
        loading: false,
        payload
      });
      return result;
    })
    .catch(error => {
      commit(mutation, {
        loading: false,
        errorMessage
      });
      return Promise.reject(error);
    });
};
