<template>
    <div class="content">
        <covidInfos/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <google-mobility/>
    </div>
</template>

<script>
    import covidInfos from "@/components/covidRegionDashboard/details/covidInfos";
    import GoogleMobility from "@/components/covidRegionDashboard/details/googleMobility";

    export default {
        components: {
            GoogleMobility,
            covidInfos
        },
        computed: {
            covid_info () {return this.$store.state.totalDashBoardData.covid.info},
            covid_preds () {return this.$store.state.totalDashBoardData.covid.preds},
            covid_pred_accuracy () {return this.$store.state.totalDashBoardData.covid.pred_accuracy},

            mobility () {return this.$store.state.totalDashBoardData.mobility},

            owid_health () {return this.$store.state.totalDashBoardData.owid.health},
            owid_mortality () {return this.$store.state.totalDashBoardData.owid.mortality},
            owid_testing_data () {return this.$store.state.totalDashBoardData.owid.testing.data},
            owid_testing_meta () {return this.$store.state.totalDashBoardData.owid.testing.meta},
            owid_vaccination_data () {return this.$store.state.totalDashBoardData.owid.vaccination.data},
            owid_vaccination_meta () {return this.$store.state.totalDashBoardData.owid.vaccination.meta},
        },
        data() {
            return {

            };
        }
    };
</script>
