export const stackRouterComponents = {
    VoteCreatePage: () => import('@/routes/vote/VoteCreatePage'),
    VoteDetailPage: () => import('@/routes/vote/VoteDetailPage'),
}

export function isStackRoute(name) {
    if (!name) return false

    return Object.keys(stackRouterComponents).findIndex(key => key === name) > -1
}
