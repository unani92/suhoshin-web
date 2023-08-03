<template>
    <div class="youtube-swiper">
        <swiper :options="swiperOptions" :navigation="true" ref="mySwiper">
            <swiper-slide v-for="youtubeId in youtubeIds" :key="youtubeId">
                <iframe
                    :width="isMobile ? '70%' : 560"
                    :height="isMobile ? 'auto' : 315"
                    :src="`https://www.youtube-nocookie.com/embed/${youtubeId}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; background;"
                    allowfullscreen
                />
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

export default {
    name: 'youtubes',
    components: {
        swiper,
        swiperSlide,
    },
    computed: {
        isMobile() {
            return this.$store.getters.viewPort === 'mobile'
        },
        youtubeIds() {
            return ['6DU_SZzPuLE', 'i5zmbUIhzoE', 'FhKh5xIda-c']
        },
        swiperOptions() {
            return {
                initialSlide: this.youtubeIds.length - 1,
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
.youtube-swiper {
    padding: 32px 16px;
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
