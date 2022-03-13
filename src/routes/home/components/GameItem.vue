<template>
    <div class="game-item" :class="game.home_away ? 'away' : 'home'">
        <div class="left">
            <div class="m-b-8 spoqa-f-medium">
                <span class="m-r-4">({{ game.home_away ? 'A' : 'H' }})</span>
                <span>{{ game.other }}</span>
            </div>
            <div>
                <div class="badge">{{ matchType }}</div>
            </div>
        </div>
        <div class="right">
            <div class="match-result">
                <div class="win-lose" :class="parseWinLose">{{ parseWinLose }}</div>
                <span class="m-r-4 spoqa-f-bold f-16">{{ game.score_us }} - {{ game.score_other }}</span>
            </div>
            <div class="scorers m-t-4" v-if="game.scorer">
                <div class="score f-10" v-for="score in scorer" :key="score">{{ score }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameItem',
    props: {
        game: Object,
    },
    computed: {
        matchType() {
            return this.game.match_type === 0 ? 'K리그' : this.game.match_type === 1 ? 'FA컵' : 'ACL'
        },
        parseWinLose() {
            return this.game.score_us > this.game.score_other
                ? 'W'
                : this.game.score_us === this.game.score_other
                ? 'D'
                : 'L'
        },
        scorer() {
            if (!this.game.scorer) return false

            return this.game.scorer.split(' ')
        },
    },
}
</script>

<style scoped lang="scss">
.game-item {
    @include between;
    padding: 12px 8px;
    background: $suhoshin-red;
    border-radius: 8px;
    color: white;
    width: 70%;

    &.away {
        background: #111111;

        .D {
            background: white !important;
            color: black !important;
        }
    }

    .badge {
        background: white;
        color: $suhoshin-red;
        padding: 2px 4px;
        border-radius: 100px;
        font-size: 12px;
        @include spoqa-f-medium;
        @include center;
    }
    .match-result {
        @include center;

        .win-lose {
            border-radius: 50%;
            font-size: 12px;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            @include center;

            &.W {
                background: green;
            }
            &.D {
                background: black;
            }
            &.L {
                background: $grey-05;
                color: $grey-09;
            }
        }
    }
    .score {
        text-align: right;
    }
}
</style>
