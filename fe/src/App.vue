<template>
  <div id="app">

    <div class="container-fluid">
      <div class="row topRow">
        <div class="col-md-4 smallNavBar">
          <div class="row">
            <div class="col-md-4">
              <span>language change</span>
            </div>
            <div class="col-md-4">
              <span>setting</span>
            </div>
            <div class="col-md-4">
              <span>etc</span>
            </div>

          </div>

        </div>
        <div class="col-md-8 emptySpace">
          empty line~~~~~~~~~~~~~~~~~~~~
        </div>
      </div>

      <div class="row body">
        <div class="col-md-4 leftNavBar">
          <LeftNavBar>

          </LeftNavBar>
        </div>

        <div class="col-md-8 mainBody">
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
export default {
  name: 'App',
  components: {
    LeftNavBar

  }
}
</script>

<style>
  .smallNavBar{
    background: darkseagreen;
    border-radius: 10px;
  }
  .leftNavBar{
    background: burlywood;
    border-radius: 20px;
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
