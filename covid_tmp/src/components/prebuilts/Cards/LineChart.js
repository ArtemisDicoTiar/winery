import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['options', 'width', 'height'],
    mounted () {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object

        this.$refs.canvas.height = this.height
        this.$refs.canvas.width = this.width

        this.renderChart(this.chartData, this.options)

    }
}