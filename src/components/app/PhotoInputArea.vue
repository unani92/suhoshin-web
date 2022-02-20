<template>
    <div class="photo-input">
        <div class="photo center" :class="from === 'dating-review' ? 'white' : ''" @click="onClickPhoto">
            <div class="img-container" v-if="customPhoto.url">
                <i @click.stop="onClickClear" class="material-icons">clear</i>
                <img @click.stop="onClickPhoto" :src="customPhoto.url" />
            </div>
            <div v-else class="flex center">
                <i class="material-icons f-36 m-b-10">photo</i>
            </div>
        </div>
        <input
            ref="imageUploader"
            type="file"
            class="image-input display-none"
            @change="onChangeImage($event)"
            accept="image/*"
        />
    </div>
</template>

<script>
export default {
    name: 'PhotoInputArea',
    props: {
        from: String,
        isOption: Boolean,
        mode: String,
    },
    data: () => ({
        customPhoto: {
            blob: null,
            url: null,
        },
    }),
    computed: {
        optionExplain() {
            if (this.isOption) return this.$translate('PHOTO_OPTIONAL')
            else return this.$translate('PHOTO')
        },
    },
    methods: {
        onClickPhoto() {
            this.$refs.imageUploader.click()
        },
        onClickClear() {
            this.customPhoto = {
                blob: null,
                url: null,
            }
            this.$emit('clearPhoto')
        },
        onChangeImage(e) {
            const file = e.target.files[0]
            this.$refs.imageUploader.value = ''

            this.$modal
                .custom({
                    component: 'ModalCropper',
                    options: {
                        imgFile: file,
                        mode: this.mode,
                    },
                })
                .then(croppedFile => {
                    if (!croppedFile) return
                    this.customPhoto.url = URL.createObjectURL(croppedFile)
                    this.customPhoto.blob = croppedFile
                    this.$emit('submitPhoto', this.customPhoto)
                })
        },
    },
}
</script>

<style scoped lang="scss">
.photo-input {
    margin-top: 16px;
}

.img-container {
    position: relative;
    width: 100%;
    height: 100%;
    @include center;
    i {
        border-radius: 50%;
        padding: 4px;
        background: rgba(0, 0, 0, 0.3);
        color: white;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99999;
    }

    img {
        width: auto;
        height: 100%;
        border-radius: 10px;
    }
}

.photo {
    $section-side-padding: 16px;
    $bottom-button-height: 80px;

    width: calc(100vw - #{$section-side-padding} * 2);
    height: calc(100vw - #{$section-side-padding} * 2);
    background-color: $grey-01;
    border-radius: 10px;
    border: 1px solid $grey-01;

    .btn {
        background-color: $grey-09;
        height: 40px;
        padding: 10px 30px;
        z-index: inherit;
    }

    &.white {
        background: white;
        width: calc(100vw - 40px);
        height: calc(100vw - 40px);
        border: 1px solid $grey-03;
    }
}
</style>
