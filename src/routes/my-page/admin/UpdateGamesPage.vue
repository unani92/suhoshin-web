<template>
    <div class="update-games">
        <StackRouterHeaderBar />
        <div class="btns">
            <div @click="onClickCreate" class="btn btn-primary">매치 생성</div>
        </div>
        <div class="contents">
            <div class="item" v-for="item in games" :key="item.id" @click="fixMatchResult(item)">
                <div class="match-day">
                    <div>{{ $moment(item.match_day).format('YY/M/D') }}</div>
                    <span class="m-r-4">vs{{ item.other }}</span>
                    <span>({{ item.home_away ? 'A' : 'H' }})</span>
                </div>
                <div class="match-result" v-if="item.score_us !== null">
                    <div :class="parseWinLose(item)">
                        <span class="m-r-4">{{ item.score_us }} : {{ item.score_other }}</span>
                        <span>{{ parseWinLose(item) }}</span>
                    </div>
                    <div class="scorer m-t-4 f-12">{{ item.scorer }}</div>
                </div>
                <div class="btn btn-brd">삭제</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UpdateGamesPage',
    computed: {
        games() {
            return this.$store.getters.games
        },
    },
    methods: {
        onClickCreate() {
            this.$stackRouter.push({ name: 'UpdateGamesCreatePage' })
        },
        parseWinLose(item) {
            return item.score_us > item.score_other ? 'W' : item.score_us === item.score_other ? 'D' : 'L'
        },
        fixMatchResult(item) {
            this.$stackRouter.push({
                name: 'UpdateGamesCreatePage',
                props: { gameInfo: item },
            })
        },
    },
}
</script>

<style scoped lang="scss">
.update-games {
    .btns {
        padding: 0 16px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }
    .btn {
        height: 32px;
        width: 72px;
        font-size: 12px;
        padding: 4px;
    }
    .contents {
        padding: 16px;

        .item {
            font-size: 14px;
            margin-bottom: 8px;
            padding: 4px 0;
            border-bottom: 1px solid $grey-02;
            @include between;

            .match-day {
                width: 80px;
                line-height: 20px;
            }
            .match-result {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .D {
                    color: $grey-04;
                }
                .L {
                    color: $brand-danger;
                }
            }
        }
    }
}
</style>
