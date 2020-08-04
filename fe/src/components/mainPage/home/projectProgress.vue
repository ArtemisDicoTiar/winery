<template>
    <div id="projectProgress">
        <div class="row">
            <div class="col-md-12 progressContainer">
                <h1>project on progress Title 1</h1>
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
            <div class="col-md-12 progressContainer">
                <h1>project on progress Title 2</h1>
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
            <div class="col-md-12 progressContainerLast">
                <h1>project on progress Title 3</h1>
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
        name: 'projectProgress',
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .progressContainer{
        border-style: solid;
        border-width: 2px;
        border-color: coral;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
    }
    .progressContainerLast{

    }
</style>