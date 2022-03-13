<template>
    <div class="home">
        <Games />
    </div>
</template>
<script>
import Games from '@/routes/home/components/Games'
export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
        games() {
            return this.$store.getters.games
        },
    },
    components: { Games },
    created() {
        this.init()
    },
    methods: {
        async init() {},
    },
}
</script>
