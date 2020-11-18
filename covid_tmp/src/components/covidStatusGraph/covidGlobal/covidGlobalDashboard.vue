<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Global Dashboard</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis Global dashboard.<br/>
                </span>
                <h2>Pages connecting to ...</h2>
                <br/>
                <md-divider/>
                <br/>

                <md-tabs md-sync-route class="md-accent">
                    <md-tab id="tab-home" md-label="Global New" to="/global/new"></md-tab>
                    <md-tab id="tab-pages" md-label="Global Cumulative" to="/global/cumulative"></md-tab>
                </md-tabs>
                <br/>
                <md-divider/>
                <br/>

                <span class="md-subheading">
                    Color Index<br/>
                </span>
                <md-table>
                    <md-table-row>
                        <md-table-head>Graph Legends</md-table-head>
                        <md-table-head>Meaning</md-table-head>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Confirmed</md-table-cell>
                        <md-table-cell>number of people being confirmed</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Active</md-table-cell>
                        <md-table-cell>number of people being hospitalised due to COVID-19</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Deaths</md-table-cell>
                        <md-table-cell>number of people died</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Recovered</md-table-cell>
                        <md-table-cell>number of people recovered</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell>Removed</md-table-cell>
                        <md-table-cell>number of people recovered + died</md-table-cell>
                    </md-table-row>
                </md-table>

                <continent_table/>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";
    import continent_table
        from "@/components/covidStatusGraph/covidGlobal/dashBoard_components/covid_dashboard_table";


    export default {
        name: 'globalDashBoard',
        components:{
            navBar,

            continent_table
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