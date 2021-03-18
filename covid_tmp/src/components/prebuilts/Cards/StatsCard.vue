<template>
  <md-card class="md-card-dashboard" style="background: #333333">
    <md-card-header class="md-card-header-stats" :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: "stats-card",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  }
};
</script>
