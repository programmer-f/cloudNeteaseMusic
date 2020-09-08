<template>
  <div>recommend</div>
</template>

<script>
  import {getBanner} from "../api/index";

  export default {
        name: "Recommend",
    created() {
          getBanner()
            .then(function (data) {
            console.log(data);
          })
            .catch((err)=>{
              console.log(err);
            })
    }
  }
</script>

<style scoped>

</style>
