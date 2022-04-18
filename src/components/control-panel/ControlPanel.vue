<template>
    <div v-if="$store.getters.me" class="control-panel">
        <div class="menu-items">
            <!--            flex-row items-center  flex-fill-->
            <MenuButton
                @click="button.action"
                :icon="button.icon"
                :badgeCount="button.badgeCount"
                :label="button.label"
                :selected="button.selected"
                :key="button.label"
                v-for="button in buttons"
            />
        </div>
    </div>
</template>

<script>
import MenuButton from './MenuButton'

export default {
    components: {
        MenuButton,
    },
    computed: {
        numUnreads() {
            return (this.$store.getters.chats || []).reduce((total, chat) => total + chat.unread || 0, 0)
        },
        badges() {
            return this.$store.getters.badges || {}
        },
        userAge() {
            return this.$options.filters.asAge(this.$store.getters.me.profile.birthday)
        },
        buttons() {
            const btns = [
                {
                    action: () => {
                        this.navigate('IntroducePage')
                    },
                    label: '수호신 소개',
                    selected: this.$route.name === 'IntroducePage',
                },
                {
                    action: () => {
                        this.navigate('PostPage')
                    },
                    label: '커뮤니티',
                    selected: this.$route.name === 'PostPage',
                },
                {
                    action: () => {
                        this.navigate('AwayPage')
                    },
                    label: '배너&원정신청',
                    selected: this.$route.name === 'AwayPage',
                },
                {
                    action: () => {
                        const img = require('@/assets/images/temp.png')
                        this.$modal.basic({
                            body: `<img width="80%" height="auto" src="${img}">`,
                            buttons: [
                                {
                                    label: 'CONFIRM',
                                    class: 'btn-primary',
                                },
                            ],
                        })
                    },
                    label: '수호신 상품 구매',
                    selected: this.$route.name === 'MyPage',
                },
            ]

            return btns
        },
    },
    methods: {
        navigate(name) {
            this.$router.push({ name }).catch(e => {})
        },
        icon(icon) {
            return {}
        },
    },
}
</script>

<style lang="scss" scoped>
.control-panel {
    z-index: 1;
    //position: fixed;
    width: 100%;
    border-bottom: 1px solid $grey-02;
    height: $header-height;

    .menu-items {
        //padding: 6px 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>
