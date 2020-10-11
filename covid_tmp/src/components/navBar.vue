<template>
    <div id="navBar">
        <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-subheading">
                    Navigation
                </span>
        </md-toolbar>

        <md-list>
            <md-list-item>
                <md-icon>send</md-icon>
                <span class="md-list-item-text">global cumulative</span>
            </md-list-item>

            <md-list-item>
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">global new</span>
            </md-list-item>

            <md-list-item>
                <md-icon>error</md-icon>
                <span class="md-list-item-text">UK cumulative</span>
            </md-list-item>

            <md-list-item>
                <md-icon>move_to_inbox</md-icon>
                <span class="md-list-item-text">UK new</span>
            </md-list-item>
        </md-list>
    </div>

</template>

<script>
    export default {
        name: 'navBar',
        data () {
            return {

            }
        },


    }
</script>

<style>

</style>