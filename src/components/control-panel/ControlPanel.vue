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
                    icon: this.icon('message'),
                    label: '대화방',
                    badgeCount: this.numUnreads,
                    selected: this.$route.name === 'ChatsPage',
                },
                // {
                //     action: () => {
                //         this.navigate('SchedulePage')
                //         this.$nativeBridge.postMessage({
                //             action: 'sendFirebaseEvent',
                //             value: {
                //                 category: 'BottomNav_Click_Schedule',
                //             },
                //         })
                //     },
                //     icon: this.icon('date'),
                //     label: 'SCHEDULE',
                //     selected: this.$route.name === 'SchedulePage',
                // },
                {
                    action: () => {
                        this.navigate('InvitationFriendPage')
                        this.$nativeBridge.postMessage({
                            action: 'sendFirebaseEvent',
                            value: {
                                category: 'BottomNav_Click_Invitation',
                            },
                        })
                    },
                    icon: this.icon('invite'),
                    label: '초대 리워드',
                    selected: this.$route.name === 'InvitationFriendPage',
                },
                /* {
                    action: () => {
                        this.navigate('CommunicationPage')
                        this.$nativeBridge.postMessage({
                            action: 'sendFirebaseEvent',
                            value: {
                                category: 'BottomNav_Click_Communication',
                            },
                        })
                    },
                    icon: this.icon('noti'),
                    label: '소통',
                    selected: this.$route.name === 'CommunicationPage',
                }, */
                {
                    action: () => {
                        this.navigate('MyPage')
                        this.$nativeBridge.postMessage({
                            action: 'sendFirebaseEvent',
                            value: {
                                category: 'BottomNav_Click_ProfileMenu',
                            },
                        })
                    },
                    icon: this.icon('my'),
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
            return {
                active: require(`@/assets/images/tab/icon_${icon}_active@2x.png`),
                inactive: require(`@/assets/images/tab/icon_${icon}_inactive@2x.png`),
            }
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
