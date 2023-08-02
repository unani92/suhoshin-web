<template>
    <div>
        <div ref="editor" id="editor" />
        <BottomButton :disabled="disabled" @click="save" />
    </div>
</template>

<script>
import youtubeIcon from '../../../assets/images/icons/youtubeIcon.png'
import { Editor } from '@toast-ui/editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import postService from '@/services/post'

export default {
    name: 'Editor',
    props: {
        disabled: Boolean,
        postId: Number,
        initialValue: {
            type: String,
            default: null,
        },
    },
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
        const myCustomEl = document.createElement('span')
        myCustomEl.style = 'cursor: pointer;'

        const icon = document.createElement('img')
        icon.setAttribute('src', youtubeIcon)
        icon.setAttribute('width', '32')
        myCustomEl.appendChild(icon)

        // 팝업 바디 생성
        const container = document.createElement('div')
        const description = document.createElement('p')

        description.textContent = 'Youtube 주소를 입력하고 Enter를 누르세요!'

        const urlInput = document.createElement('input')
        urlInput.style.width = '100%'

        // 팝업 input 창에 내용 입력 시 호출됨
        urlInput.addEventListener('keyup', e => {
            // 엔터를 누르면, 입력값이 Youtube 주소인지 정규식으로 검사
            if (e.key === 'Enter') {
                if (
                    /https:\/\/youtu.be\/.{11,}/.test(e.target.value) ||
                    /https:\/\/www.youtube.com\/watch\?v=.{11,}/.test(e.target.value)
                ) {
                    const str =
                        '<div class="video-container"><iframe src="https://www.youtube-nocookie.com/embed/' +
                        e.target.value.slice(-11) +
                        '" title="YouTube video player" frameborder="0" allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; background;" allowfullscreen></iframe></div>'

                    // 마크다운 모드에서 iframe 태그 삽입 후, 팝업을 닫고 위지윅 모드로 변환
                    this.editor.changeMode('markdown')
                    this.editor.insertText(str)
                    this.editor.eventEmitter.emit('closePopup')
                    this.editor.changeMode('wysiwyg')
                    e.target.value = ''
                }
            }
        })

        container.appendChild(description)
        container.appendChild(urlInput)

        this.editor = new Editor.factory({
            el: document.getElementById('editor'),
            initialEditType: 'wysiwyg',
            initialValue: this.initialValue || '',
            hideModeSwitch: true,
            height: 'calc(100vh - 300px)',
            toolbarItems: [
                ['heading', 'bold', 'italic', 'strike'],
                ['image', 'link'],
                [
                    {
                        name: 'Youtube',
                        tooltip: 'Youtube',
                        el: myCustomEl,
                        popup: {
                            body: container,
                            style: { width: 'auto', left: '50% !important' },
                        },
                    },
                ],
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
                            post_id: this.postId,
                            img_num: this.imgNum,
                            image: croppedFile,
                        })
                    )
                    this.imgNum += 1
                    callback(imgUrl, 'img')
                },
            },
            customHTMLRenderer: {
                htmlBlock: {
                    iframe(node) {
                        return [
                            { type: 'openTag', tagName: 'iframe', outerNewLine: true, attributes: node.attrs },
                            { type: 'html', content: node.childrenHTML ? node.childrenHTML : '' },
                            { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
                        ]
                    },
                    div(node) {
                        return [
                            { type: 'openTag', tagName: 'div', outerNewLine: true, attributes: node.attrs },
                            { type: 'html', content: node.childrenHTML ? node.childrenHTML : '' },
                            { type: 'closeTag', tagName: 'div', outerNewLine: true },
                        ]
                    },
                },
                htmlInline: {
                    big(node, { entering }) {
                        return entering
                            ? { type: 'openTag', tagName: 'big', attributes: node.attrs }
                            : { type: 'closeTag', tagName: 'big' }
                    },
                },
            },
        })
        setTimeout(() => this.editor.changeMode('wysiwyg'), 100)
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
