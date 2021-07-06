<template>
    <div id="dashboardView" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Dashboard</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content style="margin-right: 16px; margin-left: 16px; overflow: visible;">
                <dashboard-search-bar style="margin-bottom: 1vh"/>

                <md-toolbar class="md-accent" style="margin-bottom: 3%">
                    <h3 class="md-title">
                        <md-icon>new_releases</md-icon>
                        Notice <br/>
                    </h3>
                    <span class="md-subheading" style="margin-left: 7vw">
                        Other than COVID information, the information is provided based on <b>COUNTRY</b>, not sub-division region.<br/>
                        * If the <b>card does not expands</b>, the data is <b>not provided</b> on the selected region.
                    </span>
                </md-toolbar>

                <dashboard style=""/>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>

    import navBar from "@/components/navBar";
    import Dashboard from "@/components/covidRegionDashboard/details/dashboard";
    import DashboardSearchBar from "@/components/covidRegionDashboard/details/searchBar";
    export default {
        components: {
            DashboardSearchBar,
            Dashboard,
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

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>