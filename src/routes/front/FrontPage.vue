<template>
    <div class="front-page" v-lazy:background-image="require('@/assets/images/suhoshin-front.png')">
        <BottomButton @click="login" :label="$translate('START_WITH_KAKAO')" />
    </div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
import userService from '@/services/user'

export default {
    name: 'Frontpage',
    async mounted() {
        if (!window.Kakao.isInitialized()) {
            Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY)
            const { code } = this.$router.history.current.query
            if (code) {
                await this.getKaKaoInfo(code)
            }
        }
    },
    methods: {
        async testLogin() {
            try {
                const {
                    data: { jwtToken, me },
                } = await userService.testLogin({
                    uuid: 1111,
                    nickname: '테스터',
                    email: 'unani9922@naver.com',
                    thumbnail: 'http://k.kakaocdn.net/dn/FehL4/btrjcAI6D68/vzKSRj3PnS6dL7mB9K3wO1/img_110x110.jpg',
                })
                const header = { Authorization: `Bearer ${jwtToken}` }
                this.$store.commit('setHeader', header)
                this.$store.commit('setMe', me)

                this.$router.push({ name: 'HomePage' })
            } catch (e) {
                alert(e)
            }
        },
        login() {
            window.Kakao.Auth.authorize({
                redirectUri: window.location.href,
            })
        },
        async getKaKaoInfo(accessCode) {
            try {
                const {
                    data: { jwtToken, me },
                } = await userService.kakaoLogin(accessCode)
                const header = { Authorization: `Bearer ${jwtToken}` }
                this.$store.commit('setHeader', header)
                this.$store.commit('setMe', me)

                this.$router.push({ name: 'HomePage' })
            } catch (e) {
                this.$toast.error('로그인 에러 발생')
                console.log(e)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.front-page {
    @include between;
    height: 100vh !important;
    flex-direction: column;
    padding: 16px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto 100vh;

    ::v-deep .bottom-button {
        background: transparent;
        button {
            background: $yellow-kakao;
            color: black;
        }
    }
}
</style>
