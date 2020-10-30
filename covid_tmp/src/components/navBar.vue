<template>
    <div id="navBar">
        <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-subheading">
                <md-icon>coronavirus</md-icon>
                Navigation
            </span>
        </md-toolbar>

        <div class="list">
            <md-list :md-expand-single="expandSingle">
                <md-list-item to="/" exact>
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">Home</span>
                </md-list-item>

                <md-list-item md-expand :md-expanded.sync="expandNews">
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

                <md-list-item to="/error">
                    <md-icon>new_releases</md-icon>
                    <span class="md-list-item-text">Producer Info</span>
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