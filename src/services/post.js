import * as $http from 'axios'

export default {
    uploadImage: payload => $http.post('/post/upload-image', payload),
    tempUpload: () => $http.post('/post/temp-upload'),
    deletePost: id => $http.delete(`/post/delete/${id}`),
    uploadPost: payload => $http.put('/post/upload', payload),
    getPosts: {
        all: (page, type) => $http.get(`/post?page=${page || 0}&post_type=${type}`),
        getPostById: postId => $http.get(`post?/get-info?post_id${postId}`),
        getMain: () => $http.get(`/post/hot`),
    },
    updateThumbs: postId => $http.post(`post/thumb/${postId}`),
    getThumbInfo: postId => $http.get(`post/thumb?post_id=${postId}`),
}
