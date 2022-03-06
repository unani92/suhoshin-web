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
            <Editor :postId="post.id" :disabled="disabled" @save="savePost" />
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
    }),
    computed: {
        disabled() {
            return !(this.title && this.selectedPostType)
        },
        postType() {
            return [
                {
                    id: 1,
                    name: '공지사항',
                },
                {
                    id: 2,
                    name: '자유게시판',
                },
            ]
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
                const payload = {
                    id: this.post.id,
                    title: this.title,
                    content: val,
                    post_type: this.selectedPostType.id,
                }

                const { data } = await postService.uploadPost(payload)
                this.$toast.success(data.msg)
                this.$stackRouter.pop()
            } catch (e) {
                this.$toast.error(e.data.message)
            }
        },
        async backHandler() {
            const res = await this.$modal.basic({
                body: '저장하지 않은 게시글은 삭제됩니다. 저장 시 임시글에 저장됩니다.',
                buttons: [
                    {
                        label: '삭제하기',
                        class: 'btn-default',
                    },
                    {
                        label: 'SAVE',
                        class: 'btn-primary',
                    },
                ],
            })

            if (!res) {
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
