<template>
    <div class="content">
        <covidInfos/>
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
            <statsCardCustom
                    top-icon="map"
                    card-color="purple"
                    title="mobility"
                    details="+245"
                    footer-icon="update"
                    footer-content="23/03/2021"
            />
            <statsCardCustom
                    top-icon="directions_run"
                    card-color="gray"
                    title="mobility"
                    details="+245"
                    footer-icon="update"
                    footer-content="23/03/2021"
            />
            <statsCardCustom
                    top-icon="directions_run"
                    card-color="blue"
                    title="mobility"
                    details="+245"
                    footer-icon="update"
                    footer-content="23/03/2021"
            />
            <statsCardCustom
                    top-icon="directions_run"
                    card-color="gray"
                    title="mobility"
                    details="+245"
                    footer-icon="update"
                    footer-content="23/03/2021"
            />
            <statsCardCustom
                    top-icon="directions_run"
                    card-color="blue"
                    title="mobility"
                    details="+245"
                    footer-icon="update"
                    footer-content="23/03/2021"
            />
        </div>

        <div class="md-layout">
            <graphCardCustom
                    card-color="purple"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="blue"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="red"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="30/03/2021"
                    graph-type="Bar"
                    :graph-data="emailsSubscriptionChart.data"
                    :graph-options="emailsSubscriptionChart.options"
            />
            <graphCardCustom
                    card-color="orange"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="green"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="gray"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="green"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />
            <graphCardCustom
                    card-color="gray"
                    title="Confirmed Cases"
                    details="Reported Confirmed Cases"
                    updated="29/03/2021"
                    graph-type="Line"
                    :graph-data="dailySalesChart.data"
                    :graph-options="dailySalesChart.options"
            />

        </div>
    </div>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";
    import covidInfos from "@/components/covidRegionDashboard/details/covidInfos";

    export default {
        components: {
            statsCardCustom,
            graphCardCustom,
            covidInfos
        },
        computed: {
            covid_info () {return this.$store.state.totalDashBoardData.covid.info},
            covid_preds () {return this.$store.state.totalDashBoardData.covid.preds},
            covid_pred_accuracy () {return this.$store.state.totalDashBoardData.covid.pred_accuracy},

            mobility () {return this.$store.state.totalDashBoardData.mobility},

            owid_health () {return this.$store.state.totalDashBoardData.owid.health},
            owid_mortality () {return this.$store.state.totalDashBoardData.owid.mortality},
            owid_testing_data () {return this.$store.state.totalDashBoardData.owid.testing.data},
            owid_testing_meta () {return this.$store.state.totalDashBoardData.owid.testing.meta},
            owid_vaccination_data () {return this.$store.state.totalDashBoardData.owid.vaccination.data},
            owid_vaccination_meta () {return this.$store.state.totalDashBoardData.owid.vaccination.meta},
        },
        data() {
            return {
                // covid_info: null,
                // covid_preds: null,
                // covid_pred_accuracy: null,
                // mobility: null,
                // owid_health: null,
                // owid_mortality: null,
                // owid_testing_data: null,
                // owid_testing_meta: null,
                // owid_vaccination_data: null,
                // owid_vaccination_meta: null,

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
                        high: Math.max(12, 17, 7, 17, 23, 18, 38, 27, 60) + 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
