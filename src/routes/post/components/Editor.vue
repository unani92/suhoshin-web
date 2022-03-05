<template>
    <div>
        <div ref="editor" id="editor" />
        <BottomButton @click="save" />
    </div>
</template>

<script>
import { Editor } from '@toast-ui/editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import postService from '@/services/post'

export default {
    name: 'Editor',
    data: () => ({
        imgData: null,
        imgNum: 0,
        editor: null,
    }),
    methods: {
        save() {
            const data = this.editor.getHTML()
            this.$emit('save', data)
        },
        preparePayload(payload) {
            const formData = new FormData()
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value)
            })

            return formData
        },
    },
    mounted() {
        // this.editor = new Editor.factory({
        //     el: document.getElementById('editor'),
        //     viewer: true,
        //     initialValue: ''
        // })
        this.editor = new Editor({
            el: document.getElementById('editor'),
            initialEditType: 'wysiwyg',
            hideModeSwitch: true,
            height: 'calc(100vh - 250px)',
            toolbarItems: [
                ['heading', 'bold', 'italic', 'strike'],
                ['image', 'link'],
            ],
            plugins: [colorSyntax],
            hooks: {
                addImageBlobHook: async (blob, callback) => {
                    const croppedFile = await this.$modal.custom({
                        component: 'ModalCropper',
                        options: {
                            imgFile: blob,
                        },
                    })

                    if (!croppedFile) return
                    const {
                        data: { imgUrl },
                    } = await postService.uploadImage(
                        this.preparePayload({
                            img_num: this.imgNum,
                            image: croppedFile,
                        })
                    )
                    this.imgNum += 1
                    callback(imgUrl, 'img')
                },
            },
        })
    },
}
</script>

<style scoped lang="scss">
#editor {
    width: 100%;
    height: auto;
    position: relative;
}
</style>
