<template>
    <div id="uk_dashboard" class="page-container">
        <div v-if="dataRequested === true">
            <md-progress-spinner
                    v-if="this.$store.state.covidDashBoard.loading === true"
                    md-mode="indeterminate"
            />
            <md-card v-if="this.$store.state.covidDashBoard.loading === false">
                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            UK DashBoard
                        </v-card-title>
                        <v-card-subtitle>
                            <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                            ></v-text-field>
                            <br/>

                            <span class="md-body-2">select target region type</span>
                            <v-spacer></v-spacer>
                            <v-radio-group
                                    v-model="region"
                                    row
                            >
                                <v-radio
                                        label="UTLA"
                                        value="utla"
                                ></v-radio>
                                <v-radio
                                        label="LTLA"
                                        value="ltla"
                                ></v-radio>
                            </v-radio-group>
                        </v-card-subtitle>


                        <v-data-table
                                :headers="headers"
                                :items="tableData"
                                :search="search"
                                :loading="this.$store.state.covidDashBoard.loading"
                                loading-text="LOADING..."
                                :items-per-page="10"
                                class="elevation-1 primary"
                                sort-by="confirmed"
                                :sort-desc="true"
                                :footer-props=footerProps
                        >
                            <template v-slot:item.area="{ item }">
                                <v-chip
                                        :color="getDangerLevel(item)"
                                >
                                    {{ item.area }}
                                </v-chip>
                            </template>
                            <template v-slot:item.yesterday_pred_accuracy="{ item }">
                                <v-chip
                                        :color="getAccuracy(item.yesterday_pred_accuracy)"
                                >
                                    {{ item.yesterday_pred_accuracy }} %
                                </v-chip>
                            </template>
                            <template v-slot:item.last_week_pred_accuracy="{ item }">
                                <v-chip
                                        :color="getAccuracy(item.last_week_pred_accuracy)"
                                >
                                    {{ item.last_week_pred_accuracy }} %
                                </v-chip>
                            </template>

                        </v-data-table>
                    </v-container>
                </v-card>
            </md-card>
        </div>


    </div>
</template>

<script>

    export default {
        name: 'uk_dashboard',
        beforeMount() {
            this.dataRequested = false
            this.$store.commit('covidDashBoard/SET_AREA_TYPE', 'uk')
            this.$store.commit('covidDashBoard/SET_TARGET', 'utla')
            this.region = 'utla'
            this.$store.dispatch('covidDashBoard/GET_DASHBOARD')
            this.dataRequested = true
            this.tableData = this.$store.state.covidDashBoard.data
        },
        computed: {
            tableData () {
                return this.$store.state.covidDashBoard.data
            },
        },
        methods: {
            getAccuracy (accuracy) {
                if (accuracy <= 30) return '#FF5733'
                else if (accuracy <= 60) return '#FF7F50'
                else return '#228B22'
            },
            getDangerLevel (data) {
                let yesterday = data.confirmed
                let today = data.pred_today
                let tomorrow = data.pred_tomorrow
                let next_week = data.pred_nextweek
                let accuracy = Math.max(data.yesterday_pred_accuracy, data.last_week_pred_accuracy)

                if (accuracy >= 70) {
                    if (yesterday <= today) return '#ff0000'
                    else if (yesterday <= tomorrow) return '#ffc100'
                    else if (yesterday <= next_week) return '#d6ff00'
                    else if (yesterday > today && today > tomorrow && tomorrow > next_week) return '#63ff00'
                    else return '#00B32C'
                }
                else {
                    return '#c0c0c0'
                }
            },

        },
        watch: {
            region: function (val) {
                //do something when the data changes.
                this.$store.commit('covidDashBoard/SET_AREA_TYPE', 'uk')
                this.$store.commit('covidDashBoard/SET_TARGET', val)
                this.$store.dispatch('covidDashBoard/GET_DASHBOARD')
                this.region = val

                if (val === '') {
                    this.$store.commit('covidDashBoard/SET_CLEAR')
                }
            },
        },
        data () {
            return {
                footerProps: {
                    'items-per-page-options': [5, 10, 20]
                },
                dataRequested: false,
                region: '',
                search: '',
                headers: [
                    {
                        text: 'Area',
                        align: 'start',
                        sortable: false,
                        value: 'area',
                    },
                    { text: 'Name', value: 'name' },
                    { text: 'Yesterday Death', value: 'deaths' },
                    { text: 'Yesterday Confirmed', value: 'confirmed' },
                    { text: 'Prediction: Today Confirmed', value: 'pred_today' },
                    { text: 'Prediction: Tomorrow Confirmed', value: 'pred_tomorrow' },
                    { text: 'Prediction: Next Week Confirmed', value: 'pred_nextweek' },
                    { text: "Prediction Accuracy: yesterday's", value: 'yesterday_pred_accuracy' },
                    { text: "Prediciton Accuracy: lastweek's", value: 'last_week_pred_accuracy' },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>