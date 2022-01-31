<template>
    <div class="vote">
        ajslkfasd
        <button class="btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'VotePage',
    methods: {
        onClickCreate() {
            try {
                console.log('click')
                this.$stackRouter.push({ name: 'VoteCreatePage' })
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.btn {
    position: absolute;
    bottom: calc(#{$header-height} + 16px);
    right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.1), 2px 2px 8px 0 rgba(0, 0, 0, 0.15);
    //background-image: linear-gradient(135deg, $suhoshin-red, $pink-woman);
    background: $suhoshin-red;

    .material-icons {
        font-size: 28px;
    }
    @include center;
}
</style>
