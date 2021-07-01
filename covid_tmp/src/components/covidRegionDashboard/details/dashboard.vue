<template>
    <div class="content">
        <covidInfos/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <google-mobility/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <vaccinationInfos/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <testingInfos/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <mortalityInfos/>
        <div style="margin-top: 5%; margin-bottom: 5%"/>
        <healthInfos/>
    </div>
</template>

<script>
    import covidInfos from "@/components/covidRegionDashboard/details/covidInfos";
    import GoogleMobility from "@/components/covidRegionDashboard/details/googleMobility";
    import vaccinationInfos from "@/components/covidRegionDashboard/details/owid/vaccinationInfos";
    import testingInfos from "@/components/covidRegionDashboard/details/owid/testingInfos";
    import mortalityInfos from "@/components/covidRegionDashboard/details/owid/mortalityInfos";
    import healthInfos from "@/components/covidRegionDashboard/details/owid/healthInfos";

    export default {
        components: {
            covidInfos,
            GoogleMobility,
            vaccinationInfos,
            testingInfos,
            mortalityInfos,
            healthInfos,
        },
    };
</script>
