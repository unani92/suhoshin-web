<template>
    <div class="home">
        <Loading :loading="true" />
    </div>
</template>
<script>
import commonService from '@/services/common'

export default {
    name: 'HomePage',
    data: () => ({
        me: null,
        terms: null,
        idx: 0,
    }),
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            try {
                // me가 없다라는것은 로그인하지 않았다는 의미이기 때문에 logout 로직 수행
                await this.initMe()
                await this.initTerms()

                const registerDevice = () => {
                    setTimeout(() => {
                        // device id 있는지 5번까지 체크
                        if (this.$store.getters.device) {
                            this.$store.dispatch('registerDeviceId')
                        } else if (this.idx < 5) {
                            this.idx += 1
                            registerDevice()
                        }
                    }, 500)
                }
                registerDevice()
                // this.checkNPS()
                // if (this.me.profile.status.includes('waitlist')) {
                if (this.me.profile.status === 'waitlist_marry' || this.me.profile.status === 'waitlist_age') {
                    this.$router.push({
                        name: 'WaitlistPage',
                        params: {
                            user: this.me,
                        },
                    })
                    // } else if () {
                } else {
                    this.$router.push({ name: 'ChatsPage', params: { preventSetChatNull: true } })
                }
            } catch (e) {
                console.log(e)
            }
        },
        async initMe() {
            try {
                await this.$store.dispatch('loadMe')
                await this.$store.dispatch('loadMyVerificationBadges')
                this.me = this.$store.getters.me || {}
            } catch (e) {
                return Promise.reject()
            }
        },
        async initTerms() {
            await this.$store.dispatch('loadTerms')
            const { terms } = this.$store.getters.terms || {}
            this.terms = terms
        },
        checkTerms() {
            return (
                this.me.service_terms_version < this.terms.service.version ||
                this.me.privacy_terms_version < this.terms.privacy.version ||
                this.me.privacy_third_terms_version < this.terms.privacy_third.version
            )
        },
        async loadRewards() {
            try {
                const lastId = window.localStorage.getItem('lastRewardId') || null
                const rewards = await commonService.rewards(lastId)

                rewards.forEach(reward => {
                    this.$nativeBridge.postMessage({
                        action: 'sendAirbridgeEvent',
                        value: {
                            category: 'match_success_cnt_as_dating_target',
                        },
                    })
                })

                if (rewards.length > 0) {
                    window.localStorage.setItem('lastRewardId', `${rewards[0]}`)
                }
            } catch (e) {
                console.error(e)
            }
        },
        checkNPS() {
            const { nps_on: npsOn } = this.me

            if (npsOn) {
                const date = new Date()
                const userId = this.me.id
                if (this.$isIOS()) {
                    const alreadySeenToday = window.localStorage.getItem(
                        `nts${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${userId}`
                    )
                    if (!alreadySeenToday) {
                        this.$router.push({ name: 'NTSMainPage' })

                        throw new Error()
                    }
                } else {
                    const alreadySeenToday = window.localStorage.getItem(
                        `nps${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${userId}`
                    )

                    if (!alreadySeenToday) {
                        this.$router.push({ name: 'NPSMainPage' })

                        throw new Error()
                    }
                }
            }
        },
    },
}
</script>
