<template>
    <div class="vote-create">
        <StackRouterHeaderBar />
        <div class="content">
            <div class="title">투표 생성</div>
            <div class="section">
                <div class="item">
                    <div class="section-title">제목</div>
                    <TextareaWithX v-model="title" :is-input-mode="true" />
                </div>
                <div class="item">
                    <div class="section-title">내용</div>
                    <TextareaWithX v-model="content" />
                </div>
                <div class="item between">
                    <div class="section-title">마감기한</div>
                    <div class="expire-at between">
                        <span class="spoqa-f-medium" v-if="expire_at" v-html="expire_at" />
                        <i @click="onClickDatePicker" class="material-icons">chevron_right</i>
                    </div>
                </div>
                <div class="item">
                    <div class="between">
                        <div class="section-title">항목</div>
                        <i @click="onClickTextArea" class="material-icons">chevron_right</i>
                    </div>
                    <div class="vote-items" v-if="voteContents.length">
                        <div class="vote-item" v-for="(content, idx) in voteContents" :key="idx">
                            <i class="material-icons">check</i>
                            <span v-html="content" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <PhotoInputArea
                        mode="full-screen"
                        :isOption="true"
                        @submitPhoto="updatePhoto"
                        @clearPhoto="clearPhoto"
                    />
                </div>
            </div>
        </div>
        <BottomButton @click="submit" :label="$translate('SUBMIT')" />
    </div>
</template>

<script>
import PhotoInputArea from '@/components/app/PhotoInputArea'
import voteService from '@/services/vote'

export default {
    name: 'VoteCreatePage',
    components: {
        PhotoInputArea,
    },
    data: () => ({
        thumbnail: null,
        title: null,
        content: null,
        voteContents: [],
        expire_at: null,
    }),
    methods: {
        updatePhoto(photo) {
            this.thumbnail = photo
        },
        clearPhoto() {
            this.thumbnail = {
                blob: null,
                url: null,
            }
        },
        async onClickDatePicker() {
            const date = await this.$modal.custom({
                component: 'ModalDatePicker',
                options: {},
            })
            if (date) this.expire_at = date
        },
        async onClickTextArea() {
            const res = await this.$modal.custom({
                component: 'ModalTextArea',
                options: {
                    content: this.voteContents.length ? this.voteContents.join('\n') : '',
                },
            })
            if (res) this.voteContents = res
        },
        async submit() {
            const payload = {
                title: this.title,
                content: this.content,
                expire_at: this.expire_at,
                voteContents: this.voteContents,
            }
            if (this.thumbnail) payload.thumbnail = this.thumbnail.blob

            this.$loading(true)
            try {
                const {
                    data: { status, msg },
                } = await voteService.createVote(this.preparePayload(payload))
                if (status === 200) {
                    this.$toast.success(msg)
                    this.$store.dispatch('loadVotes')
                    this.$stackRouter.pop()
                }
            } catch (e) {
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
        },
        preparePayload(payload) {
            const formData = new FormData()
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value)
            })

            return formData
        },
    },
}
</script>

<style scoped lang="scss">
.vote-create {
    padding-bottom: 120px;

    .content {
        padding: 16px;

        .title {
            font-size: 18px;
            text-align: center;
            color: black;
            margin-bottom: 24px;
            @include spoqa-f-bold;
        }

        .section {
            .section-title {
                font-size: 14px;
                margin-bottom: 8px;
            }
            .item {
                margin-bottom: 32px;
            }
            .between {
                @include between;
            }
            .vote-items {
                .vote-item {
                    display: flex;
                    align-items: center;
                    i {
                        font-size: 16px;
                        margin-right: 8px;
                    }
                    span {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
