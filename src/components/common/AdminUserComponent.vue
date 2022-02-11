<template>
    <div class="user-admin">
        <div class="left">
            <img :src="require('@/assets/images/suhoshin.jpeg')" alt="" />
            <div class="name">
                <span>{{ $translate('ADMIN') }}</span>
            </div>
        </div>
        <div class="right">
            {{ $moment(this.created_at).format('YY/M/D') }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminUserComponent',
    props: ['created_at'],
}
</script>

<style scoped lang="scss">
.user-admin {
    padding: 8px 16px;
    @include between;

    .left {
        display: flex;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 8px;
        }
    }
    .right {
        font-size: 12px;
        color: $grey-06;
    }
}
</style>
