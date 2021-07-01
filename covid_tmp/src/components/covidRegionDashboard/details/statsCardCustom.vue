<template>
    <div
            class="md-layout-item md-xsmall-size-100 md-medium-size-50 md-size-25"
    >
        <stats-card :data-background-color="cardColor">
            <template slot="header">
                <md-icon v-if="topIcon.includes('fas') || topIcon.includes('fab')" :class="topIcon"></md-icon>
                <md-icon v-else>{{ topIcon }}</md-icon>

            </template>

            <template slot="content">
                <p class="category">{{ title }}</p>
                <h3 class="title">{{ details }}</h3>
                <slot name="extra"></slot>
            </template>

            <template slot="footer">
                <div class="stats">
                    <md-icon>{{ footerIcon }}</md-icon>
                    Last updated: {{ footerContent }}<br/>
                </div>
            </template>
        </stats-card>
    </div>
</template>
<script>
    import statsCard from "@/components/prebuilts/Cards/StatsCard";

    export default {
        components:{
            statsCard
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
            cardColor: {
                type: String,
                default: null
            },
            topIcon: {
                type: String,
                default: ''
            },
            footerIcon: {
                type: String,
                default: ''
            },
            footerContent: {
                type: String,
                default: null
            },
            extraFooter: {
                type: String,
                default: null
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
