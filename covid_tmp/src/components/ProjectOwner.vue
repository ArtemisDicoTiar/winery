<template>
    <div id="owner" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-headline">COVID - 19 Analysis Home</span>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <navBar/>
            </md-app-drawer>

            <md-app-content>
                <span class="md-title">
                    COVID DATA Analysis Project Information.<br/>
                </span>
                <br/>
                <span class="md-subheading">
                    Hello. I am the owner of this project, <h2><b>John Kim</b></h2>
                    If you have any query or feedback please send to following email address.<br/>

                    * Email: mw18074@bristol.ac.uk<br/>
                </span><br/>
                <md-divider/>
                <span class="md-title">
                    About Project<br/>
                </span>
                <br/>
                <span class="md-subheading">
                    Crawler: Airflow (python3.7)<br/>
                    Pre-process: Airflow (python3.7)<br/>
                    Post-process: Airflow (python3.7)<br/>
                    DataBase: MariaDB<br/>
                    <br/>
                    Webserver: Docker wrapped nginx web server engine<br/>
                    Webpage(Front): Vuejs Framework (JavaScript, HTML, CSS)<br/>
                    Webpage(Back) : Flask Framework (python)<br/>

                </span>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";

    export default {
        name: 'owner',
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