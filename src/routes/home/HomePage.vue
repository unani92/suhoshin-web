<template>
    <div class="home">
        <Notices v-if="mainPosts.noti" />
        <Games v-if="games.length" />
        <Youtubes />
        <HotPosts v-if="mainPosts.hot" />
    </div>
</template>
<script>
import Games from '@/routes/home/components/Games'
import Notices from '@/routes/home/components/Notices'
import HotPosts from '@/routes/home/components/HotPosts'
import Youtubes from '@/routes/home/components/Youtubes'
export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
        mainPosts() {
            return this.$store.getters.mainPosts
        },
        games() {
            return this.$store.getters.games
        },
    },
    async mounted() {
        await this.$store.dispatch('getMainPosts')
        await this.$store.dispatch('afterAuthCallbacks')
    },
    components: { Games, Notices, HotPosts, Youtubes },
    created() {
        this.init()
    },
    methods: {
        async init() {},
    },
}
</script>
