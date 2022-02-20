<template>
    <div class="admin-page">
        <HeaderBar />
        <div class="content">
            <ul class="menu">
                <li class="item" v-for="item in upper" :key="item.key" @click="onClickMenu(item)">
                    <i class="material-icons-outlined icon" v-if="item.icon">{{ item.icon }}</i>
                    <span class="key" v-html="$translate(item.key)" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/control-panel/HeaderBar'
export default {
    name: 'AdminPage',
    components: { HeaderBar },
    mounted() {
        if (this.$store.getters.me.user_status !== 2) this.$router.push('/')
    },
    computed: {
        upper() {
            return [
                {
                    key: 'STATUS_UPDATE',
                    route: 'StatusUpdateAdminPage',
                    icon: 'account_circle',
                    show: true,
                },
                {
                    key: 'CHECK_NOTE',
                    route: 'BlockUserPage',
                    icon: 'mail_outline',
                    show: false,
                },
            ]
        },
    },
    methods: {
        onClickMenu(item) {
            if (!item.show) {
                this.$toast.error('기능 개발 중입니다.')
                return
            }
            this.$stackRouter.push({ name: item.route })
        },
    },
}
</script>

<style scoped lang="scss">
.item {
    padding: 24px 16px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
        border-bottom: solid 1px $grey-02;
    }

    .icon {
        color: $grey-06;
        margin-right: 20px;
    }

    .key {
        font-size: 16px;
        color: black;
    }
}
</style>
