import * as $http from 'axios'

export default {
    comment: {
        getAllComments: postId => $http.get(`/comments?post_id=${postId}`),
        createComment: payload => $http.post(`/comments/create`, payload),
        fixComment: (commentId, payload) => $http.put(`/comments/fix/${commentId}`, payload),
        deleteComment: commentId => $http.delete(`/comments/delete/${commentId}`),
    },
    reply: {
        createReply: payload => $http.post(`/comments/create_reply`, payload),
        fixReply: (replyId, payload) => $http.put(`/comments/fix_reply/${replyId}`, payload),
        deleteReply: replyId => $http.delete(`/comments/delete/${replyId}`),
    },
}
