<template>
    <div id="dashboardView" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID - 19 Dashboard</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <chart-card
                        :chart-data="dailySalesChart.data"
                        :chart-options="dailySalesChart.options"
                        chart-type="Line"
                        data-background-color="orange-card">
                    <template slot="content">
                        <h4 class="title">Daily Sales</h4>
                        <p class="category">
                            <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.
                        </p>
                    </template>

                    <template slot="footer">
                        <div class="stats">
                            <md-icon>access_time</md-icon>
                            updated 4 minutes ago
                        </div>
                    </template>
                </chart-card>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>

    import navBar from "@/components/navBar";
    // import StatsCard from "@/components/prebuilts/Cards/StatsCard";
    import ChartCard from "@/components/prebuilts/Cards/ChartCard";
    export default {
        components: {
            ChartCard,
            navBar
        },
        data() {
            return {
                menuVisible: false,

                dailySalesChart: {
                    data: {
                        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                        datasets: [
                            {
                                data: [12, 17, 7, 17, 23, 18, 38],
                                borderColor: 'rgb(255, 255, 255)',
                                backgroundColor: 'rgb(255, 255, 255)',
                                fill: false,

                            }
                        ],
                    },
                    options: {
                        legend: {
                            display: false,
                            labels: {
                                fontColor: "blue",
                                fontSize: 18
                            }
                        },
                        layout: {
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }
                        },
                        scales:{
                            backgroundColor: 'rgb(255, 255, 255)',
                            yAxes: [{
                                // type: 'time',
                                ticks: {
                                    fontColor: 'white',
                                    maxTicksLimit: 5,
                                    textStrokeColor: 'rgb(255, 255, 255)',
                                },
                                gridLines:{
                                    drawBorder: false,
                                    borderDash: [4, 2],
                                    borderDashOffset: 4,
                                    color: 'rgb(255, 221, 154)',
                                    zeroLineColor: 'rgb(255, 221, 154)',
                                    zeroLineBorderDash: [4, 2]
                                },
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: 'white',
                                    color: 'rgb(255, 255, 255)',
                                },
                                gridLines:{
                                    drawBorder: false,
                                    borderDash: [4, 2],
                                    color: 'rgb(255, 221, 154)',
                                    zeroLineColor: 'rgb(255, 221, 154)',
                                    zeroLineBorderDash: [4, 2]
                                },
                            }]
                        }
                    }
                }

            };
        }
    };
</script>
<style lang="scss" scoped>

    /*.md-card {*/
    /*    width: 320px;*/
    /*    margin: 4px;*/
    /*    display: inline-block;*/
    /*    vertical-align: top;*/
    /*}*/
</style>