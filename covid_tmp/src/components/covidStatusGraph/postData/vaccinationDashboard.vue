<template>
    <div id="owidVaccination" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">Vaccination Information</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides Vaccination Information.<br/>
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
                            Fully dosed means number of people vaccinated their 2nd dose.<br/>
                        </span>
                    </md-toolbar>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <span class="md-body-2">Vaccination Status</span>
                            <div>
                                <md-radio v-model="fullyDosed" :value="false">vaccination plan started</md-radio>
                                <md-radio v-model="fullyDosed" :value="true">vaccination plan finished</md-radio>
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
                            <md-table-cell>Last update from <br/> "{{ regionInfo['source_name'] }}"</md-table-cell>
                            <md-table-cell>{{ regionInfo['last_observation_date'] }}</md-table-cell>
                        </md-table-row>

                        <md-table-row>
                            <md-table-cell>Using Vaccines</md-table-cell>
                            <md-table-cell>{{ regionInfo['vaccines'] }}</md-table-cell>
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
                fullyDosed: false,
                targetDataType: 'new',

                dataRequested: false,

                processorStatus: '',
            }
        },
        beforeMount() {
            this.$store.dispatch('owidVaccination/GET_REGION_LIST')
            this.processorStatus = this.$store.state.airflowApi.OWIDUpdateStatus
        },
        mounted () {

        },
        watch: {
            targetCountry: function (val) {
                //do something when the data changes.
                this.$store.commit('owidVaccination/SET_TARGET_REGION_CODE', this.countryList[val])
                this.targetCountry = val

                if (val === '') {
                    this.$store.commit('owidVaccination/SET_TARGET_REGION_CODE', '')
                    this.targetCountry = ''

                    this.dataRequested = false
                }
            },
            fullyDosed: function (val) {
                this.$store.commit('owidVaccination/SET_FULLY_DOSED', val)
                this.fullyDosed = val
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            countryList() {
                return this.$store.state.owidVaccination.region_map
            },
            plotData () {
                return this.$store.state.owidVaccination.plot.data
            },
            plotLayout () {
                return this.$store.state.owidVaccination.plot.layout
            },
            regionInfo() {
                return this.$store.state.owidVaccination.region_info
            },
            requestButtonDisabled () {
                return this.$store.state.owidVaccination.target_region_code === '' || typeof this.$store.state.owidVaccination.target_region_code === 'undefined'
            },
        },
        methods: {
            requestData: function() {
                this.dataRequested = true
                this.$store.dispatch('owidVaccination/GET_REGION_INFO')
                this.$store.dispatch('owidVaccination/GET_REGION_DATA')
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

