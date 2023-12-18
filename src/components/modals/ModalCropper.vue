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
    computed: {},
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
        initCropper() {
            const image = document.getElementById('cropping-image')
            if (!image) return

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
            this.cropper = new Cropper(image, {
                viewMode: 1,
                dragMode: 'move',
                cropBoxMovable: true,
                autoCropArea: 1,
                toggleDragModeOnDblclick: false,
                background: false,
                guides: false,
                center: false,
                minContainerWidth: window.innerWidth,
            })
            // this.cropper = new Cropper(image)
        },
        confirm() {
            const blobToFile = blob => new File([blob], this.options.imgFile.name, { type: 'image/webp' })

            this.cropper.getCroppedCanvas().toBlob(blob => this.$emit('close', blobToFile(blob)), 'image/webp', 0.5)
        },
    },
}
</script>
