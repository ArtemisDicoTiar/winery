<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 UK Dashboard</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis UK dashboard.<br/>
                </span>

                <h2>Pages connecting to ...</h2>
                <br/>
                <md-divider/>
                <br/>

                <md-tabs md-sync-route class="md-primary">
                    <md-tab id="tab-posts" md-label="UK Graph" to="/uk/graph"></md-tab>
                </md-tabs>
                <br/>
                <md-divider/>
                <br/>

                <span class="md-subheading">
                    Color Index<br/>
                </span>
                <md-table>
                    <md-table-row>
                        <md-table-head>Table Color Index</md-table-head>
                        <md-table-head>Meaning</md-table-head>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Red</md-table-cell>
                        <md-table-cell>prediction increment in today</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Orange</md-table-cell>
                        <md-table-cell>prediction increment in tomorrow</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Yellow</md-table-cell>
                        <md-table-cell>prediction increment in next week</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Green</md-table-cell>
                        <md-table-cell>prediction keep DECREASING</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Light Green (Lime)</md-table-cell>
                        <md-table-cell>Prediction shows decrease in some date.</md-table-cell>
                    </md-table-row>
                </md-table>

                <md-card class="md-accent" md-with-hover>

                    <md-card-header>
                        <div class="md-title">* ISSUE *</div>
                        <div class="md-subhead">will resolve soon</div>
                    </md-card-header>

                    <md-card-content>
                        <b>
                            UK covid case prediction run only on LTLA regions.<br/>
                            If the region only in UTLA, they will have blank for prediction.<br/>
                            This issue will be resolved soon. <br/>
                            Therefore, the regions only in UTLA will have -1% for prediction accuracy to show issue clearly.<br/>
                            Sorry for this issue.<br/>
                        </b>
                    </md-card-content>

                </md-card>
                <br/>

                <covid_dashboard_uk_table/>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";
    import covid_dashboard_uk_table
        from "@/components/covidStatusGraph/covidUK/dashBoard_components/covid_dashboard_uk_table";

    export default {
        name: 'globalDashBoard',
        components:{
            navBar,
            covid_dashboard_uk_table
        },
        data () {
            return {
                menuVisible: false
            }
        }
    }

</script>

<style lang="scss" scoped>
    .md-app {
        min-height: 700px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>