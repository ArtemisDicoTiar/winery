<template>
    <div id="Home" class="page-container">
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">COVID - 19 Analysis Server Status / Update History</span>
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

                <md-divider/>
                <br/>
                <mainPageProcessorTable/>

                <br/>

                <md-divider/>
                <br/>
                <span class="md-title">
                    <b>Update Lists</b>
                </span><br/><br/>
                <md-steppers md-vertical>
                    <md-step id="first" md-label="Future Updates" md-active-step="true" md-description="Planned features illustrated on this section">
                        <md-steppers md-vertical>
                            <md-step id="second" md-label="API Usage Simplification" md-description="[Front-End Maintenance]">
                                Currently Two API servers are called for this page: Flask server (old), Django server (new).<br/>
                                Both server provides same data but with slightly different format.<br/>
                                To make project service and code more manageable, Flask server will not going to be used for this front-end.<br/>
                                In addition, two API servers refers different data base as new simplified airflow jobs are built for Django server database.<br/>
                                Because simplified job finishes faster than old one, Django server prints recent data faster than Flask server.<br/>
                                After migration to Django is finished, Flask server will be deprecated and closed.<br/>
                                Moreover, airflow jobs for Flask server database will also be stopped.<br/>
                            </md-step>

                            <md-step id="third" md-label="Correlation with Medical Information, Public Health Information" md-description="[Recover from ver1.]">
                                This correlation analysis WAS on version1 of this project but removed on version2 due to backend server and database have been updated for better organisation.<br/>
                                This correlation analysis is planning to be on this web-page again due by this Spring (2021).<br/>
                            </md-step>

                            <md-step id="fifth" md-label="Better prediction using ARIMA and deep-learning" md-description="[NEW]">
                                ARIMA model forecast shows the range for prediction. In this web-page, it uses mid-point of 95% of confidence range.<br/>
                                Deep-learning model with other external information such as news reports related to human activities,
                                public health information will make the prediction more accurate in the range of 95% confidence range.<br/>
                                This enhancement is planned due by late Summer (2021).
                            </md-step>

                        </md-steppers>
                    </md-step>

                    <md-step id="second" md-label="Front-End Update History" md-description="LAST UPDATE: 2021-07-01">
                        <md-steppers md-vertical>
                            <md-step md-label="New Dashboard update! ByeBye old main page~" md-description="(2021-07-01)"><p>
                                New COVID related data Dashboard is implemented.<br/>
                                The data visualisation on previous built pages are detailed but hard to understand and hard to reach.<br/>
                                Therefore, the new dashboard page is implemented.<br/>
                                New region search bar provides current location search function.<br/>
                                The dashboard shows all important information on single page as card with data and graph card.<br/>
                                After building new dashboard, the main start page is changed to this new dashboard.<br/>
                                The previous main page shows server status and crawler status is now moved to '/updates'<br/>
                                Although new dashboard is implemented, the pages built previous are going to be remained.<br/>
                                The planned maintenance for previous graph pages is api usage from flask (previous) to django (new) as django's endpoint crawl data faster.<br/>
                            </p></md-step>

                            <md-step md-label="Correlation Data analysis Backup 1" md-description="(2021-04-24)"><p>
                                Correlation information backup process begins.<br/>
                                The correlation with world's statistics is now added to new page (visible on tabs).<br/>
                                However, the automation is delayed due to API server's code refactoring.<br/>
                                Next data analysis page update will be done with public health data as planned on future updates.<br/>
                            </p></md-step>

                            <md-step md-label="Mortality/p-score graph page" md-description="(2021-03-18)"><p>
                                People's Mortality information collected by OWID is now available to view..
                                As the data have some weekly pattern, 7 days moving average selection is also provided.
                            </p></md-step>

                            <md-step md-label="Google Mobility graph page" md-description="(2021-03-17)"><p>
                                People's Mobility information collected by Google is now available to view as graph.
                                As the data have some weekly/ monthly pattern, 7/14/28 days moving average selection is also provided.
                            </p></md-step>

                            <md-step md-label="COVID-19 Testing Information Dashboard" md-description="(2021-03-10)"><p>
                                Now COVID-19 Testing Information Dashboard is added.
                                The dashboard can search every countries.
                                Short-term positive rate is also provided with {new, cumulative} test counts.
                            </p></md-step>

                            <md-step md-label="Home page update: update history visual update" md-description="(2021-03-11)"><p>
                                    Update list was too verbose. Now the planned update and update history both are organised into stepper so user can see detail when it is selected.
                            </p></md-step>

                            <md-step md-label="Vaccination Information Dashboard" md-description="(2021-03-10)"><p>
                                    Now vaccination Information Dashboard is added.
                                    The dashboard can search every countries and vaccination count in {cumulative, new} and {1st&2nd dose, only 2nd dose} data can be viewed.
                            </p></md-step>

                            <md-step md-label="OWID Crawler status added." md-description="(2021-02-11)">
                                Main page now shows OWID and Google Mobility information crawler status.
                            </md-step>

                            <md-step md-label="Virus mutation page link added." md-description="(2020-01-11)"><p>
                                Virus mutation web-page link added.<br/>
                                Future project plan list added.<br/>
                            </p></md-step>

                            <md-step md-label="Crawler/Processor (Airflow ETL) status visible" md-description="(2020-12-04)"><p>
                                Now user can see whether the crawler or processor is running or finished for today's data.<br/>
                            </p></md-step>

                            <md-step md-label="Last data update status visible" md-description="(2020-12-01)"><p>
                                Now each page shows when the data have been updated and the current status of data processing.<br/>
                            </p></md-step>

                            <md-step md-label="Dashboard with cases forecast and accuracy added" md-description="(2020-11-18)"><p>
                                Now dashboard is available. Dashboard contains today's COVID cases.<br/>
                                Furthermore, it provides prediction of confirmed cases. Predicted values for tomorrow and 7 days later will be provided.<br/>
                                The dashboard is produced both for Global info and UK info.
                            </p></md-step>
                        </md-steppers>
                    </md-step>

                    <md-step id="third" md-label="Back-End Update History" md-description="LAST UPDATE: 2021-07-14">
                        <md-steppers md-vertical>
                            <md-step md-label="Data collector update" md-description="(2021-07-14)"><p>
                                Some countries' data were collected in separated rows.<br/>
                                The ETL logic is updated and now Japan, USA and some other countries will now be crawled properly.
                            </p></md-step>
                            <md-step md-label="New API Server built with Django Rest Framework" md-description="(2021-07-01)"><p>
                                Previous API endpoint was built with Flask. <br/>
                                The increase of endpoint led to increase of difficulty of API server code management.<br/>
                                Now the endpoints are implemented more clear and simple.<br/>
                                The new API endpoint can be found <a href="http://johnspring.eu.ngrok.io/api/docs/">here</a>.
                            </p></md-step>
                            <md-step md-label="Vaccination, testing, mortality and mobility information endpoint added on API" md-description="(2021-03-08)"><p>
                                Now api server provides vaccination, testing and p_score information based on crawled data from OWID.<br/>
                                regional information is also provided based on OWID data.<br/>
                                Furthermore, mobility information is provided with crawled data from Google-Mobility-report.<br/>
                                As the api endpoints are not clearly organised, all the endpoints will not be provided to public until api server migrates to 'SpringBoot (with Scala)'.<br/>
                                The front-end page addition will be done shortly by using this updated apis.<br/>
                            </p></md-step>

                            <md-step md-label="Airflow ETL upgraded (*Security enhanced)" md-description="(2021-02-11)"><p>
                                Airflow ETL is updated to 1.10.14 ver. Although 2.0.1 is tried, as there are some conflicts to upgrade, airflow update is stopped to 1.10.14.<br/>
                                Airflow Security is now applied so other than admin cannot access to DAGs.<br/>
                            </p></md-step>

                            <md-step md-label="Mobility information from Google are now being crawled daily." md-description="(2021-02-11)"><p>
                                Now Mobility data during COVID-19 Pandemic period is stored to DB via Google Mobility information.<br/>
                            </p></md-step>

                            <md-step md-label="CI/CD: Jenkins installed" md-description="(2021-01-26)">
                                Jenkins is applied on the server.<br/>
                                Now all kind of build will be triggered by git push and no more SSH connect and manual build command will be used<br/>
                            </md-step>

                            <md-step md-label="COVID19 related data now crawled daily from OWID github" md-description="(2020-01-23)"><p>
                                Now Airflow(ETL) also crawls and processes more information about COVID19.<br/>
                                The raw data is pulled from OWID github (COVID specific) and processed/organised for vaccination, testing information.<br/>
                                In addition, p-score(mortality compared to ordinary days) and external information such as smoker rate are also processed.<br/>
                                This DAG is now working and storing data on database.<br/>
                            </p></md-step>

                            <md-step md-label="BUG FIX (dashboard data collector): forecast accuracy rounding on 2nd decimal point" md-description="(2020-11-21)"><p>
                                There was an issue that dashboard data collector not rounding accuracy on 2nd decimal point.<br/>
                                By filling null values to 0 now the table will round on proper decimal point.<br/>
                            </p></md-step>

                            <md-step md-label="ARIMA model's forecast accuracy added" md-description="(2020-11-17)"><p>
                                Accuracy was calculated with simple <a href="https://en.wikipedia.org/wiki/Relative_change_and_difference">Percentage Error</a> but as it shows huge error rate when actual value is small even the difference is small.<br/>
                                Therefore, accuracy of ARIMA model is now calculated by <a href="https://en.wikipedia.org/wiki/Symmetric_mean_absolute_percentage_error">sMAPE(symmetric Mean Absolute Percentage Error)</a><br/>
                                Both Post-processor in airflow and back-end with flask are updated.<br/>
                                <br/>
                                <b>As post-processor requires at least 7 days predicted data, sometime the accuracy may fluctuate.</b><br/>
                                <b>Furthermore, ARIMA model is not sensitive with external parameters. Therefore, country or region with demonstration or elections that can cause increase of human activity may lead to inaccuracy of ARIMA model.</b><br/>
                                <b>This issue will be resolved in future by collecting news information and other region related data.</b><br/>
                            </p></md-step>

                            <md-step md-label="ARIMA model added on processor for case forecast" md-description="(2020-11-07)"><p>
                                Now post-processor is updated. The post-processor predicts confirmed cases for both UK and Global for 7 days.<br/>
                                In addition, the accuracy of prediction model (ARIMA model) for the data will be provided.<br/>
                            </p></md-step>
                        </md-steppers>
                    </md-step>
                </md-steppers>
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