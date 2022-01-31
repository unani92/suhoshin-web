export const stackRouterComponents = {
    VoteCreatePage: () => import('@/routes/votepage/VoteCreatePage'),
}

export function isStackRoute(name) {
    if (!name) return false

    return Object.keys(stackRouterComponents).findIndex(key => key === name) > -1
}
