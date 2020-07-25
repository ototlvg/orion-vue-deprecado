<template>
    <div class="register">
        <div class="register__wrapper">
            <div class="register__wrapper__error-container" v-if="errors.length">
                <div class="uk-alert-danger" uk-alert>
                    <!-- {{errors}} -->
                    <a class="uk-alert-close" uk-close></a>
                    <p v-for="(error,index) in errors" v-bind:key="index">- {{error}}</p>
                </div>

            </div>
            <ValidationObserver class="register__wrapper__vo" v-slot="{ handleSubmit }">

                <form class="register__wrapper__vo__form" v-on:submit.prevent="handleSubmit(onSubmit)">

                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Nombre</label>
                        <input class="register__wrapper__vo__form__vp__input uk-input" v-model="name" type="text" name="name">
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Apellido Paterno</label>
                        <input class="register__wrapper__vo__form__vp__input uk-input" v-model="apaterno" type="text" name="apaterno">
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider class="register__wrapper__vo__form__vp"  v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Apellido Materno</label>
                        <input class="register__wrapper__vo__form__vp__input uk-input" v-model="amaterno" type="text" name="amaterno">
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="email" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Correo Electronico (opcional)</label>
                        <input class="register__wrapper__vo__form__vp__input uk-input" v-model="email" type="text" name="email">
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Genero</label>
                        <select class="register__wrapper__vo__form__vp__input uk-select" v-model="gender" name="gender">
                            <option v-for="(gender, index) in genders" v-bind:key="index" :value="gender.id">{{gender.gender}}</option>
                        </select>
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Estado civil</label>
                        <select class="register__wrapper__vo__form__vp__input uk-select" v-model="marital" name="marital">
                            <option v-for="(marital_status, index) in ms" v-bind:key="index" :value="marital_status.id">{{marital_status.status}}</option>
                        </select>   
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <ValidationProvider class="register__wrapper__vo__form__vp" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Fecha de nacimiento</label>
                        <input class="register__wrapper__vo__form__vp__input" type="date" v-model="birthday">
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                    <ValidationProvider class="register__wrapper__vo__form__vp" name="job" rules="required" v-slot="{ errors }">
                        <label class="register__wrapper__vo__form__vp__label" for="form-stacked-text">Ocupacion</label>
                        <select class="register__wrapper__vo__form__vp__input uk-select" v-model="job">
                            <option v-for="(job, index) in jobs" v-bind:key="index" :value="job.id">{{job.name}}</option>
                            
                        </select>
                        <span class="register__wrapper__vo__form__vp__error uk-text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>



                    
                    <button type="submit" class="uk-button uk-button-primary"  v-if="!loading">
                        <span>Registrarte</span>
                    </button>

                    <div class="uk-button uk-button-primary" v-if="loading">
                        <div class="loadingContainer">
                            <div class="loader">Loading...</div>
                        </div>
                        <span>Registrando</span>
                    </div>




                </form>
                <a href="#" uk-totop uk-scroll></a>


            </ValidationObserver>
        

        </div>
    </div>
    
</template>

<script>
import { ValidationProvider, extend , ValidationObserver} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
extend('empty', {
  validate: value => {
    return value.length > 5;
  },
  message: 'Ingresa tu nombre'
});

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

extend('positive', {
    validate (value) {
        // return value.length > 0
        return {
            required: true,
            valid: value.length > 4,
        };
    },
    computesRequired: true
});

extend('email', email);

extend('email', {
  ...email,
  message: 'Porfavor ingresa un correo valido'
});

// Override the default message.
extend('required', {
  ...required,
  message: 'Este campo es obligatorio'
});

// extend('required', {
//   validate: value => {
//     return true;
//   },
//   message: 'This field must be an odd number'
// });

export default {
    name: 'Register',
    components: {
        ValidationProvider,
        ValidationObserver
    },
    created(){
        let este= this
        if(this.rememberCode != null){
          // console.log('olvidaste tu ususario')
          Swal.fire({
            title: this.rememberCode,
            text: 'Olvidaste tu codigo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesion',
            cancelButtonText: 'Registro'
          }).then((result) => {
            if (result.value) {
              este.$router.push("/home", null, function(error) { true });
            }
          })
        }
        this.$store.dispatch('getRegisterData')
        .then(response => {
            // console.log(response)
            this.genders= response.genders
            this.ms= response.marital
            this.jobs= response.jobs
        })
        .catch(error => {
            this.launchNotification()
        })
    },
    data(){
        return {
            welcome: 'Bienvenido',
            name: '',
            apaterno: '',
            amaterno: '',
            gender: '',
            marital: '',
            birthday: '',
            job: '',
            email: '',
            genders: null,
            ms: null,
            jobs: null,
            errors: [],
            errorServer: null,
            loading: false, 
            code: null,
        }
    },
    computed: {
        // loading(){
        //     return this.$store.getters.getLoading
        // }
        rememberCode(){
          return this.$store.getters.getRememberCode
        }
    },
    methods:{
        launchNotification(){
            UIkit.notification({
                message: 'Error, porfavor intente mas tarde',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
        },
        onSubmit(){
            let este= this;
            este.loading=true
            this.$store.dispatch('storeUser', {
                name: this.name,
                apaterno: this.apaterno,
                amaterno: this.amaterno,
                gender: this.gender,
                marital: this.marital,
                birthday: this.birthday,
                job: this.job,
                email: this.email
            })
            .then(response => {
                este.code= response
                este.loading=false
                this.$store.commit('setRememberCode',response)
                Swal.fire({
                    icon: 'success',
                    title: response,
                    text: 'Registro exitoso, porfavor copie su codigo de usuario para proceder a iniciar sesion',
                })
                .then((result) => {
                    this.$router.push({name: 'login'})
                })
                
                console.log(response)
            })
            .catch(error => {
                // console.log()
                este.loading=false
                this.errors= []
                if(error.status == 422){
                    let e= error.data;
                    let este= this
                    console.log(e)
                    // this.errors= e.errors
                    Object.keys(e.errors).forEach(function(key) {
                        let arr= e.errors[key];
                        // console.log(arr)
                        este.errors.push(arr[0])
                    });
                    scroll(0,0)
                }else{
                    this.errors.push('Error, porfavor intentelo mas tarde')
                    this.launchNotification()
                }
            })
        },
    }
    
}
</script>>

<style lang="scss">
@import '../../scss/variables.scss';

.register{
    width: 100%;
    background-color: $background;
    padding: 1em;
    &__wrapper{
        max-width: 560px;
        // background: tomato;
        background-color: white;
        box-shadow: 0 6px 6px rgba(0,0,0,0.2);
        margin: 0 auto;
        padding: 3em;
        // border-radius: 45px;
        &__vo{
            width: 100%;
            &__form{
                width: 100%;
                display: flex;
                // flex-wrap: wrap;
                flex-direction: column;
                justify-content: flex-start;
                &__vp{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 1em;
                    &__label{
                        width: 100%;
                        margin-bottom: 0.5em;
                    }

                    &__input{
                        // width: 100%;

                    }

                    &__error{
                        width: 100%;

                    }
                }
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loadingContainer{
    padding:1em
}
.loader {
  color: #ffffff;
  font-size: 20px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 10px auto;
//   background: red;
  position: relative;
  transform: translateZ(0);
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}



</style>