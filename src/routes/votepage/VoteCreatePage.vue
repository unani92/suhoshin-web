<template>
    <div class="vote-create">
        <StackRouterHeaderBar />
        <div class="content">
            <div class="title">투표 생성</div>
            <div class="section">
                <div class="item m-b-32">
                    <div class="section-title">제목</div>
                    <TextareaWithX v-model="title" :is-input-mode="true" />
                </div>
                <div class="item">
                    <div class="section-title">내용</div>
                    <TextareaWithX v-model="content" />
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
        <BottomButton :label="$translate('SUBMIT')" />
    </div>
</template>

<script>
import PhotoInputArea from '@/components/app/PhotoInputArea'
export default {
    name: 'VoteCreatePage',
    components: {
        PhotoInputArea,
    },
    data: () => ({
        customPhoto: null,
        title: null,
        content: null,
        voteContents: [],
    }),
    methods: {
        updatePhoto(photo) {
            this.customPhoto = photo
        },
        clearPhoto() {
            this.customPhoto = {
                blob: null,
                url: null,
            }
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
        }
    }
}
</style>
