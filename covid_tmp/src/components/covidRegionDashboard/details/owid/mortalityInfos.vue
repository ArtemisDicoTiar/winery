<template>
    <md-card class="content" style="background: #3e76a2; width: 100%; margin-left: 0">
        <span class="md-title" style="margin-left: 1%;">
                <md-icon>no_accounts</md-icon>
                Mortality Information
            </span>
        <div style="margin-bottom: 1vh"/>
        <div style="margin-right: 4%" v-if="isDataLoaded">
            <div class="md-layout">
                <statsCardCustom
                        top-icon="fas fa-users"
                        card-color="red"
                        title="P scores: All ages (%)"
                        :details="(owid_mortality['p_scores_all_ages'].slice(-1)[0]<0?'':'+')
                        + owid_mortality['p_scores_all_ages'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="owid_mortality.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="fas fa-child"
                        card-color="orange"
                        title="P scores: 15 ~ 64 (%)"
                        :details="(owid_mortality['p_scores_15_64'].slice(-1)[0]<0?'':'+')
                        + owid_mortality['p_scores_15_64'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="owid_mortality.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="person"
                        card-color="green"
                        title="P scores: 65 ~ 74 (%)"
                        :details="(owid_mortality['p_scores_65_74'].slice(-1)[0]<0?'':'+')
                        + owid_mortality['p_scores_65_74'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="owid_mortality.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="person"
                        card-color="blue"
                        title="P scores: 75 ~ 84 (%)"
                        :details="(owid_mortality['p_scores_75_84'].slice(-1)[0]<0?'':'+')
                        + owid_mortality['p_scores_75_84'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="owid_mortality.date.slice(-1)[0]"
                />
                <statsCardCustom
                        top-icon="person"
                        card-color="purple"
                        title="P scores: 85 ~ (%)"
                        :details="(owid_mortality['p_scores_85plus'].slice(-1)[0]<0?'':'+')
                        + owid_mortality['p_scores_85plus'].slice(-1)[0] + '%'"
                        footer-icon="update"
                        :footer-content="owid_mortality.date.slice(-1)[0]"
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
                    || data['p_scores_all_ages'] === undefined);

            },
        },
        computed: {
            isDataLoaded() {return this.isDataValid(this.owid_mortality)},

            owid_mortality () {return this.$store.state.totalDashBoardData.owid.mortality},

        },
        data() {
            return {

            };
        }
    };
</script>
