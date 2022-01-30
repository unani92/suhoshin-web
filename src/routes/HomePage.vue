<template>
    <div class="home">
        <!--        <Loading :loading="true" />-->
    </div>
</template>
<script>
import commonService from '@/services/common'

export default {
    name: 'HomePage',
    data: () => ({
        me: null,
        terms: null,
        idx: 0,
    }),
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
                const { data } = await commonService.test()
                console.log(data)
                // await this.$store.dispatch('loadMe')
                // this.me = this.$store.getters.me || {}
            } catch (e) {
                return Promise.reject()
            }
        },
    },
}
</script>
