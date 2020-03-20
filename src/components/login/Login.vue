<template>
    <div class="login">
        <div class="login__wrapper">

            <div class="login__wrapper__logo-container">
                <span uk-icon="icon:  users; ratio: 8"></span>
            </div>

            <!-- <div class="login__wrapper__title">
                <h2>Iniciar sesion</h2>
            </div> -->
            <div class="login__wrapper__form-container">
                <form class="login__wrapper__form-container__form" v-on:submit.prevent="login">

                    <div class="uk-margin login__wrapper__form-container__form__input-container">
                        <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input" type="text" placeholder="Codigo" v-model="code">
                        </div>
                        
                    </div>


                    <button class="uk-button uk-button-primary">Ingresar</button>
                </form>
            </div>

        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            welcome: 'Bienvenido',
            code: ''
        }
    },
    methods: {

        login(){
            this.$store.dispatch('login', this.code)
            .then(response => {
                // console.log(response)
                localStorage.setItem('patient_id', response.id_en)
                localStorage.setItem('patient_code', this.code)
                this.$store.commit('setPatientCode',this.code);
                this.$store.commit('setPatiendID',response.id_en);
                delete response.id_en
                delete response.code
                delete response.completed_surveys
                delete response.survey_available
                this.$store.commit('setPersonal', [response]);
                // console.log(response)
                this.$router.push({ name: 'home'})
            })
        }
    }   
}
</script>>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
.login{
    background: $background;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__wrapper{
        background: white;
        width: 80%;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        height: 450px;
        padding: 4em;
        border-radius: 45px;
        box-shadow: 0 6px 6px rgba(0,0,0,0.2);
        @media (min-width: $large){
            width: 30%;
        }
        &__logo-container{
            width: 100%;
            text-align: center;
        }
        &__title{
            width: 100%;
            text-align: center;
            // background: purple
        }

        &__form-container{
            width: 100%;
            display: flex;
            justify-content: center;
            flex: 1 1 auto;
            // background-color: blue;
            &__form{
                width: 100%;
                display: flex;
                align-items: center;
                // background-color: green;
                justify-content: center;
                flex-wrap: wrap;
                &__input-container{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin: 0;
                }
            }
        }

    }
}


</style>