<template>
    <div id="Home" class="page-container">
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
                    COVID DATA Analysis Home page.<br/>
                </span>
                <br/>
                <md-card class="md-accent" md-with-hover>

                    <md-card-header>
                        <div class="md-title">* NOTICE *</div>
                        <div class="md-subhead">Project Freeze</div>
                        <div class="md-subhead">Data will be updated daily <br/>BUT future Updates will not be run on time.</div>
                    </md-card-header>

                    <md-card-content>
                        <b>
                            Due to academic study and final year (Bachelor) project, this project will be paused and frozen for few weeks to months.<br/>
                            As my academic project is planned to be finished by late April, all the plans on the future plans below will be postponed at least 2 months.<br/>
                            After project thesis submission, this project will be run again around early May to June.<br/>
                            Sorry for late updates.<br/>
                        </b>
                    </md-card-content>

                </md-card>

                <br/>
                <h2>Pages connecting to ...</h2>
                <br/>
                <p>South Korea Information connects to external page calls 'corona-live' which is well built webpage that shows live status.</p>

                <md-tabs md-sync-route class="md-primary" md-alignment="centered" style="min-width: 100%">
                    <md-tab id="tab-pages" md-label="Global Information" to="/global"></md-tab>
                    <md-tab id="tab-posts" md-label="UK Information" to="/uk"></md-tab>
                </md-tabs>
                <md-tabs md-sync-route class="md-primary" md-alignment="centered" style="min-width: 100%">
                    <md-tab id="tab-externalKorea" md-label="South Korea Information" href="https://corona-live.com/"></md-tab>
                    <md-tab id="tab-external_mutation" md-label="Virus Mutation Reports" href="https://nextstrain.org/ncov/global"></md-tab>
                </md-tabs>
                <br/>
                <md-divider/>
                <br/>
                <mainPageProcessorTable/>

                <br/>
                <md-divider/>
                <br/>

                <span class="md-subheading">
                    This page is version 2 built with Vue-js.<br/>
                    To enhance User eXperience, the graph will initially show recent 28 days data.<br/>
                    To widen the time range, double click anywhere of the graph you want to make it widen.<br/>
                </span>
                <br/>
                <span class="md-subheading">
                    Please have a look on <b><u>left-side drawer</u></b>. <br/>
                    You can open it my clicking <b><u>left top</u></b>, three lines icon.<br/>
                </span>
                <br/>
                <md-divider/>
                <br/>
                <span class="md-title">
                    <b>Update Lists</b>
                </span><br/><br/>

                <span class="md-subheading"><b><i>Future Plans</i></b></span><br/>
                <span class="md-body-1">
                    <span class="md-body-2"><u>"<b><i>[Back-End Update]</i></b>: Better API server with Spring(JAVA) and CI/CD with jenkins"</u></span><br/>
                    As Front-End is planning to update, backend api server is planned to update for better appearance not only on code but also on endpoints.<br/>
                    Furthermore, for convenience, CI/CD tool is going to introduce for building both front-end and back-end.<br/>
                    This back-end update is planning due by this late Winter (2021-Feb).<br/>
                    <br/>

                    <span class="md-body-2"><u>"<b><i>[Front-End Update]</i></b>: Better appearance for both desktop and mobile"</u></span><br/>
                    Although this page is built with vuejs ui framework, vue-material, there are some small issues to make the page clear and neat.<br/>
                    To enhance the readability, pre-built dashboard theme will be applied to this page.<br/>
                    Even though the pre-built theme is applied internal components will follow my previous components.<br/>
                    This front-end update is planned due by this late Winter (2021-Feb/Mar).<br/>
                    <br/>

                    <span class="md-body-2"><u>"<b><i>[Recover from ver1.]</i></b>: Correlation with {Medical Information, Public Health Information"</u></span><br/>
                    This correlation analysis WAS on version1 of this project but removed on version2 due to backend server and database have been updated for better organisation.<br/>
                    This correlation analysis is planning to be on this web-page again due by this Spring (2021).<br/>
                    <br/>

                    <span class="md-body-2"><u>"<b><i>[Recover from ver1.]</i></b>: Far future prediction using SEIR"</u></span><br/>
                    SEIR model was used to predict far future on version1 but has been removed on version2 due to backend renew.<br/>
                    This analysis information is planned due by late Spring ~ early Summer (2021).<br/>
                    <br/>

                    <span class="md-body-2"><u>"<b><i>[NEW]</i></b>: Global Vaccination/Testing information and rate"</u></span><br/>
                    Some countries started their vaccination scheme with 1 or more than 1 type of vaccine.<br/>
                    Providing vaccination rate and the vaccine information and analysing the correlation between this and confirmed case rate will be illustrated on new page shortly.<br/>
                    This information page is planned due by early Spring (2021) with
                    "<a href="https://github.com/owid/covid-19-data">owid's Github</a> project".<br/>
                    <br/>

                    <span class="md-body-2"><u>"<b><i>[NEW]</i></b>: Better prediction using ARIMA and deep-learning"</u></span><br/>
                    ARIMA model forecast shows the range for prediction. In this web-page, it uses mid-point of 95% of confidence range.<br/>
                    Deep-learning model with other external information such as news reports related to human activities,
                    public health information will make the prediction more accurate in the range of 95% confidence range.<br/>
                    This enhancement is planned due by late Summer (2021).
                </span><br/><br/>
                <md-divider/>

                <span class="md-subheading"><b>Front End</b></span><br/>
                <b>* Last Source Code Update: 2021-02-11</b><br/>
                <br/>
                <span class="md-body-1">
                    * Update contents (21-02-11):<br/>
                    Main page now shows OWID and Google Mobility information crawler status. <br/>
                    <br/>
                    * Update contents (01-11):<br/>
                    Virus mutation web-page link added.<br/>
                    Future project plan list added.<br/>
                    <br/>
                    * Update contents (12-04):<br/>
                    Now user can see whether the crawler or processor is running or finished for today's data.<br/>
                    <br/>
                    * Update contents (12-01):<br/>
                    Now each page shows when the data have been updated and the current status of data processing.<br/>
                    <br/>
                    * Update contents (11-18):<br/>
                    Now dashboard is available. Dashboard contains today's COVID cases.<br/>
                    Furthermore, it provides prediction of confirmed cases. Predicted values for tomorrow and 7 days later will be provided.<br/>
                    The dashboard is produced both for Global info and UK info.
                </span><br/><br/>
                <md-divider/>

                <span class="md-subheading"><b>Back End</b></span><br/>
                <b>* Last Source Code Update: 21-03-08</b><br/>
                <span class="md-body-1">
                    * Update contents (21-03-08):<br/>
                    Now api server provides vaccination, testing and p_score information based on crawled data from OWID.<br/>
                    regional information is also provided based on OWID data.<br/>
                    Furthermore, mobility information is provided with crawled data from Google-Mobility-report.<br/>
                    As the api endpoints are not clearly organised, all the endpoints will not be provided to public until api server migrates to 'SpringBoot (with Scala)'.<br/>
                    The front-end page addition will be done shortly by using this updated apis.<br/>
                    <br/>
                    * Update contents (21-02-11):<br/>
                    Airflow ETL is updated to 1.10.14 ver. Although 2.0.1 is tried, as there are some conflicts to upgrade, airflow update is stopped to 1.10.14.<br/>
                    Airflow Security is now applied so other than admin cannot access to DAGs.<br/>
                    <br/>
                    Now Mobility data during COVID-19 Pandemic period is stored to DB via Google Mobility information.<br/>
                    The OWID data and Google Mobility data crawler status is now also available on main page <br/>
                    <br/>
                    * Update contents (21-01-26):<br/>
                    Jenkins is applied on the server.<br/>
                    Now all kind of build will be triggered by git push and no more SSH connect and manual build command will be used<br/>
                    <br/>
                    * Update contents (21-01-23):<br/>
                    Now Airflow(ETL) also crawls and processes more information about COVID19.<br/>
                    The raw data is pulled from OWID github (COVID specific) and processed/organised for vaccination, testing information.<br/>
                    In addition, p-score(mortality compared to ordinary days) and external information such as smoker rate are also processed.<br/>
                    This DAG is now working and storing data on database.<br/>
                    <br/>
                    * Update contents (11-21):<br/>
                    BUG FIX: There was an issue that dashboard data collector not rounding accuracy on 2nd decimal point.<br/>
                    By filling null values to 0 now the table will round on proper decimal point.<br/>
                    <br/>
                    * Update contents (11-17):<br/>
                    Accuracy was calculated with simple <a href="https://en.wikipedia.org/wiki/Relative_change_and_difference">Percentage Error</a> but as it shows huge error rate when actual value is small even the difference is small.<br/>
                    Therefore, accuracy of ARIMA model is now calculated by <a href="https://en.wikipedia.org/wiki/Symmetric_mean_absolute_percentage_error">sMAPE(symmetric Mean Absolute Percentage Error)</a><br/>
                    Both Post-processor in airflow and back-end with flask are updated.<br/>
                    <br/>
                    <b>As post-processor requires at least 7 days predicted data, sometime the accuracy may fluctuate.</b><br/>
                    <b>Furthermore, ARIMA model is not sensitive with external parameters. Therefore, country or region with demonstration or elections that can cause increase of human activity may lead to inaccuracy of ARIMA model.</b><br/>
                    <b>This issue will be resolved in future by collecting news information and other region related data.</b><br/>
                    <br/>
                    <br/>
                    * Update contents (11-07):<br/>
                    Now post-processor is updated. The post-processor predicts confirmed cases for both UK and Global for 7 days.<br/>
                    In addition, the accuracy of prediction model (ARIMA model) for the data will be provided.<br/>

                </span><br/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import navBar from "@/components/navBar";
    import mainPageProcessorTable from "@/components/covidStatusGraph/mainPageProcessorTable";

    export default {
        name: 'Home',
        components:{
            navBar,
            mainPageProcessorTable
        },
        data () {
            return {
                menuVisible: false,

            }
        },
        computed: {

        },
        beforeMount() {

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