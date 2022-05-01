<template>
    <div class="post-page"></div>
</template>

<script>
import postService from '@/services/post'
export default {
    name: 'MyPostPage',
    data: () => ({
        page: 0,
    }),
    async mounted() {
        const { data: posts } = await postService.getPosts.getPostByMe(this.page)
        console.log(posts)
    },
}
</script>

<style scoped></style>
