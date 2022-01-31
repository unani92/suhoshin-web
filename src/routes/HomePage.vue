<template>
    <div class="home">
        <ControlPanel />
    </div>
</template>
<script>
import ControlPanel from '@/components/control-panel/ControlPanel'

export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    components: {
        ControlPanel,
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            if (!this.me) {
                this.$router.push({ name: 'FrontPage' })
            }
        },
    },
}
</script>
