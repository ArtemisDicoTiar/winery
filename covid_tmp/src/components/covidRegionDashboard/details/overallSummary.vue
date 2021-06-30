<template>
    <md-card class="content" style="background: #006064; width: 100%; margin-left: 0%">
        <span class="md-title" style="margin-left: 1%">
                <md-icon>coronavirus</md-icon>
                COVID Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="content_copy"
                        card-color="orange"
                        title="mobility"
                        details="+245"
                        footer-icon="warning"
                        footer-content="23/03/2021"
                />
                <statsCardCustom
                        top-icon="info_outline"
                        card-color="red"
                        title="mobility"
                        details="+245"
                        footer-icon="local_offer"
                        footer-content="Tracked from Github"
                />
                <statsCardCustom
                        top-icon="no_accounts"
                        card-color="blue"
                        title="mobility"
                        details="+245"
                        footer-icon="update"
                        footer-content="Just Updated"
                />

            </div>

            <div class="md-layout">
                <graphCardCustom
                        card-color="purple"
                        title="Confirmed Cases"
                        details="Reported Confirmed Cases"
                        updated="29/03/2021"
                        graph-type="Line"
                        :graph-data="{
                            labels: covid_info.date.slice(-7),
                            series: covid_info.confirmed.slice(-7)
                        }"
                        :graph-options="options"
                />
                <graphCardCustom
                        card-color="blue"
                        title="Confirmed Cases"
                        details="Reported Confirmed Cases"
                        updated="29/03/2021"
                        graph-type="Line"
                        :graph-data="dailySalesChart.data"
                        :graph-options="options"
                />
                <graphCardCustom
                        card-color="red"
                        title="Confirmed Cases"
                        details="Reported Confirmed Cases"
                        updated="30/03/2021"
                        graph-type="Bar"
                        :graph-data="emailsSubscriptionChart.data"
                        :graph-options="options"
                />
                <graphCardCustom
                        card-color="orange"
                        title="Confirmed Cases"
                        details="Reported Confirmed Cases"
                        updated="29/03/2021"
                        graph-type="Line"
                        :graph-data="dailySalesChart.data"
                        :graph-options="options"
                />

            </div>
        </div>


    </md-card>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";


    export default {
        components: {
            statsCardCustom,
            graphCardCustom
        },
        methods: {
            getData(res, label, data) {
                console.log({
                    labels: res[label],
                    series: res[data]
                })
                return {
                    labels: res[label],
                    series: res[data]
                }
            }
        },
        computed: {
            covid_info () {return this.$store.state.totalDashBoardData.covid.info},
            covid_preds () {return this.$store.state.totalDashBoardData.covid.preds},
            covid_pred_accuracy () {return this.$store.state.totalDashBoardData.covid.pred_accuracy},
        },
        data() {
            return {
                options: {
                    lineSmooth: this.$Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    // high: Math.max(12, 17, 7, 17, 23, 18, 38, 27, 60) + 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                second: false,
                dailySalesChart: {
                    data: {
                        points: [12, 17, 7, 17, 23, 18, 38, 27, 60],
                        labels: ["M", "T", "W", "T", "F", "S", "S", "ㅅ", "D"],
                        series: [[12, 17, 7, 17, 23, 18, 38, 27, 60]]
                    },
                    options: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        // high: Math.max(12, 17, 7, 17, 23, 18, 38, 27, 60) + 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                dataCompletedTasksChart: {
                    data: {
                        labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
                        series: [[230, 750, 450, 300, 280, 240, 200, 190]]
                    },

                    options: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                emailsSubscriptionChart: {
                    data: {
                        labels: [
                            "Ja",
                            "Fe",
                            "Ma",
                            "Ap",
                            "Mai",
                            "Ju",
                            "Jul",
                            "Au",
                            "Se",
                            "Oc",
                            "No",
                            "De"
                        ],
                        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
                    },
                    options: {
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 1000,
                        chartPadding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    },
                    responsiveOptions: [
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function(value) {
                                        return value[0];
                                    }
                                }
                            }
                        ]
                    ]
                }
            };
        }
    };
</script>
