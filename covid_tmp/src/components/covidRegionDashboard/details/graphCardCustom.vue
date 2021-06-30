<template>
    <div
            class="md-layout-item md-xsmall-size-100 md-medium-size-50 md-size-25"
    >
        <chart-card
                :chart-data="graphData"
                :chart-options="graphOptions"
                :chart-type="graphType"
                :data-background-color="cardColor"
        >
            <template slot="content">
                <h4 class="title">{{ title }}</h4>
                <p class="category">
                    {{ details }}
                </p>
            </template>

            <template slot="footer">
                <div class="stats">
                    <md-icon>update</md-icon>
                    Last updated: {{ updated }}
                </div>
                <md-button class="md-fab md-dense md-accent" style="min-width: 0%">
                    <md-tooltip md-direction="buttom"><span class="md-subheading">Details</span></md-tooltip>
                    <md-icon class="md-size-1x" style="margin-top: 30%">dashboard</md-icon>
                </md-button>
            </template>
        </chart-card>

    </div>
</template>
<script>
    import ChartCard from "@/components/prebuilts/Cards/ChartCard";

    export default {
        components:{
            ChartCard
        },
        props:{
            title: {
                type: String,
                default: "title props needed"
            },
            details: {
                type: String,
                default: null
            },
            updated: {
                type: String,
                default: null
            },
            cardColor: {
                type: String,
                default: null
            },
            graphType: {
                type: String,
                default: 'line'
            },
            graphData:{
                type: Object,
                default: null,
            },
            graphOptions:{
                type: Object,
                default: null,
            },

        },
        data() {
            return{

            }
        }
    }
</script>
<style>

</style>
