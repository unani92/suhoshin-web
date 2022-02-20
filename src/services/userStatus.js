import * as $http from 'axios'

export default {
    createVerify: payload => $http.post('status-update/create', payload),
    getAll: page => $http.get(`status-update?page=${page || 0}`),
    getByUserId: userId => $http.get(`status-update/${userId}`),
    handleRequest: (id, payload) => $http.put(`status-update/handle/${id}`, payload),
}
