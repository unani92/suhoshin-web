<template>
    <div class="intro">
        <div class="img-container">
            <img :src="require('@/assets/images/introduce.png')" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'IntroducePage',
}
</script>

<style scoped lang="scss">
.intro {
    .img-container {
        width: 100%;
        margin: 16px 0 32px 0;
        img {
            width: 100%;
            height: auto;
            border: 1px solid $grey-01;
            border-radius: 8px;
        }
    }
}
</style>
