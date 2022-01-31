<template>
    <div class="home"></div>
</template>
<script>
export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    components: {},
    created() {
        this.init()
    },
    methods: {
        async init() {
            // if (!this.me) {
            //     this.$router.push({ name: 'FrontPage' })
            // }
        },
    },
}
</script>
