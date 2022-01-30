<template>
    <header class="root-header-bar" v-if="$isRootRoute()">
        <div class=""></div>
        <div class="right">
            <img
                @click="onClickHowToUsePoint"
                class="m-r-2"
                src="@/assets/images/point.png"
                width="24px"
                height="24px"
            />
            <div class="invitation-point p-relative" v-html="badges.invite_point" />
            <div class="bell p-relative" @click="onClickNotification">
                <img class="m-r-2" src="@/assets/images/alarm.png" width="24px" height="24px" />
                <!-- <i class="material-icons">notifications_none</i> -->
                <div v-if="showUnreadNotifications" class="badge" />
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'RootHeaderBar',
    computed: {
        me() {
            return this.$store.getters.me
        },
        badges() {
            return this.$store.getters.badges || {}
        },
        photo_url() {
            if (!this.me) return ''
            if (!this.me.photos.length) return ''

            return this.me.photos[0].url
        },
        showUnreadNotifications() {
            return (this.$store.getters.notifications || []).filter(n => !n.read).length > 0
        },
    },
    methods: {
        onClickNotification() {
            this.$router.push({ name: 'NotificationsPage' })
        },
        async onClickHowToUsePoint() {
            const idx = await this.$modal.custom({
                component: 'ModalHowToUsePoint',
                options: {},
            })

            if (idx) this.$router.push({ name: 'InvitationFriendPage' })
        },
    },
}
</script>

<style lang="scss" scoped>
.root-header-bar {
    width: 100vw;
    height: 48px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .right {
        display: flex;
        padding-top: 12px;
        align-items: center;

        .privacy {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            @include center;
            background-color: $grey-02;
            margin-right: 20px;

            &.active {
                background-color: $blue-facebook;
            }
        }

        .material-icons {
            color: $grey-08;
        }

        .invitation-point {
            font-size: 16px;
            color: #111111;
            @include f-regular;
            margin-right: 8px;
        }

        .bell {
            height: 24px;
            flex: none;
        }
    }
}
</style>
