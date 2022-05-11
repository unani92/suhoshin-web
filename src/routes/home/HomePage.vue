<template>
    <div class="home">
        <Notices v-if="mainPosts.noti" />
        <Games v-if="games.length" />
        <HotPosts v-if="mainPosts.hot" />
    </div>
</template>
<script>
import Games from '@/routes/home/components/Games'
import Notices from '@/routes/home/components/Notices'
import HotPosts from '@/routes/home/components/HotPosts'
// import img from '@/assets/images/temp.png'
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
        // const bannerTemp = localStorage.getItem('bannerTemp')
        // if (!bannerTemp) {
        //     localStorage.setItem('bannerTemp', true)
        //     // const img = require('@/assets/images/temp.png')
        //     this.$modal.basic({
        //         body: `<img width="80%" height="auto" src="${img}">`,
        //         buttons: [
        //             {
        //                 label: 'CONFIRM',
        //                 class: 'btn-primary',
        //             },
        //         ],
        //     })
        // }
        await this.$store.dispatch('getMainPosts')
        await this.$store.dispatch('afterAuthCallbacks')
    },
    components: { Games, Notices, HotPosts },
    created() {
        this.init()
    },
    methods: {
        async init() {},
    },
}
</script>
