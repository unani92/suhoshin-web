<template>
    <div class="not-found">
        <div class="f-700 f-28 m-b-30">
            {{ 'NOT_FOUND' | translate }}
        </div>
        <button @click="$router.push({ name: 'FrontPage' })" class="btn btn-primary m-a m-t-32">
            {{ 'GO_TO_HOME' | translate }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'NotFoundPage',
}
</script>

<style lang="scss" scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50%;
}
</style>
