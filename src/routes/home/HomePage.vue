<template>
    <div class="home">
        <Notices />
        <Games />
    </div>
</template>
<script>
import Games from '@/routes/home/components/Games'
import Notices from '@/routes/home/components/Notices'

export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    async mounted() {
        await this.$store.dispatch('getMainPosts')
    },
    components: { Games, Notices },
    created() {
        this.init()
    },
    methods: {
        async init() {},
    },
}
</script>
