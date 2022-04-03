import * as $http from 'axios'

export default {
    comment: {
        getAllComments: postId => $http.get(`/comments?post_id=${postId}`),
        createComment: payload => $http.post(`/comments/create`, payload),
        fixComment: (commentId, payload) => $http.put(`/comments/fix/${commentId}`, payload),
        deleteComment: commentId => $http.delete(`/comments/delete/${commentId}`),
    },
    reply: {},
}
