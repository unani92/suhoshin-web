<template>
    <div class="loading" v-if="loading">
        <div class="m-a" :class="animation || 'dot-falling'" />
    </div>
</template>

<script>
export default {
    props: ['loading', 'animation'],
}
</script>

<style scoped>
.loading {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: transparent;
    z-index: 2500;
    display: flex;
    align-items: center;
}
</style>
