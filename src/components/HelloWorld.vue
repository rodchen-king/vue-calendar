<template>
  <div class="main">
    <vue-calendar
      :week-label-index="weekLabelIndex"
      @dayClick="dayClick" />
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      weekLabelIndex: 0
    }
  },
  methods: {
    dayClick (dayItem) {
      // Todo customer
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    width: 70%;
  }
</style>
