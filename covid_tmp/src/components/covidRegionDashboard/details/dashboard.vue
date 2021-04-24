<template>
    <div class="content">
        <div class="md-layout">
            <md-dialog-alert
                    :md-active.sync="second"
                    md-title="Post created!"
                    md-content="Your post <strong>Material Design is awesome</strong> has been created." />
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

        </div>
    </div>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";

    export default {
        components: {
            statsCardCustom,
            graphCardCustom
        },
        data() {
            return {
                second: false,
                dailySalesChart: {
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        series: [[12, 17, 7, 17, 23, 18, 38]]
                    },
                    options: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
