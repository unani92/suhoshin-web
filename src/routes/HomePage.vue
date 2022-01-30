<template>
    <div class="home">
        <RootHeaderBar />
    </div>
</template>
<script>
import RootHeaderBar from '@/components/app/RootHeaderBar'

export default {
    name: 'HomePage',
    data: () => ({}),
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    components: {
        RootHeaderBar,
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            try {
                // me가 없다라는것은 로그인하지 않았다는 의미이기 때문에 logout 로직 수행
                await this.initMe()
            } catch (e) {
                console.log(e)
            }
        },
        async initMe() {
            try {
            } catch (e) {
                return Promise.reject()
            }
        },
    },
}
</script>
