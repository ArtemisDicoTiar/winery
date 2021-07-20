<template>
    <md-card class="content" style="background: #006064; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%">
                <md-icon>coronavirus</md-icon>
                COVID Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded ">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="how_to_reg"
                        card-color="red"
                        title="New Confirmed Cases"
                        :details="covid_confirmed.delta"
                        footer-icon="update"
                        :footer-content="covid_confirmed.data.labels.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="person_off"
                        card-color="purple"
                        title="New Death Cases"
                        :details="covid_deaths.delta"
                        footer-icon="update"
                        :footer-content="covid_deaths.data.labels.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="insights"
                        card-color="gray"
                        title="Confirmed Cases ARIMA Prediction (Today)"
                        :details="covid_preds.delta"
                        footer-icon="update"
                        :footer-content="covid_preds.data.labels.slice(-1)[0]"
                        v-if="this.$store.state.totalDashBoardData.covid.preds !== null"
                />
                <statsCardCustom
                        top-icon="data_usage"
                        card-color="orange"
                        title="ARIMA Prediction Accuracy"
                        details=""
                        footer-icon="update"
                        :footer-content="covid_preds.data.labels.slice(-1)[0]"
                        v-if="this.$store.state.totalDashBoardData.covid.pred_accuracy !== null
                        && this.$store.state.totalDashBoardData.covid.preds !== null"
                >
                    <template slot="extra" style="justify-content: space-between;">
                        <div style="justify-content: space-around; align-items: center; text-align: center; display: flex;">
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_pred_accuracy.yesterday_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>Yesterday</b>
                                </template>
                            </Progress>
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_pred_accuracy.lastweek_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>Lastweek</b>
                                </template>
                            </Progress>
                        </div>
                    </template>
                </statsCardCustom>
                <statsCardCustom
                        top-icon="insights"
                        card-color="gray"
                        title="Confirmed Cases LSTM Prediction (Today)"
                        :details="covid_lstm_preds.delta"
                        footer-icon="update"
                        :footer-content="covid_lstm_preds.data.labels.slice(-1)[0]"
                        v-if="this.$store.state.totalDashBoardData.covid.lstm_preds !== null"
                />
                <statsCardCustom
                        top-icon="data_usage"
                        card-color="orange"
                        title="LSTM Prediction Accuracy"
                        details=""
                        footer-icon="update"
                        :footer-content="covid_lstm_preds.data.labels.slice(-1)[0]"
                        v-if="this.$store.state.totalDashBoardData.covid.lstm_pred_accuracy !== null
                        && this.$store.state.totalDashBoardData.covid.lstm_preds !== null"
                >
                    <template slot="extra" style="justify-content: space-between;">
                        <div style="justify-content: space-around; align-items: center; text-align: center; display: flex;">
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_lstm_pred_accuracy.yesterday_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>Yesterday</b>
                                </template>
                            </Progress>
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_lstm_pred_accuracy.lastweek_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>Lastweek</b>
                                </template>
                            </Progress>
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_lstm_pred_accuracy.last2week_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>2weeks ago</b>
                                </template>
                            </Progress>
                            <Progress
                                    :transitionDuration="3000"
                                    :radius="40"
                                    :strokeWidth="7"
                                    :value="Number(covid_lstm_pred_accuracy.last4week_accuracy[0])"
                            >
                                <template v-slot:footer>
                                    <b>4weeks ago</b>
                                </template>
                            </Progress>
                        </div>
                    </template>
                </statsCardCustom>

            </div>

            <div class="md-layout">
                <graphCardCustom
                        card-color="red"
                        :title="'Cumulative Confirmed Cases '+covid_confirmed.unit.unit"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="covid_confirmed.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="covid_confirmed.data"
                        :graph-options="covid_confirmed.option"
                        dialog-title="Confirmed Cases"
                        :newValueRequired="true"
                        :data4weeks="confirmed_plotly"
                        :date4weeks="this.$store.state.totalDashBoardData.covid.info.date"
                />
                <graphCardCustom
                        card-color="purple"
                        :title="'Cumulative Death Cases '+covid_deaths.unit.unit"
                        details="This graph shows the reported cumulative death cases."
                        :updated="covid_deaths.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="covid_deaths.data"
                        :graph-options="covid_deaths.option"
                        dialog-title="Death Cases"
                        :newValueRequired="true"
                        :data4weeks="this.$store.state.totalDashBoardData.covid.info.deaths"
                        :date4weeks="this.$store.state.totalDashBoardData.covid.info.date"
                />
                <graphCardCustom
                        card-color="gray"
                        :title="'ARIMA Predicted Cumulative Confirmed Cases '+covid_preds.unit.unit"
                        details="This graph illustrates how the confirmed cases increases after 5days since today."
                        :updated="covid_preds.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="covid_preds.data"
                        :graph-options="covid_preds.option"
                        dialog-title="Predicted Confirmed Cases"
                        :newValueRequired="true"
                        :data4weeks="this.$store.state.totalDashBoardData.covid.preds['confirmed_prediction']"
                        :date4weeks="this.$store.state.totalDashBoardData.covid.preds['date']"
                        v-if="this.$store.state.totalDashBoardData.covid.preds !== null"
                />
                <graphCardCustom
                        card-color="gray"
                        :title="'LSTM Predicted Cumulative Confirmed Cases '+covid_lstm_preds.unit.unit"
                        details="This graph illustrates how the confirmed cases changes for 28days since today.
                        (The LSTM model is trained by viewing 8weeks window and predict next 4weeks.)"
                        :updated="covid_lstm_preds.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="covid_lstm_preds.data"
                        :graph-options="covid_lstm_preds.option"
                        dialog-title="Predicted Confirmed Cases"
                        :newValueRequired="true"
                        :data4weeks="this.$store.state.totalDashBoardData.covid.lstm_preds['confirmed_prediction']"
                        :date4weeks="this.$store.state.totalDashBoardData.covid.lstm_preds['date']"
                        v-if="this.$store.state.totalDashBoardData.covid.lstm_preds !== null"
                />
            </div>

        </div>


    </md-card>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";
    import Progress from "easy-circular-progress";

    export default {
        components: {
            statsCardCustom,
            graphCardCustom,
            Progress
        },
        methods: {
            dateConvert(dates) {
                return dates.map(date => date.slice(5, 10))
            },
            dataConvert(sum, avg, data){
                const unit = this.getUnitPrefix(avg)
                return data.map(point => Math.round(point/unit.num * 1000)/1000)
            },
            getUnitPrefix(data) {
                let units = [
                    {num: 1, unit: ''},
                    {num: 1000, unit: '[Thousands]'},
                    {num: 1000000, unit: '[Millions]'},
                    {num: 1000000000, unit: '[Billions]'},
                    {num: 1000000000000, unit: '[Trillions]'}
                ]
                for (var i=0; i < units.length; i++) {
                    if (data / units[i].num < 1){
                        if (i === 0) return {num: 1, unit: ''}
                        return units[i-1]
                    }
                }
            },
            getGraphObject(data, field) {
                const sum = data[field].slice(-7).reduce((a, b) => a + b, 0);
                const avg = (sum / data[field].slice(-7).length) || 0;
                const unitObj = this.getUnitPrefix(avg)

                return {
                    data: {
                        labels: this.dateConvert(data.date.slice(-7)),
                        series: [this.dataConvert(sum, avg, data[field].slice(-7))]
                    },
                    option: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: Math.min.apply(null, this.dataConvert(sum, avg, data[field].slice(-7))),
                        high: Math.max.apply(null, this.dataConvert(sum, avg, data[field].slice(-7))),
                        chartPadding: {
                            top: 15,
                            right: 0,
                            bottom: 5,
                            left: 10
                        }
                    },
                    delta: this.getLastDelta(data[field].slice(-7)),
                    unit: unitObj
                }

            },
            getPredGraphObject(data) {
                if (data === null) {
                    return {
                        data: {
                            labels: [],
                            series: [[0, 0, 0, 0, 0, 0, 0]]
                        },
                        option: {
                            lineSmooth: this.$Chartist.Interpolation.cardinal({
                                tension: 0
                            }),
                            low: 0,
                            high: 1,
                            chartPadding: {
                                top: 15,
                                right: 0,
                                bottom: 5,
                                left: 10
                            }
                        },
                        delta: null,
                        unit: {unit: ''}
                    }
                }
                const field = 'confirmed_prediction'
                const sum = data[field].reduce((a, b) => a + b, 0);
                const avg = (sum / data[field].length) || 0;
                const unitObj = this.getUnitPrefix(avg)
                const delta = Math.round(
                    this.dataConvert(sum, avg, data[field])[0]*unitObj.num
                    - this.covid_confirmed.data.series[0].slice(-1)[0]*this.covid_confirmed.unit.num
                )
                return {
                    data: {
                        labels: this.dateConvert(data.date).slice(0, 7),
                        series: [this.dataConvert(sum, avg, data[field]).slice(0, 7)]
                    },
                    option: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: Math.min.apply(null, this.dataConvert(sum, avg, data[field]).slice(0, 7)),
                        high: Math.max.apply(null, this.dataConvert(sum, avg, data[field]).slice(0, 7)),
                        chartPadding: {
                            top: 15,
                            right: 0,
                            bottom: 5,
                            left: 10
                        }
                    },
                    delta: (delta<0?"":"+") + delta,
                    unit: unitObj
                }
            },
            isDataValid(data, population) {
                return !(data['date'] === undefined
                    || population['population'] === undefined);

            },
            getLastDelta(ary) {
                var delta = (ary[ary.length - 1] - ary[ary.length - 2]).toString()
                return (delta<0?"":"+") + delta
            }
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.covid_info, this.owid_health)},
            covid_info () {return this.$store.state.totalDashBoardData.covid.info},
            covid_confirmed () {
                if (this.$store.state.totalDashBoard.sub_division !== undefined
                    && this.$store.state.totalDashBoard.sub_division.code !== 'all'
                    && this.$store.state.totalDashBoard.country.code === 'GBR') {
                    return this.getGraphObject(this.covid_info, 'confirmedCumulative')
                }
                return this.getGraphObject(this.covid_info, 'confirmed')
            },
            confirmed_plotly () {
                if (this.$store.state.totalDashBoard.sub_division !== undefined
                    && this.$store.state.totalDashBoard.sub_division.code !== 'all'
                    && this.$store.state.totalDashBoard.country.code === 'GBR') {
                    return this.covid_info['confirmedCumulative']
                }
                return this.covid_info['confirmed']
            },
            covid_deaths () {
                if (this.$store.state.totalDashBoard.sub_division !== undefined
                    && this.$store.state.totalDashBoard.sub_division.code !== 'all'
                    && this.$store.state.totalDashBoard.country.code === 'GBR') {
                    return {
                        data: {
                            labels: [],
                            series: [[0, 0, 0, 0, 0, 0, 0]]
                        },
                        option: {
                            lineSmooth: this.$Chartist.Interpolation.cardinal({
                                tension: 0
                            }),
                            low: 0,
                            high: 1,
                            chartPadding: {
                                top: 15,
                                right: 0,
                                bottom: 5,
                                left: 10
                            }
                        },
                        delta: null,
                        unit: {unit: ''}
                    }
                }
                return this.getGraphObject(this.covid_info, 'deaths')
            },

            covid_preds () {return this.getPredGraphObject(this.$store.state.totalDashBoardData.covid.preds)},
            covid_pred_accuracy () {return this.$store.state.totalDashBoardData.covid.pred_accuracy},

            covid_lstm_preds () {return this.getPredGraphObject(this.$store.state.totalDashBoardData.covid.lstm_preds)},
            covid_lstm_pred_accuracy () {return this.$store.state.totalDashBoardData.covid.lstm_pred_accuracy},

            owid_health () {return this.$store.state.totalDashBoardData.owid.health},


        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    /*.md-dialog {*/
    /*    max-width: 768px;*/
    /*}*/
</style>
