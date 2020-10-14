<template>

    <div id="globalHome" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID - 19 Global Home</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    Global Home page.<br/>
                    On Construction. <br/>
                </span>
                <span class="md-subheading">
                    Pleas have a look on <b><u>left-side drawer</u></b>. <br/>
                    You can open it my clicking <b><u>left top</u></b>, three lines icon.<br/>
                </span>
                <span class="md-">
                    <b>UK pages are preparing datasets.</b>
                </span>

                <h2>Pages connecting to ...</h2>

                <md-tabs md-sync-route>
                    <md-tab id="tab-home" md-label="Global New" to="/global/new"></md-tab>
                    <md-tab id="tab-pages" md-label="Global Cumulative" to="/global/cumulative"></md-tab>
                </md-tabs>
                <md-tabs md-sync-route>
                    <md-tab id="tab-posts" md-label="UK New" to="/uk/new" md-disabled></md-tab>
                    <md-tab id="tab-favorites" md-label="UK Cumulative" to="/uk/cumulative" md-disabled></md-tab>
                </md-tabs>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";

    export default {
        name: 'globalHome',
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
    /*.md-app {*/
    /*    max-height: 400px;*/
    /*    border: 1px solid rgba(#000, .12);*/
    /*}*/

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>