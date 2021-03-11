<template>
    <div id="owidVaccination" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID-19 Testing Information</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides COVID-19 Testing Information.<br/>
                        All data are provided by OWID github.<br/>
                        <br/>
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
                            Select your country.<br/>
                        </span>
                    </md-toolbar>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <span class="md-body-2">Request Data Type</span>
                            <div>
                                <md-radio v-model="posRate" :value="false">new and cumulative count</md-radio>
                                <md-radio v-model="posRate" :value="true">Short-term Positive Rate</md-radio>
                            </div>

                            <md-autocomplete v-model.lazy="targetCountry"
                                             :md-options="Object.keys(this.countryList)" :md-open-on-focus="true">
                                <label>Country</label>
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



                <div v-if="dataRequested === true">
                    <md-progress-spinner
                            v-if="this.$store.state.owidVaccination.loading === true"
                            md-mode="indeterminate"
                    />

                    <md-table v-if="this.$store.state.owidVaccination.loading === false">
                        <md-table-row>
                            <md-table-head>key</md-table-head>
                            <md-table-head>value</md-table-head>
                        </md-table-row>

                        <md-table-row>
                            <md-table-cell>Entity</md-table-cell>
                            <md-table-cell>{{ regionInfo['Entity'] }}</md-table-cell>
                        </md-table-row>

                        <md-table-row>
                            <md-table-cell>Last Information update from <br/> "<a :href="regionInfo['Source URL']">{{ regionInfo['Source label'] }}</a>"</md-table-cell>
                            <md-table-cell>{{ regionInfo['Date'] }}</md-table-cell>
                        </md-table-row>

                        <md-table-row>
                            <md-table-cell>Short Description</md-table-cell>
                            <md-table-cell>{{ regionInfo['Short description'] }}</md-table-cell>
                        </md-table-row>
                    </md-table>


                    <Plotly
                            v-if="this.$store.state.owidVaccination.loading === false"
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
        name: 'owidVaccination',
        components: {
            Plotly,
            navBar
        },
        data () {
            return {
                menuVisible: false,
                targetCountry: null,
                posRate: false,

                dataRequested: false,

                processorStatus: '',
            }
        },
        beforeMount() {
            this.$store.dispatch('owidTesting/GET_REGION_LIST')
            this.processorStatus = this.$store.state.airflowApi.OWIDUpdateStatus

        },
        mounted () {

        },
        watch: {
            targetCountry: function (val) {
                //do something when the data changes.
                this.$store.commit('owidTesting/SET_TARGET_REGION_CODE', this.countryList[val])
                this.targetCountry = val

                if (val === '') {
                    this.$store.commit('owidTesting/SET_TARGET_REGION_CODE', '')
                    this.targetCountry = ''

                    this.dataRequested = false
                }
            },
            posRate: function (val) {
                this.$store.commit('owidTesting/SET_POS_RATE', val)
                this.posRate = val
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            countryList() {
                return this.$store.state.owidTesting.region_map
            },
            plotData () {
                return this.$store.state.owidTesting.plot.data
            },
            plotLayout () {
                return this.$store.state.owidTesting.plot.layout
            },
            regionInfo() {
                return this.$store.state.owidTesting.region_info
            },
            requestButtonDisabled () {
                return this.$store.state.owidTesting.target_region_code === '' || typeof this.$store.state.owidTesting.target_region_code === 'undefined'
            },
        },
        methods: {
            requestData: function() {
                this.dataRequested = true
                this.$store.dispatch('owidTesting/GET_REGION_INFO')
                if (this.posRate) {
                    this.$store.dispatch('owidTesting/GET_REGION_POS_DATA')
                } else {
                    this.$store.dispatch('owidTesting/GET_REGION_DATA')
                }

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

