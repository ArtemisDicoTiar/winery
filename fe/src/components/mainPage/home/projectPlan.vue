<template>
    <div id="projectPlan" class="projectPlan">
        <div class="row">
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Plan 1</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Plan 2</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Plan 3</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'projectPlan',
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .projectPlan{
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .projectPlanContainer{

        border-style: solid;
        border-width: 2px;
        border-color: #42b983;
    }
</style>