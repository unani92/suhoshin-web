<template>
    <div class="home"></div>
</template>
<script>
import commonService from '@/services/common'

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
            const { data } = await commonService.loadGroups()
            this.$store.commit('setGroups', data)
        },
    },
}
</script>
