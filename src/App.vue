<template>
    <div id="app">
        <nav class="uk-navbar-container uk-navbar" uk-navbar v-bind:class="{ disabled: isDisabled }">
            <div class="uk-navbar-orion-mobil">
                <span @click="toggle" class="uk-margin-small-right uk-navbar-orion-mobil__burguer" uk-icon="icon: menu; ratio: 2"></span>
                <h1 class="uk-navbar-orion-mobil__title">Orion</h1>
            </div>

            <div class="uk-navbar-left uk-navbar-left-orion">
                <a href="" class="uk-navbar-item uk-logo">Orion</a>
            </div>

            <div class="uk-navbar-right uk-navbar-right-orion">
                <ul class="uk-navbar-nav">
                    <li class="uk"><router-link :to="{ name: 'home' }">INICIO</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'login' }">INICIAR SESION</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'register' }">REGISTRARSE</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'logout' }">Cerrar sesion</router-link></li>
                    <li><a href=""></a></li>
                </ul>
            </div>
        </nav>
        <a href="#my-id" uk-toggle></a>

        <!-- This is the off-canvas -->
        <div id="my-id" uk-offcanvas="mode: push; overlay: true">
            <div class="uk-offcanvas-bar">
                <button class="uk-offcanvas-close" type="button" uk-close></button>

            </div>
        </div>

        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// import Home from './components/Home/Home'

export default {
    name: "App",
    components: {
    // HelloWorld,
    // Home
    },
    created(){
        this.setDisabled()
    },
    data(){
        return {
        }
    },
    computed: {
        isDisabled(){
            return this.$store.getters.getDisabled
        }
    },
    methods: {
        toggle(){
            UIkit.offcanvas(document.getElementById('my-id')).show();
        },
        setDisabled(){
            this.$store.commit('setDisabled', false)
        }
    },
    watch: {
        $route(to, from) {
           this.setDisabled()
        }
    },
};
</script>

<style lang="scss">

@import 'scss/variables.scss';

#app {
    width: 100% !important;
    height: 100vh;
    // background: purple;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    // flex-wrap: wrap;
}

nav{
    // width: 100% !important;
}

.uk-navbar-right-orion,.uk-navbar-left-orion{
    display: none; // !important antes
    @media (min-width: $large) {
        display: block; // !important antes
        background-color: none !important;
    }
}

.uk-navbar-orion-mobil{
    width: 100%;
    display: flex;
    padding: $padding;
    align-items: center;
    justify-content: flex-start;
    &__title{
        margin: 0;
    }
    &__burguer{
        justify-self: flex-start
    }
    @media (min-width: $large) {
        display: none;
    }

}

.disabled{
    display: none; // !important antes
}

main.main{
    width: 100%;
    flex: 1 1 auto;
    // background: red;
    // height: 500px;
    // padding: $padding;
    // background-color: blue;
    display: flex;
}

</style>
