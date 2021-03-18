<template>
    <div id="mortalityDashboard" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID-19 Mortality Information</span>

                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides COVID-19 Mortality and usual Mortality Information.<br/>
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
                            When you double click the graph area, the time range will be reset to all dates of 365days.<br/>
                            Select your country.<br/>
                            To make graph smooth and resolve weekly periodic pattern, 7days moving average is applied.
<!--                            p_score simply means the mortality difference between usual years and this years.<br/>-->
                        </span>
                    </md-toolbar>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <span class="md-body-2">Request Data Type</span>

                            <div>
                                <md-radio v-model="targetData" :value="'p_scores'">P Score (Mortality rate difference) of 4 different age ranges</md-radio>
                                <md-radio v-model="targetData" :value="'population'">Mortality history of all age average</md-radio>
                            </div>


                            <div v-if="targetData === 'p_scores'">
                                <span class="md-body-2">Age Range</span>
                                <div id="ageRange">
                                    <md-checkbox v-model="average">All ages (average)</md-checkbox>
                                    <md-checkbox v-model="ageRange" :value="15">15 ~ 64</md-checkbox>
                                    <md-checkbox v-model="ageRange" :value="65">65 ~ 74</md-checkbox>
                                    <md-checkbox v-model="ageRange" :value="75">75 ~ 84</md-checkbox>
                                    <md-checkbox v-model="ageRange" :value="85">Over 85</md-checkbox>
                                </div>
                            </div>
                            <div v-else-if="targetData === 'population'">
                                <span class="md-body-2">Year Range</span>
                                <div id="yearRange">
                                    <md-checkbox v-model="average">Average of 2015~2019</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2010">2010</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2011">2011</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2012">2012</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2013">2013</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2014">2014</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2015">2015</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2016">2016</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2017">2017</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2018">2018</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2019">2019</md-checkbox>
                                    <md-checkbox v-model="yearRange" :value="2020">2020</md-checkbox>
                                </div>

                            </div>

                            <md-autocomplete v-model.lazy="targetCountry"
                                             :md-options="this.countryList" :md-open-on-focus="true">
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
        name: 'mortalityDashboard',
        components: {
            Plotly,
            navBar,
        },
        data () {
            return {
                menuVisible: false,
                targetCountry: null,
                targetData: 'p_scores',

                dataRequested: false,

                processorStatus: '',
                ageRange: [],
                yearRange: [],
                average: false,
            }
        },
        beforeMount() {
            this.$store.dispatch('owidMortality/GET_REGION_LIST')
            this.processorStatus = this.$store.state.airflowApi.OWIDUpdateStatus

        },
        mounted () {

        },
        watch: {
            targetCountry: function (val) {
                //do something when the data changes.
                this.$store.commit('owidMortality/SET_TARGET_REGION_CODE', val)
                this.targetCountry = val

            },
            targetData: function (val) {
                this.$store.commit('owidMortality/SET_TARGET_DATA_TYPE', val)
                this.targetData = val
                this.average = false
                if (val === 'p_scores') {
                    this.yearRange = []
                } else if (val === 'population') {
                    this.ageRange = []
                }
            },
            average: function (val) {
                this.$store.commit('owidMortality/SET_AVERAGE', val)
                this.average = val
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            countryList() {
                return this.$store.state.owidMortality.region_list
            },
            plotData () {
                return this.$store.state.owidMortality.plot.data
            },
            plotLayout () {
                return this.$store.state.owidMortality.plot.layout
            },
            requestButtonDisabled () {
                return this.$store.state.owidMortality.target_region_code.length === 0 ||
                        (
                            (this.targetData === 'p_scores' && this.ageRange.length < 2) ||
                            (this.targetData === 'population' && this.yearRange.length < 2)
                        )

            },
        },
        methods: {
            requestData: function() {
                this.dataRequested = true

                if (this.targetData === 'p_scores') {
                    this.$store.commit('owidMortality/SET_RANGE_START', Math.min.apply(null, this.ageRange))
                    this.$store.commit('owidMortality/SET_RANGE_END', Math.max.apply(null, this.ageRange))
                } else if (this.targetData === 'population') {
                    this.$store.commit('owidMortality/SET_RANGE_START', Math.min.apply(null, this.yearRange))
                    this.$store.commit('owidMortality/SET_RANGE_END', Math.max.apply(null, this.yearRange))
                }

                this.$store.dispatch('owidMortality/GET_REGION_DATA')

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


