import * as $http from 'axios'

export default {
    getAll: () => $http.get('/games'),
}
