import * as $http from 'axios'

export default {
    getAll: payload => $http.get(`/vote?page=${payload || 0}`),
    createVote: payload => $http.post('/vote/create', payload),
    getVoteInfo: voteId => $http.get(`vote/vote_info?vote_id=${voteId}`),
    userVote: {
        get: voteId => $http.get(`vote/user_vote?vote_id=${voteId}`),
        create: payload => $http.post(`vote/user_vote`, payload),
        fix: (voteId, payload) => $http.put(`vote/user_vote/${voteId}`, payload),
    },
}
