<template>
    <div id="covidGraph" class="page-container" style="margin-bottom: 200px">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID - 19 Global Cumulative</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <div id="description" style="margin-bottom: 30px">
                    <span class="md-headline">
                        This page provides cumulative data.<br/>
                        All data are provided by CSSE-github (John's Hopkins University).<br/>
                        <br/>
                    </span>
                    <span class="md-subheading">
                        <md-toolbar class="md-accent">
                            <span class="md-title">Description of Graph</span>
                        </md-toolbar>

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

                    </span>
                </div>

                <md-toolbar class="md-secondary">
                    <h3 class="md-title">
                        Crawler status: {{ this.processorStatus }}
                    </h3>
                </md-toolbar>
                <br/>

                <div id="selection">
                    <md-toolbar class="md-accent" style="margin-bottom: 30px">
                        <span class="md-title">Search Section</span>
                    </md-toolbar>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-autocomplete v-model="continent" :md-options="continents" :md-open-on-focus="true" :md-dense="true">
                                <label>Continents</label>
                                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                </template>
                            </md-autocomplete>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <div v-if="continent === null">
                                <label>
                                    Select Continent first.
                                </label>
                            </div>
                            <div v-if="continent === 'Africa'">
                                <md-autocomplete v-model="country" :md-options="africa" :md-open-on-focus="true">
                                    <label>
                                        Countries from Africa
                                    </label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>
                                </md-autocomplete>
                            </div>
                            <div v-if="continent === 'America'">
                                <md-autocomplete v-model="country" :md-options="america" :md-open-on-focus="true">
                                    <label>
                                        Countries from America
                                    </label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>
                                </md-autocomplete>
                            </div>
                            <div v-if="continent === 'Asia'">
                                <md-autocomplete v-model="country" :md-options="asia" :md-open-on-focus="true">
                                    <label>
                                        Countries from Asia
                                    </label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>
                                </md-autocomplete>
                            </div>
                            <div v-if="continent === 'Europe'">
                                <md-autocomplete v-model="country" :md-options="europe" :md-open-on-focus="true">
                                    <label>
                                        Countries from Europe
                                    </label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                                    </template>
                                </md-autocomplete>
                            </div>
                            <div v-if="continent === 'Oceania'">
                                <md-autocomplete v-model="country" :md-options="oceania" :md-open-on-focus="true">
                                    <label>
                                        Countries from Oceania
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
        name: 'covidGraphGlobalCum',
        components: {
            Plotly,
            navBar
        },
        data () {
            return {
                menuVisible: false,
                test: null,
                continents: [
                    // "All",
                    "Africa",
                    "America",
                    "Asia",
                    "Europe",
                    "Oceania"
                ],

                africa: [
                    "All",
                    "Angola",
                    "Burundi",
                    "Benin",
                    "Burkina Faso",
                    "Botswana",
                    "Central African Republic",
                    "Cote d'",
                    "Cameroon",
                    "DR Congo",
                    "Congo Republic",
                    "Comoros",
                    "Cabo Verde",
                    "Djibouti",
                    "Algeria",
                    "Egypt",
                    "Eritrea",
                    "Western Sahara",
                    "Ethiopia",
                    "Gabon",
                    "Ghana",
                    "Guinea",
                    "Gambia",
                    "Guinea-Bissau",
                    "Equatorial Guinea",
                    "Kenya",
                    "Liberia",
                    "Libya",
                    "Lesotho",
                    "Morocco",
                    "Madagascar",
                    "Mali",
                    "Mozambique",
                    "Mauritania",
                    "Mauritius",
                    "Malawi",
                    "Namibia",
                    "Niger",
                    "Nigeria",
                    "Rwanda",
                    "Sudan",
                    "Senegal",
                    "Sierra Leone",
                    "Somalia",
                    "South Sudan",
                    "Sao Tome and Principe",
                    "Eswatini",
                    "Seychelles",
                    "Chad",
                    "Togo",
                    "Tunisia",
                    "Tanzania",
                    "Uganda",
                    "South Africa",
                    "Zambia",
                    "Zimbabwe",
                ],
                asia: [
                    "All",
                    "Afghanistan",
                    "Armenia",
                    "Azerbaijan",
                    "Bahrain",
                    "Bangladesh",
                    "Bhutan",
                    "Brunei Darussalam",
                    "Cambodia",
                    "China",
                    "Cyprus",
                    "Georgia",
                    "India",
                    "Indonesia",
                    "Iran",
                    "Iraq",
                    "Israel",
                    "Japan",
                    "Jordan",
                    "Kazakhstan",
                    "Kuwait",
                    "Kyrgyz Republic",
                    "Laos",
                    "Lebanon",
                    "Malaysia",
                    "Maldives",
                    "Mongolia",
                    "Myanmar",
                    "Nepal",
                    "Oman",
                    "Pakistan",
                    "Palestine",
                    "Philippines",
                    "Qatar",
                    "Saudi Arabia",
                    "Singapore",
                    "South Korea",
                    "Sri Lanka",
                    "Syria",
                    "Taiwan",
                    "Tajikistan",
                    "Thailand",
                    "Timor-Leste",
                    "Turkey",
                    "United Arab Emirates",
                    "Uzbekistan",
                    "Vietnam",
                    "Yemen",
                ],
                america: [
                    "All",
                    "Argentina",
                    "Antigua and Barbuda",
                    "Bahamas",
                    "Belize",
                    "Bolivia",
                    "Brazil",
                    "Barbados",
                    "Canada",
                    "Chile",
                    "Colombia",
                    "Costa Rica",
                    "Cuba",
                    "Dominica",
                    "Dominican Republic",
                    "Ecuador",
                    "Grenada",
                    "Guatemala",
                    "Guyana",
                    "Honduras",
                    "Haiti",
                    "Jamaica",
                    "St. Kitts and Nevis",
                    "St. Lucia",
                    "Mexico",
                    "Nicaragua",
                    "Panama",
                    "Peru",
                    "Paraguay",
                    "El Salvador",
                    "Suriname",
                    "Trinidad and Tobago",
                    "Uruguay",
                    "United States",
                    "St. Vincent and the Grenadines",
                    "Venezuela",
                ],
                europe: [
                    "All",
                    "Albania",
                    "Andorra",
                    "Austria",
                    "Belarus",
                    "Belgium",
                    "Bosnia and Herzegovina",
                    "Bulgaria",
                    "Croatia",
                    "Czech Republic",
                    "Denmark",
                    "Estonia",
                    "Finland",
                    "France",
                    "Germany",
                    "Greece",
                    "Hungary",
                    "Ireland",
                    "Iceland",
                    "Italy",
                    "Kosovo",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Latvia",
                    "Macedonia",
                    "Malta",
                    "Moldova",
                    "Monaco",
                    "Montenegro",
                    "Netherlands",
                    "Norway",
                    "Poland",
                    "Portugal",
                    "Romania",
                    "Russia",
                    "San Marino",
                    "Serbia",
                    "Slovakia",
                    "Slovenia",
                    "Spain",
                    "Sweden",
                    "Switzerland",
                    "Ukraine",
                    "United Kingdom",
                    "Vatican",
                ],
                oceania: [
                    "All",
                    "Australia",
                    "Fiji",
                    "New Zealand",
                    "Papua New Guinea",
                ],

                continent: null,
                country: null,

                dataRequested: false,
                processorStatus: '',

            }
        },
        mounted () {

        },
        watch: {
            continent: function (val) {
                //do something when the data changes.

                this.$store.commit('covidGraph/SET_CONTINENT_NAME', val)
                this.continent = val
                if (val === '') {
                    this.$store.commit('covidGraph/SET_COUNTRY_NAME', '')
                    this.country = ''

                    this.dataRequested = false
                    this.$store.state.covidGraph.plot.data = []
                    this.$store.state.covidGraph.plot.layout = []
                }

            },
            country: function (val) {
                //do something when the data changes.

                this.$store.commit('covidGraph/SET_COUNTRY_NAME', val)
                this.country = val

                if (val === '') {
                    this.dataRequested = false
                    this.$store.state.covidGraph.plot.data = []
                    this.$store.state.covidGraph.plot.layout = []
                }
            },
            menuVisible: function (val) {
                this.menuVisible = val

            }
        },
        computed: {
            plotData () {
                return this.$store.state.covidGraph.plot.data
            },
            plotLayout () {
                return this.$store.state.covidGraph.plot.layout
            },
            requestButtonDisabled () {
                return this.$store.state.covidGraph.target.continent === '' || this.$store.state.covidGraph.target.country === '';

            }
        },
        methods: {
            requestData: function() {
                this.dataRequested = true
                this.$store.dispatch('covidGraph/SEARCH_COVID_INFO_BY_REGION')
            },

        },
        beforeMount() {
            this.$store.dispatch('airflowApi/GET_DASHBOARD', {'area': 'global'})
            this.processorStatus = this.$store.state.airflowApi.lastUpdateStatus
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

