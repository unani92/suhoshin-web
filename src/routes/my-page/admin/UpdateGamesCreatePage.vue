<template>
    <div class="game-create">
        <StackRouterHeaderBar />
        <div class="container">
            <div class="title">경기 생성</div>
            <div class="section">
                <div class="item between">
                    <div class="section-title">날짜</div>
                    <div class="expire-at between">
                        <span class="spoqa-f-medium" v-if="matchDay" v-html="matchDay" />
                        <i @click="onClickDatePicker" class="material-icons">chevron_right</i>
                    </div>
                </div>
                <div class="item">
                    <div class="section-title">홈/원정</div>
                    <SelectInput :options="homeAwaySelect" @selected="selectHomeAway" />
                </div>
                <div class="item">
                    <div class="section-title">경기종류</div>
                    <SelectInput :options="matchTypeSelect" @selected="selectMatchType" />
                </div>
                <div class="item">
                    <div class="section-title">경기결과</div>
                    <div class="grid-col">
                        <TextareaWithX placeholder="서울" v-model="scoreHome" type="digit" :is-input-mode="true" />
                        <TextareaWithX placeholder="상대" v-model="scoreAway" type="digit" :is-input-mode="true" />
                    </div>
                </div>
                <div class="item">
                    <div class="section-title">득점</div>
                    <TextareaWithX placeholder="스페이스로 구분해주세요" v-model="scorer" :is-input-mode="true" />
                </div>
            </div>
        </div>
        <BottomButton />
    </div>
</template>

<script>
import SelectInput from '@/components/app/SelectInput'
export default {
    name: 'UpdateGamesCreatePage',
    components: { SelectInput },
    data: () => ({
        matchDay: null,
        homeAway: null,
        matchType: null,
        scoreHome: null,
        scoreAway: null,
        scorer: null,
    }),
    computed: {
        homeAwaySelect() {
            return [
                {
                    id: 0,
                    name: 'home',
                },
                {
                    id: 1,
                    name: 'away',
                },
            ]
        },
        matchTypeSelect() {
            return [
                {
                    id: 0,
                    name: 'League',
                },
                {
                    id: 1,
                    name: 'FA',
                },
                {
                    id: 2,
                    name: 'ACL',
                },
            ]
        },
    },
    methods: {
        async onClickDatePicker() {
            const date = await this.$modal.custom({
                component: 'ModalDatePicker',
                options: {},
            })
            if (date) this.matchDay = date
        },
        selectHomeAway(val) {
            this.homeAwaySelect = val
        },
        selectMatchType(val) {
            this.matchTypeSelect = val
        },
        async onClickTextArea() {
            const res = await this.$modal.custom({
                component: 'ModalTextArea',
                options: {
                    content: this.scorer ? this.scorer.join('\n') : '',
                },
            })
            if (res) this.scorer = res
        },
    },
}
</script>

<style scoped lang="scss">
.game-create {
    @include default-create-layout;
    .inputs {
    }
}
</style>
