<template>
    <div class="post-detail">
        <StackRouterHeaderBar :show-title="true" :title="post.title" />
        <PostContentHeader :post="post" />
        <div class="content">
            <div id="editor" />
            <div class="thumb">
                <div class="click-container">
                    <i class="material-icons m-r-8">thumb_up_alt</i>
                    <span>공감</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Editor } from '@toast-ui/editor'
import PostContentHeader from '@/routes/post/components/PostContentHeader'

export default {
    name: 'PostDetailPage',
    components: { PostContentHeader },
    data: () => ({
        editor: null,
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
    }
}
</style>
