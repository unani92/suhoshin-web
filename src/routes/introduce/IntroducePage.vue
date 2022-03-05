<template>
    <div class="intro" v-if="groups">
        <div class="img-container">
            <img :src="require('@/assets/images/introduce.png')" alt="" />
        </div>
        <div class="intro-main">
            <h4 class="text-center">그대들이 가는 길 우리가 지켜주리라</h4>
        </div>
        <div class="groups-intro">
            <p class="f-18">수호신 구성 소모임 소개</p>
            <p class="f-12 c-grey-06">클릭 시 소개화면으로 넘어갑니다</p>
            <div class="grid-col">
                <div class="item" v-for="group in groups" :key="group.id">
                    <div
                        @click="onClickGroupIntro(group)"
                        class="img-circle"
                        v-lazy:background-image="group.logo_img"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IntroducePage',
    methods: {
        onClickGroupIntro(group) {
            this.$modal.custom({
                component: 'ModalIntroduceGroup',
                options: { ...group },
            })
        },
    },
    computed: {
        groups() {
            const allGroups = this.$store.getters.groups
            return allGroups.filter(item => item.id)
        },
    },
}
</script>

<style scoped lang="scss">
.intro {
    .img-container {
        width: 100%;
        margin: 16px 0 32px 0;
        img {
            width: 100%;
            height: auto;
            border: 1px solid $grey-01;
            border-radius: 8px;
        }
    }
    .intro-main {
        margin-bottom: 32px;
    }
    .groups-intro {
        text-align: center;
        line-height: 24px;

        .grid-col {
            grid-template-columns: repeat(4, 1fr);
            padding: 24px 16px;

            .item {
                @include center;

                .img-circle {
                    width: 70px;
                    height: 70px;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 2px solid #111111;
                    background-size: cover;
                    background-position: center center;
                }
            }
        }
    }
}
</style>
