<template>
    <div id="app">
        <nav class="uk-navbar-container uk-navbar" uk-navbar v-bind:class="{ disabled: isDisabled }">
            <div class="uk-navbar-orion-mobil">
                <span @click="toggle" class="uk-margin-small-right uk-navbar-orion-mobil__burguer" uk-icon="icon: menu; ratio: 2"></span>
                <h1 class="uk-navbar-orion-mobil__title">Orion</h1>
                <div class="level">
                    <span class="uk-margin-small-right uk-navbar-orion-mobil__burguer" uk-icon="icon: menu; ratio: 2"></span>
                </div>
            </div>

            <div class="uk-navbar-left uk-navbar-left-orion" @click="goToHome">
                <!-- <a v-on:click.stop.prevent="goToHome" href="" class="uk-navbar-item uk-logo">Orion</a> -->
                <span href="" class="uk-navbar-item uk-logo">Orion</span>
            </div>


            <div class="uk-navbar-right uk-navbar-right-orion">
                <ul class="uk-navbar-nav">
                    <!-- <li v-if="loggin" class="uk"><router-link :to="{ name: 'home' }">INICIO</router-link></li>
                    <li v-if="visitor" class="uk"><router-link :to="{ name: 'login' }">INICIAR SESION</router-link></li>
                    <li v-if="visitor" class="uk"><router-link :to="{ name: 'register' }">REGISTRARSE</router-link></li>
                    <li v-if="loggin" class="uk"><router-link :to="{ name: 'logout' }">Cerrar sesion</router-link></li>
                    <li><a href=""></a></li> -->
                    <li class="uk"><router-link :to="{ name: 'home' }">INICIO</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'login' }">INICIAR SESION</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'register' }">REGISTRARSE</router-link></li>
                    <li class="uk"><router-link :to="{ name: 'logout' }">Cerrar sesion</router-link></li>
                    <li><a href=""></a></li>
                </ul>
            </div>
        </nav>
        
        <aside class="aside" :class="{ show: show }">
            <div v-for="(p,index) in personal" :key=index class="aside__personal-container">
                <div class="aside__personal-container__icon-container">
                    <span uk-icon="icon: user; ratio: 3" class="aside__personal-container__icon-container__icon"></span>

                </div>
                <h2 class="aside__personal-container__name">{{p.name}} {{p.apaterno}} {{p.amaterno}}</h2>
            </div>

            <ul class="aside__ul" @click="toggle">
                <!-- <li v-if="loggin" class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'home' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: home"></span>
                        <p class="aside__ul__li__link__title">Inicio</p>   
                    </router-link>
                </li>
                <li v-if="visitor" class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'login' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: home"></span>
                        <p class="aside__ul__li__link__title">Iniciar sesion</p>
                    </router-link>
                </li>
                <li v-if="visitor" class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'register' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: file-edit"></span>
                        <p class="aside__ul__li__link__title">Registrarse</p>
                    </router-link>
                </li>
                <li v-if="loggin" class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'logout' }">
                        <span uk-icon="icon: sign-out" class="aside__ul__li__link__icon"></span>
                        <p class="aside__ul__li__link__title">Cerrar sesion</p>
                    </router-link>
                </li> -->
                <li class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'home' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: home"></span>
                        <p class="aside__ul__li__link__title">Inicio</p>   
                    </router-link>
                </li>
                <li class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'login' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: home"></span>
                        <p class="aside__ul__li__link__title">Iniciar sesion</p>
                    </router-link>
                </li>
                <li class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'register' }">
                        <span class="aside__ul__li__link__icon" uk-icon="icon: file-edit"></span>
                        <p class="aside__ul__li__link__title">Registrarse</p>
                    </router-link>
                </li>
                <li class="aside__ul__li">
                    <router-link class="aside__ul__li__link" :to="{ name: 'logout' }">
                        <span uk-icon="icon: sign-out" class="aside__ul__li__link__icon"></span>
                        <p class="aside__ul__li__link__title">Cerrar sesion</p>
                    </router-link>
                </li>
            </ul>
        </aside>

        <div @click="toggle" class="overlay" v-if="overlay">

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
        // UIkit.offcanvas(document.getElementById('my-id')).show();
    },
    data(){
        return {
            overlay: false,
            show: false,
        }
    },
    computed: {
        isDisabled(){
            return this.$store.getters.getDisabled
        },
        loggin(){
            return this.$store.getters.getPatiendID ? true : false
        },
        visitor(){
            return this.$store.getters.getPatiendID ? false : true 
        },
        personal(){
            return this.$store.getters.getPersonal
        },
    },
    methods: {
        toggle(){
            this.overlay= !this.overlay
            this.show= !this.show
        },
        setDisabled(){
            this.$store.commit('setDisabled', false)
        },
        goToHome(){
            console.log('go')
            this.$router.push({ name: 'home' })
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    // flex-wrap: wrap;
}
.overlay{
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
}
.aside{
    width: 60%;
    height: 100vh;
    background-color: rgb(46, 46, 46);
    position: fixed;
    z-index: 3000;
    left: -100%;
    transition: all 0.3s;
    &.show{
        left: 0;
    }
    @media (min-width: $medium){
        width: 346px; //45%
    }
    &__personal-container{
        // background-color: red;
        // background: blue;    
        height: 15em;
        padding: 1.5em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        &__icon-container{
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: $background;
            border-radius: 50%;
            &__icon{
                color: rgb(46, 46, 46);
                // background: $background;
                // border: solid $background 25px;
            }
        }
        &__name{
            color: $background;
            margin: 0;  
            margin-top: 20px;
            font-size: 1.5em;
            @media (min-width: $medium){
                margin-top: 0;
            }
            // background: red;
            text-align: center;
        }
    }

    &__ul{
        margin: 0;
        list-style: none;
        width: 100%;
        padding: 0;
        // background: blue;
        &__li{
            // background: green;
            // padding: 1em;
            display: flex;
            width: 100%;
            &__link{
                display: flex;
                padding: 1em;
                width: 100%;
                // background: red;
                // align-items: center;
                &.router-link-exact-active.router-link-active{
                    background: #1e87f0;
                    color: white;
                }
                &:hover, &:focus{
                    text-decoration: none;
                }
                &__icon{
                    // background: purple;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }
                &__title{
                    display: flex;
                    align-items: center;
                    margin: 0;
                    // background: blue;
                    margin-left: 10px;
                    text-decoration: none;
                    color: white;
                    &:hover, &:focus{

                        text-decoration: none;
                    }
                }
            }
        }
    }
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
    justify-content: space-between;
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

.level{
    visibility: hidden;
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
    display: flex;
}

</style>
