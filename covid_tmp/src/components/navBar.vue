<template>
    <div id="navBar">
        <md-app-content>
            <div id="pageSelection">
                <md-tabs>
                    <md-tab id="tab-home" md-label="global cumulative cases" md-icon="home" to="/global/cumulative"></md-tab>
                    <md-tab id="tab-pages" md-label="global new cases" md-icon="pages" to="/global/new"></md-tab>
                    <md-tab id="tab-posts" md-label="UK cumulative cases" md-icon="/assets/icon-whatshot.svg" to="/uk/cumulative"></md-tab>
                    <md-tab id="tab-favorites" md-label="UK new cases" md-icon="favorite" to="/uk/new"></md-tab>
                </md-tabs>

            </div>
        </md-app-content>
    </div>
</template>

<script>
    export default {
        name: 'navigation',
        data () {

        }
    }
</script>

<style>

</style>