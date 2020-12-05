<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Analysis Home</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis Home page.<br/>
                </span>
                <br/>
                <md-divider/>
                <br/>
                <h2>Pages connecting to ...</h2>
                <br/>
                <p>South Korea Information connects to external page calls 'corona-live' which is well built webpage that shows live status.</p>
                <md-tabs md-sync-route class="md-primary">
                    <md-tab id="tab-pages" md-label="Global Information" to="/global"></md-tab>
                    <md-tab id="tab-posts" md-label="UK Information" to="/uk"></md-tab>
                    <md-tab id="tab-externalKorea" md-label="South Korea Information" href="https://corona-live.com/"></md-tab>
                </md-tabs>
                <br/>
                <md-divider/>
                <br/>
                <md-subheader>
                    All crawlers and processors run usually between 3 ~ 12AM (GMT, UK) / 12 ~ 9PM (KST, Korea).
                </md-subheader>
                <md-progress-spinner
                        v-if="this.$store.state.airflowApi.loading === true"
                        md-mode="indeterminate"
                />
                <md-table v-if="this.$store.state.airflowApi.loading === false">
                    <md-table-toolbar>
                        <h1 class="md-title">
                            <md-icon>grading</md-icon>
                            Crawler/Processor Status
                        </h1>
                    </md-table-toolbar>

                    <md-table-row>
                        <md-table-head>Target Region</md-table-head>
                        <md-table-head>Status</md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell>Global</md-table-cell>
                        <md-table-cell>{{ this.globAirflow }}</md-table-cell>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell>UK</md-table-cell>
                        <md-table-cell>{{ this.ukAirflow }}</md-table-cell>
                    </md-table-row>
                </md-table>

                <br/>
                <md-divider/>
                <br/>

                <span class="md-subheading">
                    This page is version 2 built with Vue-js.<br/>
                    To enhance User eXperience, the graph will initially show recent 28 days data.<br/>
                    To widen the time range, double click anywhere of the graph you want to make it widen.<br/>
                </span>
                <br/>
                <span class="md-subheading">
                    Please have a look on <b><u>left-side drawer</u></b>. <br/>
                    You can open it my clicking <b><u>left top</u></b>, three lines icon.<br/>
                </span>
                <br/>
                <md-divider/>
                <br/>
                <span class="md-title">
                    <b>Update Lists</b>
                </span><br/><br/>

                <span class="md-subheading"><b>Front End</b></span><br/>

                <b>* Last Source Code Update: 2020-12-04</b><br/>
                <br/>
                <span class="md-body-1">
                    * Update contents (12-04):<br/>
                    Now user can see whether the crawler or processor is running or finished for today's data.<br/>
                    <br/>
                    * Update contents (12-01):<br/>
                    Now each page shows when the data have been updated and the current status of data processing.<br/>
                    <br/>
                    * Update contents (11-18):<br/>
                    Now dashboard is available. Dashboard contains today's COVID cases.<br/>
                    Furthermore, it provides prediction of confirmed cases. Predicted values for tomorrow and 7 days later will be provided.<br/>
                    The dashboard is produced both for Global info and UK info.
                </span><br/><br/>
                <md-divider/>

                <span class="md-subheading"><b>Back End</b></span><br/>
                <b>* Last Source Code Update: 2020-11-21</b><br/>
                <span class="md-body-1">
                    * Update contents (11-21):<br/>
                    BUG FIX: There was an issue that dashboard data collector not rounding accuracy on 2nd decimal point.<br/>
                    By filling null values to 0 now the table will round on proper decimal point.<br/>
                    <br/>
                    * Update contents (11-17):<br/>
                    Accuracy was calculated with simple <a href="https://en.wikipedia.org/wiki/Relative_change_and_difference">Percentage Error</a> but as it shows huge error rate when actual value is small even the difference is small.<br/>
                    Therefore, accuracy of ARIMA model is now calculated by <a href="https://en.wikipedia.org/wiki/Symmetric_mean_absolute_percentage_error">sMAPE(symmetric Mean Absolute Percentage Error)</a><br/>
                    Both Post-processor in airflow and back-end with flask are updated.<br/>
                    <br/>
                    <b>As post-processor requires at least 7 days predicted data, sometime the accuracy may fluctuate.</b><br/>
                    <b>Furthermore, ARIMA model is not sensitive with external parameters. Therefore, country or region with demonstration or elections that can cause increase of human activity may lead to inaccuracy of ARIMA model.</b><br/>
                    <b>This issue will be resolved in future by collecting news information and other region related data.</b><br/>
                    <br/>
                    <br/>
                    * Update contents (11-07):<br/>
                    Now post-processor is updated. The post-processor predicts confirmed cases for both UK and Global for 7 days.<br/>
                    In addition, the accuracy of prediction model (ARIMA model) for the data will be provided.<br/>

                </span><br/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";

    export default {
        name: 'Home',
        components:{
            navBar
        },
        data () {
            return {
                menuVisible: false,
                ukAirflow: '',
                globAirflow: ''
            }
        },
        computed: {

        },
        beforeMount() {
            this.$store.dispatch('airflowApi/GET_DASHBOARD')
            this.ukAirflow = this.$store.state.airflowApi.UKUpdateStatus
            this.globAirflow = this.$store.state.airflowApi.globalUpdateStatus
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