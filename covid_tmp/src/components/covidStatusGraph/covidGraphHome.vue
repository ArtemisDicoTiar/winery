<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Global Home</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis Home page.<br/>
                </span>
                <span class="md-subheading">
                    Pleas have a look on <b><u>left-side drawer</u></b>. <br/>
                    You can open it my clicking <b><u>left top</u></b>, three lines icon.<br/>
                </span>

                <h2>Pages connecting to ...</h2>

                <md-tabs md-sync-route class="md-accent">
                    <md-tab id="tab-home" md-label="Global New" to="/global/new"></md-tab>
                    <md-tab id="tab-pages" md-label="Global Cumulative" to="/global/cumulative"></md-tab>
                    <md-tab id="tab-posts" md-label="UK Data" to="/uk"></md-tab>
                </md-tabs>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";

    export default {
        name: 'Home',
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