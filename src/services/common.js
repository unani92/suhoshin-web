import * as $http from 'axios'

export default {
    constants: () => $http.get('v2/constants'),
    terms: () => $http.get('v2/terms'),
    gitDescriptions: () => $http.get('v2/git_descriptions'),
    properties: params => $http.get('v2/properties', { params }),
    settings: () => $http.get('v2/users/me/settings'),
    refunds: () => $http.get('v2/refunds'),
    createRefund: refund => $http.post('/v2/refunds', refund),
    uploadEvidence: payload => $http.post('v2/evidences', payload),
    banners: category => $http.get(`v2/banners?category=${category}`),
    ratingOptions: () => $http.get('v2/rating_options'),
    datingPreferences: () => $http.get('v2/dating_preferences'),
    userDatingPreferences: payload => $http.post('v2/user_dating_preferences', payload),
    keywords: (id, name) => $http.get(`v2/keywords?keyword_category_id=${id}&name=${name}`),
    userKeywords: {
        create: ({ keywordId, name, keywordCategoryId }) =>
            $http.post(
                `v2/user_keywords?keyword_id=${keywordId}&name=${name}&keyword_category_id=${keywordCategoryId}`
            ),
        delete: keywordId => $http.delete(`v2/user_keywords/delete?keyword_id=${keywordId}`),
    },
    dateCoachings: () => $http.get('v2/dating_coachings'),
    reportReasons: target => $http.get(`v2/report_reasons?rtype=${target}`),
    feedbackOption: () => $http.get('v2/feedbacks'),
    rewards: lastId => $http.get(`v2/rewards?last_id=${lastId}`),
    agentPick: {
        recommend: () => $http.get('v2/agent_picks/recommend'),
        create: payload => $http.post('v2/agent_picks', payload), // payload = { agent_ids: [] }
    },
    create: payload => $http.post('v2/temp_devices', payload),
}
