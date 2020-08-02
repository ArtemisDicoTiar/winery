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
                <div class="col-md-5 leftNavBarComp">
                    <LeftNavBar>

                    </LeftNavBar>
                </div>

                <div class="col-md-7 mainBody">
                    going to be routed<br/>
                    <div class="row">
                        <div class="col-md-12">
                            project done
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            project on progress
                        </div>
                        <div class="col-md-4">
                            daily post(wiggle)
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            project planing
                        </div>
                    </div>


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
        background: darksalmon;
        border: #42b983;
        border-radius: 10px;
    }
    .footer {
        background: gray;
        border-radius: 10px;
    }
</style>
