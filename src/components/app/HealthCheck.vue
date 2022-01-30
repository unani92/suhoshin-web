<template>
    <div class="health-check" />
</template>

<script>
export default {
    name: 'HealthCheck',
    data: () => ({
        interv: null,
    }),
    mounted() {
        this.callApi()
        this.interv = setInterval(_ => this.callApi(), 1000 * 60)
    },
    beforeDestroy() {
        if (this.interv) {
            clearInterval(this.interv)
        }
    },
    methods: {
        compareVersion(buildNumberFrontend) {
            const prevBuildNumber = this.$store.getters.buildNumberFrontend

            if (!prevBuildNumber) return

            if (prevBuildNumber !== buildNumberFrontend) {
                this.$modal
                    .basic({
                        title: 'FRONTEND_UPDATED',
                        body: this.$translate('FRONTEND_UPDATED_BODY'),
                        buttons: [
                            {
                                label: 'CONFIRM',
                                class: 'c-primary',
                            },
                        ],
                    })
                    .then(idx => {
                        if (idx === 0) {
                            location.reload()
                        }
                    })
            }
        },
        async callApi() {
            try {
                // const data = await commonService.gitDescriptions()
                // if (!data) return
                // let newBuildNumberPc = data.build_number_pc
                // this.compareVersion(newBuildNumberPc) // Must precede to commit below
                // this.$store.commit('setVersionInfo', newBuildNumberPc)
            } catch (e) {
                console.error(e)
            }
        },
    },
}
</script>
