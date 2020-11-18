<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 UK Dashboard</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis UK dashboard.<br/>
                </span>
                <span class="md-subheading">
                    Some text for dashboard <br/>
                </span>

                <h2>Pages connecting to ...</h2>
                <br/>
                <md-divider/>
                <br/>

                <md-tabs md-sync-route class="md-accent">
                    <md-tab id="tab-posts" md-label="UK Graph" to="/uk/graph"></md-tab>
                </md-tabs>
                <br/>
                <md-divider/>
                <br/>
                <covid_dashboard_uk_table/>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";
    import covid_dashboard_uk_table
        from "@/components/covidStatusGraph/covidUK/dashBoard_components/covid_dashboard_uk_table";

    export default {
        name: 'globalDashBoard',
        components:{
            navBar,
            covid_dashboard_uk_table
        },
        data () {
            return {
                menuVisible: false
            }
        }
    }

</script>

<style lang="scss" scoped>
    .md-app {
        min-height: 700px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>