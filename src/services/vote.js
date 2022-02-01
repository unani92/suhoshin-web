import * as $http from 'axios'

export default {
    getAll: payload => $http.get(`/vote?page=${payload || 0}`),
    createVote: payload => $http.post('/vote/create', payload),
}
