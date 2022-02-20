export const stackRouterComponents = {
    VoteCreatePage: () => import('@/routes/vote/VoteCreatePage'),
    VoteDetailPage: () => import('@/routes/vote/VoteDetailPage'),
    StatusUpdatePage: () => import('@/routes/my-page/StatusUpdatePage'),
    StatusUpdateAdminPage: () => import('@/routes/my-page/StatusUpdateAdminPage'),
}

export function isStackRoute(name) {
    if (!name) return false

    return Object.keys(stackRouterComponents).findIndex(key => key === name) > -1
}
