<template>
    <div id="dailyPost">
        <div class="row">
            <div class="col-md-12 diaryContainer">
                <h1>Diary Title 1</h1>
                <p>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 diaryContainer">
                <h1>Diary Title 2</h1>
                <p>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 diaryContainerLast">
                <h1>Diary Title 3</h1>
                <p>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                    contents~~~~~~~~~~~~~<br/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dailyPost',
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .diaryContainer{
        border-style: solid;
        border-width: 2px;
        border-color: coral;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
    }
    .diaryContainerLast{

    }
</style>