import * as $http from 'axios'

export default {
    uploadImage: payload => $http.post('/post/upload-image', payload),
    tempUpload: () => $http.post('/post/temp-upload'),
    deletePost: id => $http.delete(`/post/delete/${id}`),
    uploadPost: payload => $http.put('/post/upload', payload),
    getPosts: {
        all: (page, type) => $http.get(`/post?page=${page || 0}&post_type=${type}`),
    },
    updateThumbs: postId => $http.post(`post/thumb/${postId}`),
}
