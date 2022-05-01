import * as $http from 'axios'
import { store as $store } from '@/store'

export default {
    uploadImage: payload => $http.post('/post/upload-image', payload),
    tempUpload: () => $http.post('/post/temp-upload'),
    deletePost: id => $http.delete(`/post/delete/${id}`),
    toggleEnabled: id => $http.put(`/post/delete/${id}`),
    uploadPost: payload => $http.put('/post/upload', payload),
    getPosts: {
        // all: (page, type) => $http.get(`/post?page=${page || 0}&post_type=${type}&len=${len}`),
        all: (page, type) =>
            $http.get(
                `/post?page=${page || 0}&post_type=${type}&len=${$store.getters.viewPort === 'mobile' ? 10 : 30}`
            ),
        getPostByMe: page =>
            $http.get(`/post/me?page=${page || 0}&len=${$store.getters.viewPort === 'mobile' ? 10 : 30}`),
        getPostById: postId => $http.get(`post?/get-info?post_id${postId}`),
        getMain: () => $http.get(`/post/hot`),
    },
    updateThumbs: postId => $http.post(`post/thumb/${postId}`),
    getThumbInfo: postId => $http.get(`post/thumb?post_id=${postId}`),
    updateHits: postId => $http.put(`post/update_hit/${postId}`),
}
