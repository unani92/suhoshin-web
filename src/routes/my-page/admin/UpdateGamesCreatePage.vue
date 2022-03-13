<template>
    <div class="game-create">
        <StackRouterHeaderBar />
        <div class="container">
            <div class="title">경기 생성</div>
            <div class="section">
                <div class="item between">
                    <div class="section-title">날짜(필수)</div>
                    <div class="expire-at between">
                        <span class="spoqa-f-medium" v-if="matchDay" v-html="matchDay" />
                        <i @click="onClickDatePicker" class="material-icons">chevron_right</i>
                    </div>
                </div>
                <div class="item">
                    <SelectInput
                        :already-selected="gameInfo ? homeAway.id : null"
                        placeholder="홈/원정(필수)"
                        :options="homeAwaySelect"
                        @selected="selectHomeAway"
                    />
                </div>
                <div class="item">
                    <SelectInput
                        :already-selected="gameInfo ? matchType.id : null"
                        placeholder="경기종류(필수)"
                        :options="matchTypeSelect"
                        @selected="selectMatchType"
                    />
                </div>
                <div class="item">
                    <TextareaWithX placeholder="상대팀 이름(한글로 필수)" v-model="other" :is-input-mode="true" />
                </div>
                <div class="item">
                    <div class="section-title">경기결과</div>
                    <div class="grid-col">
                        <TextareaWithX placeholder="서울" v-model="scoreUs" type="digit" :is-input-mode="true" />
                        <TextareaWithX placeholder="상대" v-model="scoreOther" type="digit" :is-input-mode="true" />
                    </div>
                </div>
                <div class="item">
                    <div class="section-title">득점</div>
                    <TextareaWithX placeholder="스페이스로 구분해주세요" v-model="scorer" :is-input-mode="true" />
                </div>
            </div>
        </div>
        <BottomButton :disabled="disabled" @click="createGame" />
    </div>
</template>

<script>
import SelectInput from '@/components/app/SelectInput'
import gamesService from '@/services/games'

export default {
    name: 'UpdateGamesCreatePage',
    components: { SelectInput },
    props: ['gameInfo'],
    data: () => ({
        matchDay: null,
        homeAway: null,
        other: null,
        matchType: null,
        scoreUs: null,
        scoreOther: null,
        scorer: null,
    }),
    mounted() {
        if (this.gameInfo) {
            this.matchDay = this.$moment(this.gameInfo.match_day).format('YYYY-MM-DD')
            this.other = this.gameInfo.other
            this.homeAway = this.homeAwaySelect.find(item => this.gameInfo.home_away === item.id)
            this.matchType = this.matchTypeSelect.find(item => this.gameInfo.match_type === item.id)
            this.scoreUs = this.gameInfo.score_us
            this.scoreOther = this.gameInfo.score_other
            this.scorer = this.gameInfo.scorer
        }
    },
    computed: {
        disabled() {
            return !(this.matchDay && this.homeAway && this.matchType && this.other)
        },
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
        async createGame() {
            const payload = {
                match_day: this.matchDay,
                home_away: this.homeAway.id,
                other: this.other,
                match_type: this.matchType.id,
                score_us: this.scoreUs,
                score_other: this.scoreOther,
                scorer: this.scorer,
            }
            let msg
            if (this.gameInfo) {
                const { data } = await gamesService.fixGame(this.gameInfo.id, payload)
                msg = data.msg
            } else {
                const { data } = await gamesService.createGame(payload)
                msg = data.msg
            }
            this.$toast.success(msg)
            await this.$store.dispatch('loadGames')
            this.$stackRouter.pop()
        },
        async onClickDatePicker() {
            const date = await this.$modal.custom({
                component: 'ModalDatePicker',
                options: {},
            })
            if (date) this.matchDay = date
        },
        selectHomeAway(val) {
            console.log(val)
            this.homeAway = val
        },
        selectMatchType(val) {
            this.matchType = val
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
    .item {
        margin-bottom: 24px !important;
    }
}
</style>
