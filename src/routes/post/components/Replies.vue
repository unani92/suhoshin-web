<template>
    <div class="replies-items">
        <ReplyItem :post="post" :reply="item" v-for="item in replies" :key="item.id" />
    </div>
</template>

<script>
import ReplyItem from '@/routes/post/components/ReplyItem'
export default {
    name: 'Replies',
    props: ['replies', 'post'],
    components: { ReplyItem },
}
</script>

<style scoped lang="scss">
.replies-items {
}
</style>
