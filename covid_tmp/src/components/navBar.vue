<template>
    <div id="navBar">
        <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-subheading">
                    Navigation
                </span>
        </md-toolbar>

        <md-list>
            <md-list-item to="/">
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item to="/global/cumulative">
                <md-icon>send</md-icon>
                <span class="md-list-item-text">global cumulative</span>
            </md-list-item>

            <md-list-item to="/global/new">
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">global new</span>
            </md-list-item>

            <md-list-item to="/uk">
                <md-icon>error</md-icon>
                <span class="md-list-item-text">UK data by Region</span>
            </md-list-item>
        </md-list>
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