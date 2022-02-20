<template>
    <div class="admin-status-update">
        <StackRouterHeaderBar />
        <div class="container">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="left">
                    <img class="photo" @click="onClickImage(item.thumbnail)" v-lazy="item.thumbnail" />
                    <div class="content">
                        <div class="name f-14" v-html="item.user.nickname" />
                        <div class="group f-14" v-html="item.group.name" />
                        <p class="lines-2 f-14" v-html="item.content" />
                    </div>
                </div>
                <div class="btns">
                    <div class="btn btn-primary m-b-8" @click="onClickHandle(item, true)">승인</div>
                    <div class="btn btn-black" @click="onClickHandle(item, false)">반려</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userStatusService from '@/services/userStatus'
export default {
    name: 'StatusUpdateAdminPage',
    async mounted() {
        const { data } = await userStatusService.getAll(this.page)
        this.list = [...data]
    },
    data: () => ({
        page: 0,
        list: [],
    }),
    methods: {
        onClickImage(img) {
            if (!img) return

            this.$modal.custom({
                component: 'ModalImages',
                options: {
                    images: [img],
                },
            })
        },
        async onClickHandle(item, status) {
            let reason
            if (!status) {
                reason = await this.$modal.custom({
                    component: 'ModalInput',
                })
            }
            const payload = {
                user_id: item.user.id,
                status,
            }
            if (reason) payload.declined_reason = reason
            const { data } = await userStatusService.handleRequest(item.id, payload)

            this.list = this.list.filter(l => l.id !== item.id)
            this.$toast.success(data.msg)
        },
    },
}
</script>

<style scoped lang="scss">
.admin-status-update {
    .container {
        padding: 16px;

        .item {
            @include between;
            padding: 8px;
            border: 1px solid $grey-04;
            border-radius: 8px;

            .left {
                display: flex;
                align-items: center;
                img {
                    width: 80px;
                    height: 80px;
                    margin-right: 12px;
                }
                .content {
                    line-height: 20px;
                    max-width: 55%;
                }
            }

            .btn {
                min-width: 15%;
                padding: 4px 8px;
                height: 28px;
                font-size: 12px;
            }
        }
    }
}
</style>
