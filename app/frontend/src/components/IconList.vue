<template>
  <div id="icon-list-container" class="row center">
    <div id="icon-list" class="row space-evenly">
      <a href="https://www.linkedin.com/in/codyuhi/"
        ><i :class="'fa fa-linkedin ' + color "></i
      ></a>
      <a href="https://www.instagram.com/uhicody/"
        ><i :class="'fa fa-instagram ' + color"></i
      ></a>
      <a href="https://twitter.com/UhiCode"
        ><i :class="'fa fa-twitter ' + color"></i
      ></a>
      <a href="https://github.com/codyuhi"
        ><i :class="'fa fa-github ' + color"></i
      ></a>
    </div>
  </div>
</template>
<script>
export default {
  name: "IconList",
  props: {
    color: String,
  },
};
</script>
<style scoped>
#icon-list-container {
  width: 100vw;
}

#icon-list {
  font-size: 25px;
  flex-wrap: wrap;
  width: 40vw;
  padding: 15px;
}

i {
  color: var(--bluebell);
}

i:hover {
    color: var(--beaublue) !important;
}

@media only screen and (max-width: 344px) {
  #icon-list {
    font-size: 15px;
  }
}
</style>