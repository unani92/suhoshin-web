<template>
    <div class="notice-item">
        <div class="left">
            <span class="spoqa-f-bold">공지사항</span>
            <div v-if="isNew" class="new-badge">N</div>
        </div>
        <div class="right">
            <span>{{ notice.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoticeItem',
    props: {
        notice: Object,
    },
    computed: {
        isNew() {
            const createdAt = this.notice.created_at
            const dateDiff = this.$moment(createdAt).diff(this.$moment(), 'days')

            return dateDiff === 0
        },
    },
}
</script>

<style scoped lang="scss">
.notice-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid $grey-02;
    border-radius: 12px;
    width: 100%;
    margin-bottom: 8px;
}
.left {
    display: flex;
    align-items: center;
    width: 100px;
}
.new-badge {
    font-size: 10px;
    background: $suhoshin-red;
    color: white;
    padding: 2px;
    margin-left: 4px;
    border-radius: 4px;
    height: 12px;
    width: 12px;
    @include spoqa-f-medium;
    @include center;
}
</style>
