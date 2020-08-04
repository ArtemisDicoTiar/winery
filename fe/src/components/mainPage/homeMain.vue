<template>
    <div class="homeMain">
        <div class="row projectDoneComp">
            <div class="col-md-12">
                <projectDone/>
            </div>
        </div>
        <div class="row diary">
            <div class="col-md-8 projectProgress">
                <projectProgress/>
            </div>
            <div class="col-md-4 dailyDiary">
                <dailyPost/>
            </div>
        </div>
        <div class="row projectPlanning">
            <div class="col-md-12">
                <projectPlan/>
            </div>
        </div>
    </div>
</template>

<script>
    import projectDone from "@/components/mainPage/home/projectDone";
    import projectProgress from "@/components/mainPage/home/projectProgress";
    import dailyPost from "@/components/mainPage/home/dailyPost";
    import projectPlan from "@/components/mainPage/home/projectPlan";

    export default {
        name: 'homeMain',
        components: {
            projectDone,
            projectProgress,
            dailyPost,
            projectPlan
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .homeMain{
        font-family: "Ubuntu Mono derivative Powerline", monospace;
    }
    .projectDoneComp{
        border-style: solid;
        border-width: 2px;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        border-color: gray;
    }
    .projectProgress{
        border-style: solid;
        border-width: 2px;
        border-top-width: 0;
        border-left-width: 0;
        border-color: gray;
    }
    .dailyDiary{
        border-style: solid;
        border-width: 2px;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        border-color: gray;
    }
    .projectPlanning{

    }
</style>