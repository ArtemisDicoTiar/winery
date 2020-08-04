<template>
    <div id="app" class="app">

        <div class="container-fluid">
            <div class="row topRow">
                <div class="col-md-4 smallNavBarComp">
                    <SmallNavBar>

                    </SmallNavBar>
                </div>
            </div>

            <div class="row body">
                <div class="col-md-4 leftNavBarComp">
                    <LeftNavBar/>
                </div>

                <div class="col-md-8 mainBody">
                    <router-view/>
                </div>
            </div>

        </div>


        <footer class="container-fluid footer">
            <p>Footer Text</p>
        </footer>
    </div>
</template>

<script>
    import LeftNavBar from "@/components/leftNavBar";
    import SmallNavBar from "@/components/smallNavBar";
    export default {
        name: 'App',
        components: {
            SmallNavBar,
            LeftNavBar

        }
    }
</script>

<style>
    .app{
        background: #e7eaee;
    }
    .smallNavBarComp{

    }
    .leftNavBarComp{
        background: #e7eaee;
        border-style: solid;
        border-width: 2px;
        border-bottom-width: 0;
        border-left-width: 0;
        border-color: gray;
    }
    .mainBody{
        background: #e7eaee;
    }
    .footer {
        background: gray;
        border-radius: 5px;
    }
</style>
