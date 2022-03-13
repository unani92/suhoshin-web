<template>
    <div class="update-games">
        <StackRouterHeaderBar />
        <div class="btns">
            <div @click="onClickCreate" class="btn btn-primary">매치 생성</div>
            <div class="btn btn-black m-r-8">매치 삭제</div>
        </div>
        <div class="contents"></div>
    </div>
</template>

<script>
import gamesService from '@/services/games'
export default {
    name: 'UpdateGamesPage',
    async mounted() {
        const { data } = await gamesService.getAll()
        console.log(data)
    },
    methods: {
        onClickCreate() {
            this.$stackRouter.push({ name: 'UpdateGamesCreatePage' })
        },
    },
}
</script>

<style scoped lang="scss">
.update-games {
    .btns {
        padding: 0 16px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;

        .btn {
            height: 32px;
            width: 72px;
            font-size: 12px;
            padding: 4px;
        }
    }
}
</style>
