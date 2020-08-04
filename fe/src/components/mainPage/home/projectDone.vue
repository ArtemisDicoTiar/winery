<template>
    <div id="projectDone" class="projectDone">
        <div class="row">
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 1</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 2</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 3</h3>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 4</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 5</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="projectPlanContainer">
                    <h3>project Done 6</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'projectDone',
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .projectDone{
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .projectPlanContainer{

        border-style: solid;
        border-width: 2px;
        border-color: #42b983;
    }
</style>