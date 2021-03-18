<template>
    <div id="navBar">
        <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-subheading">
                <md-icon>coronavirus</md-icon>
                Navigation
            </span>
        </md-toolbar>

        <div class="list">
            <md-list>
                <md-list-item to="/" exact>
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">Home</span>
                </md-list-item>

                <md-list-item to="/dashboard" exact :disabled="true">
                    <md-icon>dashboard</md-icon>
                    <span class="md-list-item-text">Dashboard</span>
                </md-list-item>

            </md-list>

            <md-list :md-expand-single="true" md-dense>
                <md-list-item md-expand>
                    <md-icon>public</md-icon>
                    <span class="md-list-item-text">Global Info</span>

                    <md-list slot="md-expand">
                        <md-list-item to="/global/dashboard">
                            <md-icon>dashboard</md-icon>
                            <span class="md-list-item-text">global dashboard</span>
                        </md-list-item>

                        <md-list-item to="/global/cumulative">
                            <md-icon>trending_up</md-icon>
                            <span class="md-list-item-text">global cumulative</span>
                        </md-list-item>

                        <md-list-item to="/global/new">
                            <md-icon>stacked_line_chart</md-icon>
                            <span class="md-list-item-text">global new</span>
                        </md-list-item>
                    </md-list>
                </md-list-item>

                <md-list-item md-expand>
                    <md-icon>whatshot</md-icon>
                    <span class="md-list-item-text">UK Info</span>

                    <md-list slot="md-expand">
                        <md-list-item to="/uk/dashboard">
                            <md-icon>dashboard</md-icon>
                            <span class="md-list-item-text">UK dashboard</span>
                        </md-list-item>
                        <md-list-item to="/uk/graph">
                            <md-icon>timeline</md-icon>
                            <span class="md-list-item-text">UK graph</span>
                        </md-list-item>
                    </md-list>
                </md-list-item>

                <md-list-item md-expand>
                    <md-icon>schema</md-icon>
                    <span class="md-list-item-text">Extra Info</span>

                    <md-list slot="md-expand">
                        <md-list-item to="/post/vaccination">
                            <md-icon>healing</md-icon>
                            <span class="md-list-item-text">Vaccination</span>
                        </md-list-item>

                        <md-list-item to="/post/testing">
                            <md-icon>biotech</md-icon>
                            <span class="md-list-item-text">Testing</span>
                        </md-list-item>

                        <md-list-item to="/post/mortality">
                            <md-icon>no_accounts</md-icon>
                            <span class="md-list-item-text">Mortality</span>
                        </md-list-item>

                        <md-list-item to="/post/region" :disabled="true">
                            <md-icon>map</md-icon>
                            <span class="md-list-item-text">Region Info</span>
                        </md-list-item>

                        <md-list-item to="/post/mobility">
                            <md-icon>directions_run</md-icon>
                            <span class="md-list-item-text">Mobility Info</span>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>



            <md-list>
                <md-list-item href="https://corona-live.com/">
                    <md-icon>link</md-icon>
                    <span class="md-list-item-text">South Korea<br/>Information</span>
                </md-list-item>
                <md-list-item href="https://nextstrain.org/ncov/global">
                    <md-icon>track_changes</md-icon>
                    <span class="md-list-item-text">Virus Mutation<br/>Reports</span>
                </md-list-item>
                <md-list-item to="/about">
                    <md-icon>new_releases</md-icon>
                    <span class="md-list-item-text">Producer Info<br/>DataSource Reference</span>
                </md-list-item>
            </md-list>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'navBar',
        data () {
            return {
                menuVisible: false,
            }
        },


    }
</script>

<style scoped>

</style>