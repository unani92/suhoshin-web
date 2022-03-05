<template>
    <div class="post-create">
        <StackRouterHeaderBar :left-button-handler="backHandler" :show-title="true" title="자유게시판" />
        <div class="container">
            <div class="item m-b-16">
                <TextareaWithX placeholder="제목" v-model="title" :is-input-mode="true" />
            </div>
            <Editor @save="savePost" />
        </div>
    </div>
</template>

<script>
import Editor from '@/routes/post/components/Editor'
import postService from '@/services/post'

export default {
    name: 'PostCreatePage',
    components: { Editor },
    data: () => ({
        post: null,
        title: null,
    }),
    async mounted() {
        const { data } = await postService.tempUpload()
        this.post = data
        this.$registerBackHandler(this.backHandler)
    },
    beforeDestroy() {
        this.$unregisterBackHandler(this.backHandler)
    },
    methods: {
        savePost(val) {
            console.log(val)
        },
        async backHandler() {
            if (!this.title) {
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

                if (res === 0) {
                    await postService.deletePost(this.post.id)
                }

                this.$stackRouter.pop()
            } else {
                this.$stackRouter.pop()
            }
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
