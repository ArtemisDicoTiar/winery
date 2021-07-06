<template>
    <md-card class="content" style="background: #2e6691; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%;">
                <i class="fas fa-vial"></i>
                Testing Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="source"
                        card-color="red"
                        title="Testing Data Source"
                        :details="owid_testing_meta['General_source_label']"
                        footer-icon="update"
                        :footer-content="owid_testing_meta['Date']"
                />
                <statsCardCustom
                        top-icon="description"
                        card-color="red"
                        title="Testing Unit/Description"
                        :details="owid_testing_meta['Short_description']"
                        footer-icon="update"
                        :footer-content="owid_testing_meta['Date']"
                />
                <statsCardCustom
                        top-icon="rule"
                        card-color="orange"
                        title="Last Daily Tested People"
                        :details="testing.delta"
                        footer-icon="update"
                        :footer-content="owid_testing_meta['Date']"
                />
                <statsCardCustom
                        top-icon="checklist"
                        card-color="purple"
                        title="Short-term Positive Rate"
                        :details="positiveRate.delta + ' %'"
                        footer-icon="update"
                        :footer-content="owid_testing_meta['Date']"
                />

            </div>

            <div class="md-layout">
                <graphCardCustom
                        card-color="orange"
                        :title="'Number of Tested People '+testing.unit.unit"
                        details="Cumulative Tested Number of People"
                        :updated="owid_testing_meta['Date']"
                        graph-type="Line"
                        :graph-data="testing.data"
                        :graph-options="testing.option"
                        :newValueRequired="true"
                        dialog-title="Last Daily Test People"
                        :data4weeks="this.owid_testing_data['Cumulative_total']"
                        :date4weeks="this.owid_testing_data['Date']"
                />
                <graphCardCustom
                        card-color="purple"
                        title="Short Term Positive Rate (%)"
                        details="Percentage of tested result shows positive"
                        :updated="owid_testing_meta['Date']"
                        graph-type="Line"
                        :graph-data="positiveRate.data"
                        :graph-options="positiveRate.option"
                        :newValueRequired="false"
                        dialog-title="Last Daily Test People"
                        :data4weeks="this.owid_testing_data['Short_term_positive_rate']"
                        :date4weeks="this.owid_testing_data['Date']"
                />
            </div>

        </div>


    </md-card>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";

    export default {
        components: {
            statsCardCustom,
            graphCardCustom,
        },
        methods: {
            dateConvert(dates) {
                return dates.map(date => date.slice(5))
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
            dataConvert(sum, avg, data){
                const unit = this.getUnitPrefix(avg)
                return data.map(point => Math.round(point/unit.num * 1000)/1000)
            },
            getGraphObject(data, field) {
                var dataField = data[field].slice(-7)

                const sum = dataField.reduce((a, b) => a + b, 0);
                const avg = (sum / dataField.length) || 0;

                const unitObj = this.getUnitPrefix(avg)
                var convertedData = this.dataConvert(sum, avg, dataField)
                var delta = Math.round(dataField.slice(-1)[0] - dataField.slice(-2)[0])
                if (field === 'Short_term_positive_rate') {
                    delta = Math.round(dataField.slice(-1)[0]*10000)/10000

                }

                return {
                    data: {
                        labels: this.dateConvert(data['Date']).slice(-7),
                        series: [convertedData]
                    },
                    option: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: Math.min.apply(null, convertedData),
                        high: Math.max.apply(null, convertedData),
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
            isDataValid(data) {
                return !(data['Date'] === undefined
                    || data['Cumulative_total'] === undefined);

            },
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.owid_testing_data)},

            owid_testing_data () {return this.$store.state.totalDashBoardData.owid.testing.data},
            testing () {return this.getGraphObject(this.owid_testing_data, 'Cumulative_total')},
            positiveRate () {return this.getGraphObject(this.owid_testing_data, 'Short_term_positive_rate')},

            owid_testing_meta () {return this.$store.state.totalDashBoardData.owid.testing.meta},


        },
        data() {
            return {

            };
        }
    };
</script>
