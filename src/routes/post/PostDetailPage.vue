<template>
    <div class="post-detail">
        <StackRouterHeaderBar :show-title="true" :title="post.title" />
        <PostContentHeader :post="post" />
        <div class="content">
            <div id="editor" />
            <div class="thumb">
                <div :class="{ clicked: thumb }" class="click-container" @click="clickThumb">
                    <i class="material-icons m-r-8">thumb_up_alt</i>
                    <span>공감</span>
                </div>
            </div>
        </div>
        <Comments v-if="comments" :postId="post.id" :comments="comments" />
    </div>
</template>

<script>
import { Editor } from '@toast-ui/editor'
import PostContentHeader from '@/routes/post/components/PostContentHeader'
import Comments from '@/routes/post/components/Comments'
import postService from '@/services/post'

export default {
    name: 'PostDetailPage',
    components: { PostContentHeader, Comments },
    data: () => ({
        editor: null,
        thumb: false,
    }),
    props: {
        post: Object,
    },
    mounted() {
        this.editor = new Editor.factory({
            el: document.getElementById('editor'),
            viewer: true,
            initialValue: this.post.content,
        })
        postService.getThumbInfo(this.post.id).then(({ data }) => {
            this.thumb = data.msg
        })
        this.$store.dispatch('getCurrentPostComments', this.post.id)
    },
    beforeDestroy() {
        this.$store.commit('setCurrentPostComments', null)
    },
    computed: {
        comments() {
            return this.$store.getters.currentPostComments
        },
    },
    methods: {
        async clickThumb() {
            try {
                const { data } = await postService.updateThumbs(this.post.id)
                this.$set(this.post, 'thumbs', data.msg ? this.post.thumbs + 1 : this.post.thumbs - 1)
                this.thumb = data.msg
                this.$toast.success(data.msg ? '추천했어요' : '추천을 취소했어요')
            } catch (e) {
                this.$toast.error(e.data.msg)
            }
        },
    },
}
</script>

<style scoped lang="scss">
#editor {
    padding: 16px;
}
.post-detail {
    padding-bottom: 120px;
}
.thumb {
    @include center;
    .click-container {
        width: 150px;
        border: 1px solid black;
        border-radius: 16px;
        padding: 16px;
        @include center;

        &.clicked {
            background: $suhoshin-red;
            color: white;
            border: none;

            i {
                color: white;
            }
        }
    }
}
</style>
