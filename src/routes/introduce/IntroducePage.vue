<template>
    <div class="intro">
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
                    <div @click="onClickGroupIntro(group)" class="img-circle" v-lazy:background-image="group.img" />
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
            return [
                {
                    id: 1,
                    name: '타나토스',
                    img: require('@/assets/images/suhoshin-groups/tnts-logo.png'),
                    intro_shorten: 'Gruppo THANATOS는 2008년 만들어진 FC서울의 지지자그룹입니다',
                    intro:
                        'GRUPPO THANATOS와 함께할 형제를 모집합니다.\n성산의 청춘을 함께 그려나갈, 전국 팔도에서 날뛸수있는, 서울을 사랑하는 남자라면\n언제든 문의바랍니다. 📢🥁',
                    homepage: 'http://tnts08.com',
                    sns: 'https://www.instagram.com/p/CZLWMFqvbs6/?utm_medium=copy_link',
                },
            ]
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
                    background-position: center 8px;
                }
            }
        }
    }
}
</style>
