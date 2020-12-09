<template>
    <div id="covidGraph" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID - 19 UK All type of Data</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides all kind of COVID data from UK.<br/>
                        All data are provided by UK Government.<br/>
                        <br/>
                    </span>

                    <span class="md-subheading">
                        <md-toolbar class="md-accent">
                            <span class="md-title">Description of Graph</span>
                        </md-toolbar>
                        <md-toolbar md-elevation="10">
                            <span class="md-heading">* [Caution]: "-1" from graph represents data missing.</span>
                        </md-toolbar>

                        <md-table>
                            <md-table-row>
                                <md-table-head>Graph Legends</md-table-head>
                                <md-table-head>Meaning</md-table-head>
                                <md-table-head>Detailed Meaning (by UK GOV)</md-table-head>
                            </md-table-row>

                            <md-table-row>
                                <md-table-cell>Conf Dly</md-table-cell>
                                <md-table-cell>Confirmed Daily</md-table-cell>
                                <md-table-cell>New cases by publish date</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>Conf Cuml</md-table-cell>
                                <md-table-cell>Confirmed Cumulative</md-table-cell>
                                <md-table-cell>Cumulative cases by publish date</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>CumlD/DD</md-table-cell>
                                <md-table-cell>Cumulative Deaths by Death Date (in 28days)</md-table-cell>
                                <md-table-cell>Cumulative deaths within 28 days of positive test</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>CumlD/DR</md-table-cell>
                                <md-table-cell>Rate of Cumulative Deaths by Death Date (in 28days)</md-table-cell>
                                <md-table-cell>Rate of cumulative deaths within 28 days of positive test per 100k resident population</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>CumlD/PD</md-table-cell>
                                <md-table-cell>Cumulative Deaths by Publish Date (in 28days)</md-table-cell>
                                <md-table-cell>Cumulative deaths within 28 days of positive test by death date</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>CumlD/PR</md-table-cell>
                                <md-table-cell>Rate of Cumulative Deaths by Publish Date (in 28days)</md-table-cell>
                                <md-table-cell>Rate of cumulative deaths within 28 days of positive test by death date per 100k resident population</md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>NewD/PD</md-table-cell>
                                <md-table-cell>New Deaths by Publish Date (in 28days)</md-table-cell>
                                <md-table-cell>Deaths within 28 days of positive test</md-table-cell>
                            </md-table-row>
                        </md-table>

                    </span>
                </div>

                <md-toolbar class="md-secondary">
                    <h3 class="md-title">
                        <md-icon>grading</md-icon>
                        Crawler status <br/>{{ this.processorStatus }}
                    </h3>
                </md-toolbar>
                <br/>

                <div id="selection">
                    <md-toolbar class="md-accent">
                        <span class="md-title">Search Section</span>
                    </md-toolbar>
                    <md-toolbar style="margin-bottom: 30px">
                        <span class="md-subheading">
                            If your city is well known UTLA will fit to you.<br/>
                            If your city is small and unknown LTLA may fit to you.
                        </span>
                    </md-toolbar>
                    <div class="md-layout md-gutter">

                        <div class="md-layout-item">
                            <span class="md-subhead">Local Authority Type</span><br/>
                            <md-radio v-model="localAuthorityType" value="utla">
                                Upper Tier Local Authority
                            </md-radio>
                            <md-radio v-model="localAuthorityType" value="ltla">
                                Lower Tier Local Authority
                            </md-radio>
                        </div>
                    </div>
                    <div class="md-layout md-gutter" style="margin-top: 25px">
                        <div class="md-layout-item">
                            <div v-if="localAuthorityType === null">
                                <label>
                                    Select Local Authority first.
                                </label>
                            </div>



                            <div v-if="localAuthorityType !== null">
                                <md-autocomplete v-model="areaName" :md-options="Object.values(areaNames)" :md-open-on-focus="true">
                                    <label>
                                        Area Names from {{ this.localAuthorityType.toUpperCase() }}
                                    </label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>
                                </md-autocomplete>
                            </div>
                        </div>

                        <md-button
                                :disabled="requestButtonDisabled"
                                class="md-primary md-raised"
                                @click="requestData">
                            Request Graph
                        </md-button>
                    </div>



                </div>

                <div v-if="dataRequested === true">
                    <md-progress-spinner
                            v-if="this.$store.state.covidGraph.loading === true"
                            md-mode="indeterminate"
                    />

                    <Plotly
                            v-if="this.$store.state.covidGraph.loading === false"
                            :data="plotData"
                            :layout="plotLayout"
                            :display-mode-bar="false"
                            :isAsync="true"
                    />
                </div>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import { Plotly } from 'vue-plotly'
    import navBar from "@/components/navBar";

    export default {
        name: 'covidGraphGlobalNew',
        components: {
            Plotly,
            navBar
        },
        data () {
            return {
                menuVisible: false,

                localAuthorityType: null,
                areaName: null,
                areaCode: null,

                dataRequested: false,

                processorStatus: '',
            }
        },
        beforeMount() {
            this.$store.dispatch('airflowApi/GET_DASHBOARD')
            this.processorStatus = this.$store.state.airflowApi.UKUpdateStatus
        },
        mounted () {

        },
        watch: {
            localAuthorityType: function (val) {
                //do something when the data changes.

                this.$store.commit('covidUKGraph/SET_LOCAL_AUTHORITY_TYPE', val)
                this.localAuthorityType = val
                this.$store.dispatch('covidUKGraph/RECEIVE_AREA_NAMES')

                if (val === '') {
                    this.$store.commit('covidUKGraph/SET_AREA_NAME', '')
                    this.areaName = ''

                    this.$store.commit('covidUKGraph/SET_AREA_CODE', '')
                    this.areaName = ''

                    this.dataRequested = false
                    this.$store.state.covidUKGraph.plot.data = []
                    this.$store.state.covidUKGraph.plot.layout = []
                }
            },
            areaName: function (val) {
                //do something when the data changes.

                this.$store.commit('covidUKGraph/SET_AREA_NAME', val)
                this.areaName = val

                this.$store.commit('covidUKGraph/SET_AREA_CODE', this.getKeyByValue(this.areaNames, val))
                this.areaName = val

                if (val === '') {
                    this.dataRequested = false
                    this.$store.state.covidUKGraph.plot.data = []
                    this.$store.state.covidUKGraph.plot.layout = []
                }
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            plotData () {
                return this.$store.state.covidUKGraph.plot.data
            },
            plotLayout () {
                return this.$store.state.covidUKGraph.plot.layout
            },
            requestButtonDisabled () {
                return this.$store.state.covidUKGraph.target.localAuthority === '' || this.$store.state.covidUKGraph.target.areaCode === '';
            },
            areaNames () {
                return this.$store.state.covidUKGraph.baseAreas
            }
        },
        methods: {
            getKeyByValue: function(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            },
            requestData: function() {
                this.dataRequested = true
                this.$store.dispatch('covidUKGraph/SEARCH_COVID_INFO_BY_REGION')
            },

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

