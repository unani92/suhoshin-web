import * as $http from 'axios'

export default {
    getAll: () => $http.get('/games'),
    createGame: payload => $http.post('/games/create', payload),
    fixGame: (gameId, payload) => $http.put(`/games/fix/${gameId}`, payload),
}
