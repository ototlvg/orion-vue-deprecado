<template>
  <div class="finished">
    <div class="finished__wrapper">
        <div class="finished__wrapper__title">
          <h2>Encuesta finalizada</h2>

        </div>
        <div class="finished__wrapper__button">
          <button class="uk-button uk-button-danger" @click="logout">Cerrar sesion</button>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Finished',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getFilter(){
      console.log(this.$store.getters.getFilter)
      
    },
    logout(){
      this.$router.push({ name: 'logout' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/variables.scss';


.finished{
    width: 100%;
    background-color: $background;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em;
    &__wrapper{
      padding: 2em;
      background-color: white;
      box-shadow: 0 6px 6px rgba(0,0,0,0.2);
      height: 500px;
      display: flex;
      align-content: center;
      justify-content: center;
      flex-wrap: wrap;
      @media (min-width: $large){
        height: 400px;

      }
      &__title{
        width: 100%;
        text-align: center;

      }

      &__button{
        display: flex;
        justify-content: center;
      }
    }
}




</style>
