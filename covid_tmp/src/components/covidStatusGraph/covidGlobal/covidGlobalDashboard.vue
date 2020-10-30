<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Global Dashboard</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis Global dashboard.<br/>
                </span>
                <span class="md-subheading">
                    some text for global dashboard.<br/>
                </span>

                <h2>Pages connecting to ...</h2>

                <md-tabs md-sync-route class="md-accent">
                    <md-tab id="tab-home" md-label="Global New" to="/global/new"></md-tab>
                    <md-tab id="tab-pages" md-label="Global Cumulative" to="/global/cumulative"></md-tab>
                </md-tabs>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";

    export default {
        name: 'globalDashBoard',
        components:{
            navBar
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