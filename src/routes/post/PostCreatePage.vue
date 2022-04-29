<template>
    <div class="post-create">
        <StackRouterHeaderBar :left-button-handler="backHandler" :show-title="true" title="자유게시판" />
        <div class="container">
            <div class="item m-b-16">
                <TextareaWithX placeholder="제목" v-model="title" :is-input-mode="true" />
                <SelectInput
                    class="m-t-8"
                    :scroll-fix="true"
                    :options="postType"
                    :placeholder="'분류'"
                    @selected="selectPostType"
                />
            </div>
            <Editor v-if="post" :postId="post.id" :disabled="disabled" @save="savePost" />
        </div>
    </div>
</template>

<script>
import SelectInput from '@/components/app/SelectInput'
import Editor from '@/routes/post/components/Editor'
import postService from '@/services/post'

export default {
    name: 'PostCreatePage',
    components: { SelectInput, Editor },
    data: () => ({
        post: null,
        title: null,
        selectedPostType: null,
        save: false,
    }),
    computed: {
        me() {
            return this.$store.getters.me
        },
        disabled() {
            return !(this.title && this.selectedPostType)
        },
        postType() {
            const selectors = [
                {
                    id: 1,
                    name: '공지사항',
                    userStatus: [2],
                },
                {
                    id: 2,
                    name: '자유게시판',
                    userStatus: [0, 1, 2],
                },
                {
                    id: 3,
                    name: '원정신청',
                    userStatus: [2],
                },
                {
                    id: 4,
                    name: '건의사항',
                    userStatus: [1, 2],
                },
                {
                    id: 5,
                    name: '수호신 상품 구매',
                    userStatus: [2],
                },
            ]

            return this.me.user_status === 2
                ? selectors
                : selectors.filter(item => item.userStatus.includes(this.me.user_status))
        },
    },
    async mounted() {
        const { data } = await postService.tempUpload()
        this.post = data
        this.$registerBackHandler(this.backHandler)
    },
    beforeDestroy() {
        this.$unregisterBackHandler(this.backHandler)
    },
    methods: {
        selectPostType(val) {
            this.selectedPostType = val
        },
        async savePost(val) {
            if (!val) return

            try {
                this.$loading(true)
                this.save = true
                const payload = {
                    id: this.post.id,
                    title: this.title,
                    content: val,
                    post_type: this.selectedPostType.id,
                }

                const { data } = await postService.uploadPost(payload)
                await this.$store.dispatch('refresh')
                this.$toast.success(data.msg)
                this.$stackRouter.pop()
            } catch (e) {
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
        },
        async backHandler() {
            if (!this.save) {
                await postService.deletePost(this.post.id)
            }
            this.$stackRouter.pop()
        },
    },
}
</script>

<style scoped lang="scss">
.post-create {
    .container {
        padding: 16px;
    }
}
</style>
