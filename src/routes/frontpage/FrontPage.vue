<template>
    <div class="front-page">
        <img :src="require('@/assets/images/suhoshin.jpeg')" alt="" />
        <div class="buttons">
            <div @click="login" class="btn btn-kakao">카카오톡 시작하기</div>
        </div>
    </div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
import userService from '@/services/user'

export default {
    name: 'Frontpage',
    mounted() {
        if (!window.Kakao.isInitialized()) {
            Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY)
        }
    },
    methods: {
        login() {
            window.Kakao.Auth.login({
                success: this.getKaKaoInfo,
                fail: function (error) {
                    console.log(error)
                },
            })
        },
        async getKaKaoInfo(authInfo) {
            const {
                data: { jwtToken, me },
            } = await userService.kakaoLogin(authInfo.access_token)
            const header = { Authorization: `Bearer ${jwtToken}` }
            this.$store.commit('setHeader', header)
            this.$store.commit('setMe', me)

            this.$router.push({ name: 'HomePage' })
        },
    },
}
</script>

<style scoped lang="scss">
.front-page {
    @include between;
    flex-direction: column;
    padding: 16px;

    img {
        margin-top: 120px;
        width: 120px;
        height: auto;
    }
    .buttons {
        width: 100%;
    }
}
</style>
