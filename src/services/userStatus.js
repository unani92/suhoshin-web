import * as $http from 'axios'

export default {
    createVerify: payload => $http.post('status-update/create', payload),
}
