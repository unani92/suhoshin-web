import * as $http from 'axios'

export default {
    createVote: payload => $http.post('/vote/create', payload),
}
