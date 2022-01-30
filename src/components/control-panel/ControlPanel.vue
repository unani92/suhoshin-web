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
                    action: () => this.navigate('ChatsPage'),
                    label: '대화방',
                    badgeCount: this.numUnreads,
                    selected: this.$route.name === 'ChatsPage',
                },
                {
                    action: () => {
                        this.navigate('InvitationFriendPage')
                    },
                    label: '초대 리워드',
                    selected: this.$route.name === 'InvitationFriendPage',
                },
                {
                    action: () => {
                        this.navigate('MyPage')
                    },
                    label: '마이페이지',
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
    position: fixed;
    width: 100%;
    bottom: 0;
    background: white;
    border-top: 1px solid $grey-02;
    height: $header-height;

    .menu-items {
        padding: 6px 0px;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>
