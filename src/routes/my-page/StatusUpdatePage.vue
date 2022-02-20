<template>
    <div class="status-update">
        <StackRouterHeaderBar :show-title="true" title="정회원 인증" />
        <div class="container">
            <div class="title">정회원 인증</div>
            <section class="section">
                <div class="item">
                    <div class="section-title">소속 모임</div>
                    <SelectInput :scroll-fix="true" :options="groups" @selected="selectGroup" />
                </div>
                <div class="item">
                    <div class="section-title">내용</div>
                    <TextareaWithX v-model="content" />
                </div>
                <div class="item" v-if="(selectedGroup || {}).id === 0">
                    <div class="section-title">인증사진</div>
                    <PhotoInputArea
                        mode="full-screen"
                        :isOption="true"
                        @submitPhoto="updatePhoto"
                        @clearPhoto="clearPhoto"
                    />
                </div>
                <div class="item" v-else>
                    <div class="section-title c-pink-deep">* 주의사항</div>
                    <div class="desc">
                        <p>개별 회원은 소속 모임에서 <span class="spoqa-f-bold">"개별회원"을 선택</span> 바랍니다.</p>
                        <p>
                            소모임 회원은 <span class="spoqa-f-bold">인증사진 없이 </span>운영진 승인으로 정회원 인증이
                            가능합니다. 모임 회원이 아닐 시 인증이 반려되니 유의바랍니다.
                        </p>
                    </div>
                </div>
            </section>
        </div>
        <BottomButton @click="submit" :label="$translate('SUBMIT')" />
    </div>
</template>

<script>
import PhotoInputArea from '@/components/app/PhotoInputArea'
import SelectInput from '@/components/app/SelectInput'
import userStatusService from '@/services/userStatus'

export default {
    name: 'StatusUpdatePage',
    components: { PhotoInputArea, SelectInput },
    data: () => ({
        content: null,
        thumbnail: null,
        selectedGroup: null,
    }),
    computed: {
        groups() {
            return this.$store.getters.groups
        },
    },
    methods: {
        preparePayload(payload) {
            const formData = new FormData()
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value)
            })

            return formData
        },
        async submit() {
            try {
                this.$loading(true)
                let payload = {
                    content: this.content,
                    group_id: this.selectedGroup.id,
                }
                if (this.thumbnail) payload.thumbnail = this.thumbnail.blob
                payload = this.preparePayload(payload)

                const {
                    data: { msg },
                } = await userStatusService.createVerify(payload)
                this.$toast.success(msg)
                this.$stackRouter.pop()
            } catch (e) {
                console.log(e)
            } finally {
                this.$loading(false)
            }
        },
        updatePhoto(photo) {
            this.thumbnail = photo
        },
        clearPhoto() {
            this.thumbnail = {
                blob: null,
                url: null,
            }
        },
        selectGroup(val) {
            this.selectedGroup = val
        },
    },
}
</script>

<style scoped lang="scss">
.status-update {
    .desc {
        line-height: 24px;
        font-size: 14px;
    }
    @include default-create-layout;

    ::v-deep .textarea-with-x {
        textarea {
            height: 140px;
        }
    }
}
</style>
