import * as $http from 'axios'

export default {
    test: () => $http.get('/notes/1'),
    loadGroups: () => $http.get('/groups'),
}
