const NODE_ENV = process.env.NODE_ENV
const dist = NODE_ENV === 'test' ? 'dist-test' : 'dist'

module.exports = {
    publicPath: '/',
    outputDir: dist,
    configureWebpack: {
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
            },
        },
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint')
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/styles/utils/variables.scss";
                    @import "@/assets/styles/utils/colors.scss";
                    @import "@/assets/styles/utils/mixins.scss";
                `,
            },
        },
    },
}
