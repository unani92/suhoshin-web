<template>
    <div class="modal-basic">
        <div class="top-bar">
            <i @click="$emit('close')" class="material-icons">close</i>
        </div>
        <div class="container">
            <div class="left">
                <div class="logo">
                    <div class="img-container" v-lazy:background-image="options.img" />
                </div>
            </div>
            <div class="right">
                <div class="top">
                    <div class="name c-black f-16 m-b-8" v-html="options.name" />
                    <div class="intro-shorten c-grey-07 f-12" v-html="options.intro_shorten" />
                </div>
                <div class="bottom">
                    <p v-html="options.intro.split(/\n/).join('<br>')" />
                    <div class="sns-link">
                        <p class="m-r-8">SNS:</p>
                        <img @click="onClickInsta" class="m-r-8" :src="require('@/assets/icons/icon-instagram.png')" />
                        <img @click="onClickHomePage" :src="require('@/assets/icons/icon-homepage.png')" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalIntroduceGroup',
    props: ['options'],
    methods: {
        onClickInsta() {
            window.open(this.options.sns, '_blank')
        },
        onClickHomePage() {
            window.open(this.options.homepage, '_blank')
        },
    },
}
</script>

<style scoped lang="scss">
.modal-basic {
    width: 85%;
    margin: 0 auto;

    .top-bar {
        display: flex;
        flex-direction: row-reverse;
    }

    .container {
        display: flex;
    }

    .left {
        .logo {
            width: 120px;
            height: 120px;
            border-radius: 50%;

            .img-container {
                width: 70%;
                height: 70%;
                border-radius: 50%;
                border: 2px solid #111111;
                background-size: cover;
                background-position: center 8px;
            }
        }
    }
    .right {
        .top {
            padding-bottom: 12px;
            border-bottom: 1px solid $grey-06;
            height: fit-content;
            line-height: 16px;
        }
        .bottom {
            padding-top: 16px;
            font-size: 14px;
            line-height: 20px;
        }
        .sns-link {
            font-size: 15px;
            display: flex;
            margin-top: 16px;

            img {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>
