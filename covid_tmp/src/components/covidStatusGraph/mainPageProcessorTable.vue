<template>
    <div id="mainPageAirflow">
        <md-progress-spinner
                v-if="this.$store.state.airflowApi.loading === true"
                md-mode="indeterminate"
        />
        <md-table md-card v-if="this.$store.state.airflowApi.loading === false">
            <md-table-toolbar>
                <h1 class="md-title">
                    <md-icon>grading</md-icon>
                    Crawler/Processor Status
                </h1>
                <md-subheader>
                    All crawlers and processors run usually between 3 ~ 12AM (GMT, UK) / 12 ~ 9PM (KST, Korea).
                </md-subheader>
            </md-table-toolbar>

            <md-table-row>
                <md-table-head>Target Region</md-table-head>
                <md-table-head>Status</md-table-head>
            </md-table-row>

            <md-table-row>
                <md-table-cell>Global</md-table-cell>
                <md-table-cell>{{ this.globAirflow }}</md-table-cell>
            </md-table-row>

            <md-table-row>
                <md-table-cell>UK</md-table-cell>
                <md-table-cell>{{ this.ukAirflow }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>

    export default {
        name: 'mainPageAirflow',
        components:{

        },
        data () {
            return {
                // ukAirflow: '',
                // globAirflow: ''
            }
        },
        computed: {
            ukAirflow () {
                return this.$store.state.airflowApi.UKUpdateStatus
            },
            globAirflow () {
                return this.$store.state.airflowApi.globalUpdateStatus
            }
        },
        beforeMount() {
            this.$store.dispatch('airflowApi/GET_DASHBOARD')
        }
    }
</script>