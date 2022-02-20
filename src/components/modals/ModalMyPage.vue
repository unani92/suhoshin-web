<template>
    <div class="modal-basic">
        <div class="ticket-deco">
            <div class="deco-container">
                <div class="red bar" />
                <div class="bar" />
                <div class="red bar" />
                <div class="bar" />
            </div>
        </div>

        <div class="top-bar">
            <i @click="$emit('close')" class="material-icons">close</i>
        </div>
        <div class="container">
            <div class="profile">
                <div class="left m-r-16">
                    <img :src="me.thumbnail" alt="" />
                </div>
                <div class="right">
                    <div class="nickname m-b-8">
                        <span v-html="me.nickname" />
                        <i class="m-l-8 f-16 material-icons">edit</i>
                    </div>
                    <div class="user-status">
                        <span class="m-r-4">회원등급: </span>
                        <span :class="`badge user-${me.user_status}`" v-html="userStatus" />
                    </div>
                    <div @click="statusUpdate" class="btn btn-black">정회원 인증하기</div>
                </div>
            </div>
            <div class="menus"></div>
        </div>
        <div class="ticket-deco">
            <div class="deco-container">
                <div class="red bar" />
                <div class="bar" />
                <div class="red bar" />
                <div class="bar" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalMyPage',
    computed: {
        me() {
            return this.$store.getters.me
        },
        userStatus() {
            const status = this.me.user_status

            return this.$translate(`USER_STATUS_${status}`)
        },
    },
    methods: {
        statusUpdate() {
            this.$emit('close')
            setTimeout(() => {
                this.$stackRouter.push({
                    name: 'StatusUpdatePage',
                })
            }, 100)
        },
    },
}
</script>

<style scoped lang="scss">
.modal-basic {
    width: 85vw;
    margin: 0;
    padding: 0 20px;
    position: relative;

    .top-bar {
        float: right;
    }
    .container {
        width: 100%;
        height: 400px;
        clear: both;
        padding: 12px 0;

        .profile {
            display: flex;
            align-items: center;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            .user-status {
                display: flex;
                align-items: center;
            }
            .nickname {
                @extend .user-status;
                @include spoqa-f-bold;
                display: flex;
                align-items: center;
            }
            .btn {
                margin-top: 12px;
                height: 32px;
                font-size: 14px;
                cursor: pointer;
            }
            .badge {
                @include spoqa-f-bold;
                font-size: 12px;
                padding: 2px;
                border-radius: 4px;
                color: white;
                background: $grey-06;
            }
        }
        .menus {
        }
    }
}
.ticket-deco {
    width: 100%;

    //@include center;
    .deco-container {
        @include center;
    }
    .bar {
        @include center;
        width: 20px;
        height: 40px;
        background: #111111;

        &.red {
            background: $suhoshin-red;
        }
    }
}
</style>
