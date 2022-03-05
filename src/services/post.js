import * as $http from 'axios'

export default {
    uploadImage: payload => $http.post('/post/upload-image', payload),
    tempUpload: () => $http.post('/post/temp-upload'),
    deletePost: id => $http.delete(`/post/delete/${id}`),
}
