<template>
    <md-card class="content" style="background: #3e76a2; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%;">
                <md-icon>healing</md-icon>
                OWID COVID, Health related Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="storefront"
                        card-color="red"
                        title="Retail and Recreation Visit Rate"
                        :details="(mobility['retail_and_recreation_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['retail_and_recreation_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="local_grocery_store"
                        card-color="orange"
                        title="Grocery and Pharmarcy Visit Rate"
                        :details="(mobility['grocery_and_pharmacy_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['grocery_and_pharmacy_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="park"
                        card-color="green"
                        title="Park Visit Rate"
                        :details="(mobility['parks_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['parks_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="tram"
                        card-color="blue"
                        title="Transit Stations Visit Rate"
                        :details="(mobility['transit_stations_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['transit_stations_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="work_outline"
                        card-color="purple"
                        title="Workplace Visit Rate"
                        :details="(mobility['workplaces_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['workplaces_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="home"
                        card-color="gray"
                        title="Residential Place Visit Rate"
                        :details="(mobility['residential_percent_change_from_baseline'].slice(-1)[0]<0?'':'+')
                        + mobility['residential_percent_change_from_baseline'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="mobility.date.slice(-1)[0]"
                />

            </div>

            <div class="md-layout">
                <graphCardCustom
                        card-color="red"
                        title="Retail and Recreation Visit Rate"
                        details=""
                        :updated="retail.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="retail.data"
                        :graph-options="retail.option"
                />
                <graphCardCustom
                        card-color="orange"
                        title="Grocery and Pharmarcy Visit Rate"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="grocery.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="grocery.data"
                        :graph-options="grocery.option"
                />
                <graphCardCustom
                        card-color="green"
                        title="Park Visit Rate"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="park.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="park.data"
                        :graph-options="park.option"
                />
                <graphCardCustom
                        card-color="blue"
                        title="Transit Stations Visit Rate"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="transit.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="transit.data"
                        :graph-options="transit.option"
                />
                <graphCardCustom
                        card-color="purple"
                        title="Workplace Visit Rate"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="work.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="work.data"
                        :graph-options="work.option"
                />
                <graphCardCustom
                        card-color="gray"
                        title="Residential Place Visit Rate"
                        details="This graph informs the cumulative confirmed cases."
                        :updated="home.data.labels.slice(-1)[0]"
                        graph-type="Line"
                        :graph-data="home.data"
                        :graph-options="home.option"
                />
            </div>

        </div>


    </md-card>
</template>

<script>
    import graphCardCustom from "@/components/covidRegionDashboard/details/graphCardCustom";
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";
    var sma = require('sma');

    export default {
        components: {
            statsCardCustom,
            graphCardCustom,
        },
        methods: {
            dateConvert(dates) {
                return dates.map(date => date.slice(5))
            },
            getGraphObject(data, field) {
                var dataField = sma(data[field], 7).slice(-10)
                return {
                    data: {
                        labels: this.dateConvert(data.date).slice(-10),
                        series: [dataField]
                    },
                    option: {
                        lineSmooth: this.$Chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: Math.min.apply(null, dataField),
                        high: Math.max.apply(null, dataField),
                        chartPadding: {
                            top: 15,
                            right: 0,
                            bottom: 5,
                            left: 20
                        }
                    },
                }
            },
            isDataValid(data) {
                return !(data['date'] === undefined
                    || data['retail_and_recreation_percent_change_from_baseline'] === undefined);

            },
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.mobility)},
            mobility () {return this.$store.state.totalDashBoardData.mobility},

            retail () {return this.getGraphObject(this.mobility, 'retail_and_recreation_percent_change_from_baseline')},
            grocery () {return this.getGraphObject(this.mobility, 'grocery_and_pharmacy_percent_change_from_baseline')},
            park () {return this.getGraphObject(this.mobility, 'parks_percent_change_from_baseline')},
            transit () {return this.getGraphObject(this.mobility, 'transit_stations_percent_change_from_baseline')},
            work () {return this.getGraphObject(this.mobility, 'workplaces_percent_change_from_baseline')},
            home () {return this.getGraphObject(this.mobility, 'residential_percent_change_from_baseline')},



        },
        data() {
            return {

            };
        }
    };
</script>
