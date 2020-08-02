<template>
    <div class="leftNavBar">
        <div class="row name">
            John<br/>
            Jongyoon Kim
        </div>
        <div class="row titleName">
            Bachelor of<br/>
            Electrical and Electronics Engineering
        </div>

        <div class="row contacts">

            <div class="col-md-3">
                <div class="row contactIcons">
                    <div class="col-md-2">
                        <a href="https://github.com/ArtemisDicoTiar">
                            <img src="../images/mono/github.png" width="25" height="25">
                        </a>
                    </div>
                    <div class="col-md-2">
                        <a href="https://www.linkedin.com/in/jongyoon-kim-9a1941143/">
                            <img src="../images/mono/linkedin.webp" width="25" height="25">
                        </a>
                    </div>
                    <div class="col-md-2">
                        <a href="https://www.instagram.com/john_yoooon/">
                            <img src="../images/mono/instagram.png" width="25" height="25">
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-5 contactsEmail">
                <a href="mailto:mw18074@bristol.ac.uk">
                    mw18074@bristol.ac.uk
                </a>

            </div>
            <div class="col-md-4">
                +82 10-7530-9365
            </div>

        </div>

        <div class="menuButtons">
            <div class="row menuHome">
                <button type="button" class="btn btn-link">
                    * Home
                </button>
            </div>
            <div class="row aboutCv">
                <button type="button" class="btn btn-link">
                    * About / CV
                </button>
            </div>
            <div class="row projectDiary">
                <button type="button" class="btn btn-link">
                    * Project Diary
                </button>
            </div>
            <div class="row lifeDiary">
                <button type="button" class="btn btn-link">
                    * Life Diary
                </button>
            </div>
        </div>

        <div class="row gifCharacter">
            <img src="../images/gif/hexagon.gif" width="150" height="150">
        </div>
    </div>


</template>

<script>
    export default {
        name: 'leftNavBar',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    .leftNavBar{
        margin-top: 20px;
        margin-left: 15px;
        margin-bottom: 50px;
    }
    .name{
        font-family: "Times New Roman", times, serif;
        font-size: 45pt;
        font-weight: bolder;
        margin-bottom: 10px;
    }
    .titleName{
        font-family: "Times New Roman", times, serif;
        font-size: 20pt;
        font-style: italic;
        font-weight: normal;
    }
    .contacts{
        font-family: "Times New Roman", times, serif;
        font-size: 13pt;
        font-weight: initial;
        margin-top: 40px;
    }
    .contactIcons{
        padding: 0;
    }
    .menuButtons{
        margin-top: 30px;
    }
    .btn{
        font-family: "Times New Roman", times, serif;
        font-size: 15pt;
        color: coral;
        font-style: italic;
        font-weight: initial;
    }
</style>