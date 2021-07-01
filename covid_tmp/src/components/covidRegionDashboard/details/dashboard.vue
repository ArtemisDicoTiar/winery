<template>
    <div class="content">
        <covidInfos/>
        <div style="margin-top: 2vh; margin-bottom: 2vh"/>
        <google-mobility/>
        <div style="margin-top: 2vh; margin-bottom: 2vh"/>
        <vaccinationInfos/>
        <div style="margin-top: 2vh; margin-bottom: 2vh"/>
        <testingInfos/>
        <div style="margin-top: 2vh; margin-bottom: 2vh"/>
        <mortalityInfos/>
        <div style="margin-top: 2vh; margin-bottom: 2vh"/>
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
