<template>
    <div class="dashboardSearchBar">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <span class="md-title">
                <md-icon>travel_explore</md-icon>
                Region Search
            </span>
        <div style="margin-bottom: 1vh"/>

        <md-card class="md-primary md-layout" style="margin-left: 0.5vw; margin-right: 0.5vw">
            <div class="md-layout-item md-xsmall-size-80 md-medium-size-25 md-size-25" style="margin-left: 5vw">
                <md-autocomplete
                        v-model="continent"
                        :md-options="continents"
                        md-layout="floating"
                >
                    <label>Continent</label>
                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                    </template>

                    <template slot="md-autocomplete-empty" slot-scope="{ term }">{{ term }} not found.</template>
                </md-autocomplete>
            </div>

            <div class="md-layout-item md-xsmall-size-80 md-medium-size-25 md-size-25" style="margin-left: 5vw"
                 v-if="(isContinentSelected(this.continents, this.continent))"
            >
                <md-autocomplete
                        v-if="isContinentSelected(this.continents, this.continent)"
                        v-model="country"
                        md-layout="floating"
                        :md-options="countries.map(x=>({
                            'code':x.code,
                            'name':x.name,
                            'toLowerCase':()=>x.name.toLowerCase(),
                            'toString':()=>x.name
                          }))"
                >
                    <label>Country</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                        <span class="icon">
                            <country-flag :country='item.code'/>
                        </span>
                        <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                    </template>

                    <template slot="md-autocomplete-empty" slot-scope="{ term }">{{ term }} not found.</template>
                </md-autocomplete>
            </div>
            <div class="md-layout-item md-xsmall-size-80 md-medium-size-25 md-size-25" style="margin-left: 5vw"
                 v-if="isUKSelected(this.country, this.sub_divisions)"
            >
                <md-autocomplete
                        v-if="isUKSelected(this.country, this.sub_divisions)"
                        v-model="ukSubdivisionRegion"
                        :md-options="sub_divisions.map(x=>({
                            'code':x.code,
                            'name':x.name,
                            'toLowerCase':()=>x.name.toLowerCase(),
                            'toString':()=>x.name
                          }))"
                        md-layout="floating">
                    <label>Sub-division Region</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                        <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                    </template>

                    <template slot="md-autocomplete-empty" slot-scope="{ term }">
                        No sub-division matching \n"{{ term }}" were found.
                    </template>
                </md-autocomplete>
            </div>
            <div class="md-toolbar-section-end md-size-5" style="margin-right: 1vw">
                <md-button class="md-fab md-dense" @click="searchRequestedLocation" :disabled="!this.isSearchBarFilled">
                    <md-icon>search</md-icon>
                </md-button>
                <md-button class="md-fab md-dense" @click="currentLocationClicked">
                    <md-tooltip md-direction="top"><span class="md-subheading">Search Current Location</span></md-tooltip>
                    <md-icon>my_location</md-icon>
                </md-button>
            </div>
        </md-card>
    </div>
</template>

<script>
    export default {
        name: 'dashboardSearchBar',
        beforeMount() {
            this.$store.dispatch('totalDashBoard/REQUEST_CONTINENTS')
            this.$store.dispatch('totalDashBoard/REQUEST_UK_REGIONS')
            this.continent = null
            this.country = null
            this.ukSubdivisionRegion = null
            this.searchCurrentLocation()
        },
        computed: {
            continents () {
                return this.$store.state.totalDashBoard.continents
            },
            countries () {
                return this.$store.state.totalDashBoard.countries
            },
            sub_divisions () {
                return this.$store.state.totalDashBoard.sub_divisions
            },
            isSearchBarFilled () {
                if (this.country !== null) {
                    if (this.isIncluded(this.country.code, this.countries)){
                        if (this.country.code === 'GBR'){
                            if (this.ukSubdivisionRegion !== null) {
                                return this.isIncluded(this.ukSubdivisionRegion.code, this.sub_divisions)
                            } else {
                                return false
                            }
                        } else {
                            return true
                        }

                    }
                }
                return false
            }
        },
        watch: {
            continent (val) {
                if (val === '' || val === null) {
                    this.$store.commit('totalDashBoard/SET_CONTINENT', null)
                    this.continent = null
                    this.$store.commit('totalDashBoard/SET_COUNTRY', null)
                    this.country = null
                    this.$store.commit('totalDashBoard/SET_SUBDIVISION', {})
                    this.ukSubdivisionRegion = null
                    this.sub_divisions = null
                    this.$store.commit('totalDashBoardData/SET_CLEAR')
                } else {
                    if (this.isContinentExist(val, this.continents)) {
                        this.$store.commit('totalDashBoard/SET_CONTINENT', val)
                        this.$store.dispatch('totalDashBoard/REQUEST_COUNTRIES', val)
                    }
                    this.continent = val
                }
            },
            country (val) {
                if (val === '' || val === null) {
                    this.$store.commit('totalDashBoard/SET_COUNTRY', null)
                    this.country = null
                    this.$store.commit('totalDashBoard/SET_SUBDIVISION', {})
                    this.ukSubdivisionRegion = null
                    this.$store.commit('totalDashBoardData/SET_CLEAR')
                } else {
                    if (this.isIncluded(val.code, this.countries)) {
                        this.$store.commit('totalDashBoard/SET_COUNTRY', val)
                        this.country = this.$store.state.totalDashBoard.country
                        if (this.country.code === 'GBR') {
                            this.$store.dispatch('totalDashBoard/REQUEST_UK_REGIONS')
                        }
                    } else {
                        this.$store.commit('totalDashBoardData/SET_CLEAR')
                    }

                }
            },
            ukSubdivisionRegion (val) {
                if (val === '' || val === null) {
                    this.$store.commit('totalDashBoard/SET_SUBDIVISION', {})
                    this.ukSubdivisionRegion = null
                    this.$store.commit('totalDashBoardData/SET_CLEAR')
                } else {
                    if (this.isIncluded(val.code, this.sub_divisions)) {
                        this.$store.commit('totalDashBoard/SET_SUBDIVISION', val)
                        this.ukSubdivisionRegion = this.$store.state.totalDashBoard.sub_division
                    } else {
                        this.$store.commit('totalDashBoardData/SET_CLEAR')
                    }
                }
            }
        },
        methods: {
            isIncluded(code, ary) {
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i].code === code) return true
                }
                return false
            },
            isContinentExist(code, ary) {
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] === code) return true
                }
                return false
            },
            isContinentSelected(continents, continent) {
                if (continent === undefined) {
                    return false
                } else if (continent === null) {
                    return false
                } else {
                    return continents.includes(continent)
                }
            },
            isUKSelected(country, subDivisions) {
                if (country === undefined) return false
                else if (country === null) return false
                else {
                    if (subDivisions === undefined) return false
                    else if (subDivisions === null) return false
                    else {
                        if (country.code === 'GBR' && subDivisions.length !== 0) return true
                    }
                }
            },
            searchCurrentLocation() {
                let store = this.$store

                if ("geolocation" in navigator) { // check if geolocation is supported
                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            store.commit(
                                'totalDashBoard/SET_LONGLAT',
                                {lat: position.coords.latitude, long: position.coords.longitude})
                            store.dispatch('totalDashBoard/REQUEST_REGION_FROM_LOCATION')
                        },
                        function (error_message) {
                            console.error('An error has occured while retrieving location', error_message)
                        }
                    )
                }
            },
            currentLocationClicked() {
                this.continent = this.$store.state.totalDashBoard.location.continent
                this.country = this.$store.state.totalDashBoard.location.country
                this.ukSubdivisionRegion = this.$store.state.totalDashBoard.location.sub_division

                this.$store.commit('totalDashBoard/SET_CONTINENT', this.continent)
                this.$store.commit('totalDashBoard/SET_COUNTRY', this.country)
                this.$store.commit('totalDashBoard/SET_SUBDIVISION', this.ukSubdivisionRegion)

            },
            searchRequestedLocation() {
                console.log(this.$store.state.totalDashBoard)
                console.log(this.$store.state.totalDashBoardData.covid.info)
                this.$store.dispatch('totalDashBoardData/REQUEST_COVID_INFO')
                this.$store.dispatch('totalDashBoardData/REQUEST_COVID_PREDS')
                this.$store.dispatch('totalDashBoardData/REQUEST_COVID_ACCURACY')
                this.$store.dispatch('totalDashBoardData/REQUEST_COVID_LSTM_PREDS')
                this.$store.dispatch('totalDashBoardData/REQUEST_COVID_LSTM_ACCURACY')

                this.$store.dispatch('totalDashBoardData/REQUEST_GOOGLE_MOBILITY')

                this.$store.dispatch('totalDashBoardData/REQUEST_OWID_HEALTH')
                this.$store.dispatch('totalDashBoardData/REQUEST_OWID_MORTALITY')
                this.$store.dispatch('totalDashBoardData/REQUEST_OWID_TESTING')
                this.$store.dispatch('totalDashBoardData/REQUEST_OWID_VACCINATION')
            }
        },
        data: () => ({
            continent: null,
            country: null,
            ukSubdivisionRegion: null,
            location: {
                continent: '',
                country: {},
                ukSubdivisionRegion: {},
            }

        })
    }
</script>

<style lang="scss" scoped>
    .icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 20px;
        /*border: 1px solid rgba(#000, .12);*/
    }

    .md-helper-text {
        display: flex;
        align-items: center;

        .color {
            width: 12px;
            height: 12px;
            margin-left: 4px;
        }
    }
</style>