<template>
    <md-card class="content" style="background: #205e82; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%;">
                <i class="fas fa-syringe"></i>
                Vaccination Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="source"
                        card-color="red"
                        title="Vaccination Data Source"
                        :details="meta['source_name']"
                        footer-icon="update"
                        :footer-content="meta['last_observation_date']"
                />
                <statsCardCustom
                        top-icon="inventory"
                        card-color="red"
                        title="Vaccination availabilities"
                        :details="meta['vaccines']"
                        footer-icon="update"
                        :footer-content="meta['last_observation_date']"
                />
                <statsCardCustom
                        top-icon="done"
                        card-color="blue"
                        title="New First Dose Vaccination"
                        :details="first_vac.delta"
                        footer-icon="update"
                        :footer-content="owid_vaccination_data.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="done_all"
                        card-color="green"
                        title="New Second Dose Vaccination"
                        :details="second_vac.delta"
                        footer-icon="update"
                        :footer-content="owid_vaccination_data.date.slice(-1)[0]"
                />
            </div>

            <div class="md-layout">
                <graphCardCustom
                        card-color="blue"
                        title="First Dose Vaccinated People"
                        :details="'Cumulative first dose vaccinated people ' + first_vac.unit.unit"
                        :updated="owid_vaccination_data.date.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="first_vac.data"
                        :graph-options="first_vac.option"
                        :newValueRequired="true"
                        dialog-title="First Dose Vaccination"
                        :data4weeks="this.owid_vaccination_data['people_vaccinated']"
                        :date4weeks="this.owid_vaccination_data.date"
                />
                <graphCardCustom
                        card-color="green"
                        title="Second Dose Vaccinated People"
                        :details="'Cumulative second dose vaccinated people ' + first_vac.unit.unit"
                        :updated="owid_vaccination_data.date.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="second_vac.data"
                        :graph-options="second_vac.option"
                        :newValueRequired="true"
                        dialog-title="Second Dose Vaccination (Final)"
                        :data4weeks="this.owid_vaccination_data['people_fully_vaccinated']"
                        :date4weeks="this.owid_vaccination_data.date"
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
                const delta = Math.round(dataField.slice(-1)[0] - dataField.slice(-2)[0])
                return {
                    data: {
                        labels: this.dateConvert(data.date).slice(-7),
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
                return !(data['date'] === undefined
                    || data['people_vaccinated'] === undefined);

            },
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.owid_vaccination_data)},

            owid_vaccination_data () {return this.$store.state.totalDashBoardData.owid.vaccination.data},
            first_vac () {return this.getGraphObject(this.owid_vaccination_data, 'people_vaccinated')},
            second_vac () {return this.getGraphObject(this.owid_vaccination_data, 'people_fully_vaccinated')},
            meta () {return this.$store.state.totalDashBoardData.owid.vaccination.meta},

        },
        data() {
            return {

            };
        }
    };
</script>
