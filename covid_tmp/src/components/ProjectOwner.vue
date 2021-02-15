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
                    CI/CD: Jenkins (Java + Github webhook)<br/>
                    <br/>
                    Crawler: Airflow (python3.7)<br/>
                    Pre-process: Airflow (python3.7)<br/>
                    Post-process: Airflow (python3.7)<br/>
                    DataBase: MariaDB<br/>
                    <br/>
                    Webserver: Docker wrapped nginx web server engine<br/>
                    Webpage(Front): Vuejs Framework (JavaScript, HTML, CSS)<br/>
                    Webpage(Back) : Flask Framework (python)<br/>
                </span>
                <br/>
                <md-divider/>
                <span class="md-title">
                    Data Source References<br/>
                </span>
                <br/>
                <span class="md-subheading">
                    * Google Mobility:<br/>
                    <span class="md-body-1">
                        Google LLC "Google COVID-19 Community Mobility Reports".
                    </span><br/>
                    <a href="https://www.google.com/covid19/mobility/">https://www.google.com/covid19/mobility/</a><br/>
                    <br/>
                    * CSSE GIS and Data:<br/>
                    <span class="md-body-1">
                        All COVID confirmed, death, recovered numbers are originated from this source.
                    </span><br/>
                    "Dong E, Du H, Gardner L. An interactive web-based dashboard to track COVID-19 in real time. Lancet Inf Dis. 20(5):533-534. doi: 10.1016/S1473-3099(20)30120-1"<br/>
                    GitHub repository: <a href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a><br/>
                    <br/>
                    * UK COVID Data:<br/>
                    <span class="md-body-1">
                        All COVID confirmed, death, recovered numbers of UK region are originated from this source.
                    </span><br/>
                    <a href="https://coronavirus.data.gov.uk">https://coronavirus.data.gov.uk</a><br/>
                    <br/>
                    * OWID COVID data:<br/>
                    <span class="md-body-1">
                        This data has not been used for this webpage yet, but it is planning to use and is being collected in daily base.<br/>
                        This data source provides various type of data but vaccination, testing, p-score and mortality information is collected from this source.
                    </span><br/>
                    Hasell, J., Mathieu, E., Beltekian, D. et al. A cross-country database of COVID-19 testing. Sci Data 7, 345 (2020). https://doi.org/10.1038/s41597-020-00688-8<br/>
                    GitHub repository: <a href="https://github.com/owid/covid-19-data/tree/master/public/data">https://github.com/owid/covid-19-data/tree/master/public/data</a>
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