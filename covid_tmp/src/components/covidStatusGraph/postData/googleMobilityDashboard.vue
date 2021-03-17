<template>
    <div id="googleMobilityDashboard" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">Mobility Information</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides People's Mobility Information by country.<br/>
                        All data are provided by Google Mobility report.<br/>
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
                            <div>
                                <span class="md-subheading">
                                    Plot Layout.<br/>
                                </span>
                                <md-radio v-model="isMovingAverage" :value="0">Daily</md-radio>
                                <md-radio v-model="isMovingAverage" :value="7">7days Moving Average</md-radio>
                                <md-radio v-model="isMovingAverage" :value="14">14days Moving Average</md-radio>
                                <md-radio v-model="isMovingAverage" :value="28">28days Moving Average</md-radio>
                            </div>
                            <md-autocomplete v-model.lazy="targetCountry"
                                             :md-options="Object.keys(countryList)" :md-open-on-focus="true">
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
                            v-if="this.$store.state.googleMobility.loading === true"
                            md-mode="indeterminate"
                    />

                    <Plotly
                            v-if="this.$store.state.googleMobility.loading === false"
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
        name: 'googleMobilityDashboard',
        components: {
            Plotly,
            navBar
        },
        data () {
            return {
                menuVisible: false,
                targetCountry: null,
                country: '',
                isMovingAverage: 0,

                dataRequested: false,


                processorStatus: '',
            }
        },
        beforeMount() {
            this.$store.dispatch('googleMobility/GET_REGION_LIST')
            this.processorStatus = this.$store.state.airflowApi.G_mob_UpdateStatus
        },
        mounted () {

        },
        watch: {
            targetCountry: function (val) {
                //do something when the data changes.
                this.$store.commit('googleMobility/SET_TARGET_REGION_TABLE_CODE', this.countryList[val])
                this.targetCountry = val

                if (val === '') {
                    this.$store.commit('googleMobility/SET_TARGET_REGION_TABLE_CODE', '')
                    this.targetCountry = ''

                    this.dataRequested = false
                }
            },
            isMovingAverage: function (val) {
                //do something when the data changes.
                this.$store.commit('googleMobility/SET_MA', val)
                this.isMovingAverage = val
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            countryList() {
                return this.$store.state.googleMobility.region_map
            },
            plotData () {
                return this.$store.state.googleMobility.plot.data
            },
            plotLayout () {
                return this.$store.state.googleMobility.plot.layout
            },
            requestButtonDisabled () {
                return this.$store.state.googleMobility.target_region_table_code === ''
                    || typeof this.$store.state.googleMobility.target_region_table_code === 'undefined'
            },
        },
        methods: {
            requestData: function() {
                this.dataRequested = true
                this.$store.dispatch('googleMobility/GET_REGION_DATA')
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


