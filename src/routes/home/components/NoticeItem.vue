<template>
    <div class="notice-item" @click="onClickItem(notice)">
        <div class="left">
            <span class="spoqa-f-bold">공지사항</span>
            <div v-if="isNew" class="new-badge m-l-4">N</div>
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
    methods: {
        onClickItem(post) {
            this.$stackRouter.push({ name: 'PostDetailPage', props: { post } })
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
.right {
    width: calc(100% - 100px);
    @include lines-1;
}
</style>
