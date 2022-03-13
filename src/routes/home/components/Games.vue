<template>
    <div class="games">
        <swiper :options="swiperOptions" :navigation="true" ref="mySwiper">
            <swiper-slide v-for="game in games" :key="game.id">
                <GameItem :game="game" />
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev">
                <i class="material-icons">chevron_left</i>
            </div>
            <div class="swiper-button-next" slot="button-next">
                <i class="material-icons">chevron_right</i>
            </div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import GameItem from '@/routes/home/components/GameItem'

export default {
    name: 'Games',
    components: {
        swiper,
        swiperSlide,
        GameItem,
    },
    computed: {
        games() {
            return this.$store.getters.games
        },
        swiperOptions() {
            return {
                initialSlide: 4,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        },
    },
}
</script>

<style scoped lang="scss">
.games {
    padding: 0 16px;
    .swiper-slide {
        @include center;
    }
    .swiper-button-next,
    .swiper-button-prev {
        background-image: none !important;
        font-size: 24px;
        @include center;
        i {
            color: black;
        }
    }
}
</style>
