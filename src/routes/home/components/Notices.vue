<template>
    <div class="notice" v-if="mainNoti.length">
        <NoticeItem
            :mode="notice.post_type === 1 ? 'NOTICE' : 'MATERIAL'"
            :notice="notice"
            v-for="notice in mainNoti"
            :key="notice.id"
        />
    </div>
</template>

<script>
import NoticeItem from '@/routes/home/components/NoticeItem'
export default {
    name: 'Notices',
    components: { NoticeItem },
    computed: {
        mainNoti() {
            return (this.$store.getters.mainPosts || {}).noti || []
        },
    },
}
</script>

<style scoped lang="scss">
.notice {
    padding: 16px;
}
</style>
