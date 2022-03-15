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
                        <i
                            @click="clickDeclinedReason"
                            v-if="(request || {}).confirmed === -1"
                            class="material-icons f-16 m-l-8"
                            >info</i
                        >
                    </div>
                    <div
                        @click="statusUpdate"
                        :class="{ disabled: request.confirmed === 0 || me.user_status >= 1 }"
                        class="btn btn-black"
                    >
                        {{ me.user_status >= 1 ? `인증 완료` : `정회원 인증하기` }}
                    </div>
                </div>
            </div>
            <div class="menus">
                <div class="item" @click="routeAdmin" v-if="me.user_status === 2">
                    <span>운영진 메뉴</span>
                    <i class="material-icons">chevron_right</i>
                </div>
            </div>
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
import userStatusService from '@/services/userStatus'

export default {
    name: 'ModalMyPage',
    async mounted() {
        const { data } = await userStatusService.getByUserId(this.me.id)
        if (data.length) this.request = data[0]
    },
    data: () => ({
        request: {},
    }),
    computed: {
        me() {
            return this.$store.getters.me
        },
        userStatus() {
            const status = this.me.user_status
            const pending = this.request.confirmed === 0

            if (pending) return '심사중'
            return this.$translate(`USER_STATUS_${status}`)
        },
    },
    methods: {
        statusUpdate() {
            if (this.request.confirmed === 0 || this.me.user_status >= 1) {
                return
            }

            // this.$modal.basic({
            //     title: '공사 중',
            //     body: '아직 사이트가 런칭되지 않아 정회원 인증이 진행되지 않습니다.<br>런칭 후 뵙겠습니다☺️',
            //     buttons: [
            //         {
            //             label: 'CONFIRM',
            //             class: 'btn-primary',
            //         },
            //     ],
            // })

            this.$emit('close')
            setTimeout(() => {
                this.$stackRouter.push({
                    name: 'StatusUpdatePage',
                })
            }, 100)
        },
        routeAdmin() {
            this.$emit('close')
            setTimeout(() => {
                this.$router.push('/admin')
            }, 100)
        },
        clickDeclinedReason() {
            const reason = this.request.declined_reason.split(/\n/).join('<br>')
            this.$modal.basic({
                body: reason,
                buttons: [
                    {
                        label: 'CONFIRM',
                        class: 'btn-primary',
                    },
                ],
            })
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

                &.disabled {
                    background: $grey-04;
                    color: $grey-09;
                }
            }
            .badge {
                @include spoqa-f-bold;
                font-size: 12px;
                padding: 2px 4px;
                border-radius: 4px;
                color: white;
                background: $grey-06;

                &.user-1 {
                    background: $suhoshin-red;
                }
                &.user-2 {
                    background: $yellow-premium-grad-event;
                }
            }
        }
        .menus {
            margin-top: 32px;

            .item {
                @include between;
            }
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
