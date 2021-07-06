<template>
    <div
            class="md-layout-item md-xsmall-size-100 md-medium-size-50 md-size-25"
    >
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>{{dialogTitle}}</md-dialog-title>

            <md-dialog-content>
                <div class="moving_average">
                    <span class="md-subheading">Select Moving Average(MA)</span><br/>
                    <md-radio v-model="movingAverage" :value="0">Raw Data</md-radio>
                    <md-radio v-model="movingAverage" :value="5">5days MA</md-radio>
                    <md-radio v-model="movingAverage" :value="7">7days MA</md-radio>
                    <md-radio v-model="movingAverage" :value="14">14days MA</md-radio>
                </div>
                <Plotly :data="plot_data"
                        :layout="plotlyOption"
                        :display-mode-bar="false"
                />
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>

        <chart-card
                :chart-data="graphData"
                :chart-options="graphOptions"
                :chart-type="graphType"
                :data-background-color="cardColor"
        >
            <template slot="content">
                <h4 class="title">{{ title }}</h4>
                <p class="category">
                    {{ details }}
                </p>
            </template>

            <template slot="footer">
                <div class="stats">
                    <md-icon>update</md-icon>
                    Last updated: {{ updated }}
                </div>

                <md-button class="md-fab md-dense md-accent" style="min-width: 0%" @click="this.closeButton">
                    <md-tooltip md-direction="buttom"><span class="md-subheading">Details</span></md-tooltip>
                    <md-icon class="md-size-1x" style="margin-top: 30%">dashboard</md-icon>
                </md-button>
            </template>
        </chart-card>

    </div>
</template>
<script>
    import ChartCard from "@/components/prebuilts/Cards/ChartCard";
    import { Plotly } from 'vue-plotly'
    var sma = require('sma');


    export default {
        components:{
            Plotly,
            ChartCard
        },
        methods: {
            closeButton () {
                this.showDialog = true
                this.movingAverage = 0
            }
        },
        beforeMount() {

        },
        computed: {
            plot_vals () {
                if (this.movingAverage > 0) {
                    return sma(this.data4weeks, this.movingAverage)
                }
                return this.data4weeks
            },
            date_vals() {
                if (this.movingAverage > 0) {
                    return this.date4weeks.slice(this.movingAverage-27)
                }
                return this.date4weeks
            },
            plot_data () {
                var res = [{
                    y: this.plot_vals,
                    x: this.date_vals,
                    type: 'lines',
                    name: 'Cumulative',
                    marker: {color: '#1F77B4'},
                    xaxis: 'x',
                    yaxis: 'y2'
                }]
                if (this.newValueRequired) {
                    res.push({
                        y: this.plot_vals.slice(1).map((val, idx) => val-this.plot_vals.slice(0,-1)[idx]),
                        x: this.date_vals.slice(1),

                        marker: {color: '#FF6FA9'},
                        type: 'bar',
                        name: 'New',
                        xaxis: 'x',
                        yaxis: 'y'
                    })
                }
                return res
            }
        },
        props:{
            title: {
                type: String,
                default: "title props needed"
            },
            details: {
                type: String,
                default: null
            },
            updated: {
                type: String,
                default: null
            },
            cardColor: {
                type: String,
                default: null
            },
            graphType: {
                type: String,
                default: 'line'
            },
            graphData:{
                type: Object,
                default: null,
            },
            graphOptions:{
                type: Object,
                default: null,
            },
            dialogTitle:{
                type: String,
                default: 'NULL -> PUT THE TITLE IN',
            },
            data4weeks: {
                type: Object,
                default: null,
            },
            date4weeks: {
                type: Object,
                default: null,
            },
            newValueRequired:{
                type: Boolean,
                default: true
            }
        },
        data() {
            return{
                movingAverage: 0,
                showDialog: false,
                plotlyOption: {
                    autosize: true,
                    // title: {
                    //     // y : 1,
                    //     text: 'TESTING',
                    //     size: 15,
                    // },
                    legend: {
                        itemsizing: "constant",
                        xanchor:"center",//"auto" | "left" | "center" | "right"
                        yanchor:"bottom",//"auto" | "top" | "middle" | "bottom"
                        y: -0.3,//number between or equal to -2 and 3
                        x: 0.5,//number between or equal to -2 and 3
                        orientation: "h",
                        font: {
                            size: 13,
                        }
                    },
                    xaxis: {
                        ticks: 'outside',
                        tickcolor: '#000',
                        automargin: true,
                    },
                    yaxis: {
                        ticks: 'outside',
                        // title: 'New cases',
                        automargin: true,
                        color: '#FF6FA9'
                    },
                    yaxis2: {
                        ticks: 'outside',
                        // title: 'Cumulative cases',
                        color: '#1F77B4',
                        anchor: 'x',
                        match: 'y',
                        overlaying: 'y',
                        side: 'right',
                        automargin: true,

                    },
                    margin: {
                        l: 50,
                        r: 50,
                        t: 30,
                        b: 50,
                    },
                }
            }
        }
    }
</script>
<style>

</style>
