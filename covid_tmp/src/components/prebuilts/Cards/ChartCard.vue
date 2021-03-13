<template>
  <md-card class="md-accent" md-theme="orange-card">
    <md-card-header
            class="card-chart"
    >
      <md-card class="md-primary" :md-theme="dataBackgroundColor">
        <line-chart
                :chart-data="chartData"
                :options="chartOptions"
                width="30"
                height="15"
        />
      </md-card>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
  import LineChart from './LineChart'
export default {
  name: "chart-card",
  components: {
    LineChart
  },
  props: {
    footerText: {
      type: String,
      default: ""
    },
    headerTitle: {
      type: String,
      default: "Chart title"
    },
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chartResponsiveOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      }
    },
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chartId: "no-id"
    };
  },
  methods: {
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart(Chart) {
      var chartIdQuery = `#${this.chartId}`;
      Chart(chartIdQuery,
              {type: this.chartType, data: this.chartData, options: this.chartOptions}
              );
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      var currentTime = new Date().getTime().toString();
      var randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  mounted() {
    this.updateChartId();
    import("chartist").then(Chartist => {
      let ChartistLib = Chartist.default || Chartist;
      this.$nextTick(() => {
        this.initChart(ChartistLib);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("white-card", (
          primary: md-get-palette-color(white, 500)
  ));

  @include md-register-theme("green-card", (
          primary: md-get-palette-color(green, 500)
  ));

  @include md-register-theme("black-card", (
          primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
          primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("orange-card", (
          primary: md-get-palette-color(orange, 500),
          accent: #a6a6a6
  ));

  @import "~vue-material/dist/base/theme";
  @import "~vue-material/dist/components/MdCard/theme";

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>