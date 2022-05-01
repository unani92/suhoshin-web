export const stackRouterComponents = {
    VoteCreatePage: () => import('@/routes/vote/VoteCreatePage'),
    VoteDetailPage: () => import('@/routes/vote/VoteDetailPage'),
    StatusUpdatePage: () => import('@/routes/my-page/StatusUpdatePage'),
    StatusUpdateAdminPage: () => import('@/routes/my-page/admin/StatusUpdateAdminPage'),
    PostCreatePage: () => import('@/routes/post/PostCreatePage'),
    PostDetailPage: () => import('@/routes/post/PostDetailPage'),
    UpdateGamesPage: () => import('@/routes/my-page/admin/UpdateGamesPage'),
    UpdateGamesCreatePage: () => import('@/routes/my-page/admin/UpdateGamesCreatePage'),
    MyPostPage: () => import('@/routes/my-page/my-post/MyPostPage'),
}

export function isStackRoute(name) {
    if (!name) return false

    return Object.keys(stackRouterComponents).findIndex(key => key === name) > -1
}
