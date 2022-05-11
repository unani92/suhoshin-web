<template>
    <div class="modal-cropper">
        <div class="body">
            <div class="cropper">
                <img id="cropping-image" :src="imgAsDataUrl" />
            </div>
        </div>
        <div class="button-wrapper">
            <button @click="$emit('close')" class="btn" v-html="$translate('CANCEL')" />
            <button @click="confirm" class="btn" v-html="$translate('CONFIRM')" />
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
    name: 'ModalCropper',
    props: ['options'],
    data: () => ({
        imgAsDataUrl: null,
        cropper: null,
    }),
    mounted() {
        this.init()
    },
    computed: {
        modeFullScreen() {
            if (this.options.mode === 'full-screen') {
                return {
                    viewMode: 1,
                    dragMode: 'move',
                    cropBoxMovable: false,
                    autoCropArea: 1,
                    toggleDragModeOnDblclick: false,
                    background: false,
                    guides: false,
                    center: false,
                    minContainerWidth: window.innerWidth,
                }
            } else return {}
        },
    },
    methods: {
        init() {
            if (!this.options || !this.options.imgFile) return

            const reader = new FileReader()
            reader.onload = e => {
                this.imgAsDataUrl = e.target.result
                setTimeout(_ => this.initCropper(), 10)
            }
            reader.readAsDataURL(this.options.imgFile)
        },
        async initCropper() {
            const image = document.getElementById('cropping-image')
            if (!image) return

            const loadImage = () => {
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.src = image.src
                    img.onload = () => resolve(img)
                    img.onerror = e => {
                        console.log(e)
                        reject(e)
                    }
                })
            }
            const img = await loadImage()

            const canvas = document.createElement('canvas')
            canvas.width = image.offsetWidth
            canvas.height = image.offsetHeight

            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, image.offsetWidth, image.offsetHeight)
            image.src = canvas.toDataURL('image/jpg')

            const options = {
                viewMode: 1,
                dragMode: 'move',
                cropBoxMovable: false,
                initialAspectRatio: 1,
                autoCropArea: 1,
                toggleDragModeOnDblclick: false,
                background: false,
                guides: false,
                center: false,
                minContainerWidth: window.innerWidth,
            }

            if (!this.options.allowFreeAspectRatio) options.aspectRatio = 1
            if (this.options.mode === 'full-screen') {
                this.cropper = new Cropper(image, this.modeFullScreen)
            } else {
                this.cropper = new Cropper(image, options)
            }
        },
        confirm() {
            const blobToFile = blob => new File([blob], this.options.imgFile.name, { type: 'image/jpeg' })

            this.cropper.getCroppedCanvas().toBlob(blob => this.$emit('close', blobToFile(blob)), 'image/jpeg', 0.5)
        },
    },
}
</script>
