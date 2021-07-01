<template>
    <md-card class="content" style="background: #528cb3; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%;">
                <md-icon>fitness_center</md-icon>
                Health Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="fas fa-user-plus"
                        card-color="red"
                        title="Population / Population Density"
                        :details="owid_health['population']
                        + ' / ' + owid_health['population_density']"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-user-clock"
                        card-color="orange"
                        title="Median Age / 65+ (%) / 70+ (%)"
                        :details="owid_health['median_age']
                        + ' / ' + Math.round(owid_health['aged_65_older'] * 100)/100
                        + ' / ' + Math.round(owid_health['aged_70_older'] * 100)/100"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-money-bill-wave-alt"
                        card-color="green"
                        title="GDP per Capita / Extreme Poverty (%)"
                        :details="Math.round(owid_health['population'] * 100)/100
                        + ' / ' + Math.round(owid_health['extreme_poverty'] * 100)/100"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-notes-medical"
                        card-color="blue"
                        title="Cardiovasc Death Rate (%) / Diabetes Prevalence (%)"
                        :details="Math.round(owid_health['cardiovasc_death_rate'] * 100)/100
                        + ' / ' + Math.round(owid_health['diabetes_prevalence'] * 100)/100"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-smoking"
                        card-color="purple"
                        title="Smokers: female/male (%)"
                        :details="Math.round(owid_health['female_smokers'] * 100)/100
                        + ' / ' + Math.round(owid_health['male_smokers'] * 100)/100"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-procedures"
                        card-color="gray"
                        title="Hospital beds"
                        :details="owid_health['hospital_beds_per_thousand']*1000"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-star-of-life"
                        card-color="gray"
                        title="Life Expectancy"
                        :details="owid_health['life_expectancy']"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
                <statsCardCustom
                        top-icon="fas fa-network-wired"
                        card-color="gray"
                        title="Human Development Index (0~1)"
                        :details="owid_health['human_development_index']"
                        footer-icon="update"
                        :footer-content="owid_health['date'][0]"
                />
            </div>
        </div>


    </md-card>
</template>

<script>
    import statsCardCustom from "@/components/covidRegionDashboard/details/statsCardCustom";

    export default {
        components: {
            statsCardCustom,
        },
        methods: {
            dateConvert(dates) {
                return dates.map(date => date.slice(5))
            },
            isDataValid(data) {
                return !(data['date'] === undefined
                    || data['population'] === undefined);

            },
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.owid_health)},
            owid_health () {return this.$store.state.totalDashBoardData.owid.health},
        },
        data() {
            return {

            };
        }
    };
</script>
