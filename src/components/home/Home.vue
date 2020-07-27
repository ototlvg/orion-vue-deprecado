<template>
    <!-- <div class="home" :class="{nopadding: showCreateSections}"> -->
    <div class="home">
        <div class="home__wrapper"> 

            <section class="home__wrapper__section" v-for="(section,index) in sections" :key="index" @click="evaluate(index)">
                <div class="section" :class="{green: section, warning: !section}" >
                    <div class="section__data">
                        <h2 class="section__data__title">Sección {{index+1}}</h2>
                        <h3 class="section__data__status" v-if="section">Contestado</h3>
                        <h3 class="section__data__status" v-else>Pendiente</h3>
                    </div>
                    <div class="section__image">
                    <div class="section__image__circle" :class="{green: section, warning: !section}">
                        <!-- <svg v-if="section" class="caramelo" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#ffff" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                        <svg v-else class="caramelo" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="clock"><circle fill="none" stroke="#fff" stroke-width="1.1" cx="10" cy="10" r="9"></circle><rect fill="#fff" x="9" y="4" width="1" height="7"></rect><path fill="#fff" stroke="#fff" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path></svg> -->
                        <span v-if="section" uk-icon="icon: check; ratio: 2" class="uk-icon-link"></span>
                        <span v-else uk-icon="icon: clock; ratio: 2" class="uk-icon-link clock"></span>
                    </div>
                    </div>
                </div>

            </section>


        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Home',
    created(){

        // this.getAll()
        if(this.$store.getters.getHomeAlreadyFirstLoaded){
            console.log('La informacion de sections ya esta en la app')
            this.evaluateSections()
        }else{
            // console.log('Status de Sections aun no estan en app, mandando a pedir al servidor')
            this.$store.commit('setHomeAlreadyFirstLoaded', true)
            this.getAll()
        }

        // let sectionsS = this.$store.getters.getSections
        // console.log(sectionsS)

        this.$store.getters.getShowMessageSectionCompleted.status ? this.showMessageSectionCompleted() : false




        this.goToSectionWatcher = false
    },
    data(){
        return {
            welcome: 'Bienvenido',
            // showCreateSections: false,
            // sectionMessage: 'Aun no has creado ninguna seccion para contestar',
            // creatingSections: false,
            goToSectionWatcher: false,
            page: -1,
        }
    },
    computed: {
        sections(){
            return this.$store.getters.getSections
        },
        questions(){
            return this.$store.getters.getQuestions
        },
    },
    methods:{
        getAll(){
            let este=this

            this.$store.dispatch('getSections')
                .then(response => {
                    // console.log(response)
                    this.$store.commit('setSections', response)
                    this.evaluateSections()

                })
        },
        goToSection(index){
            let page= index+1
            this.page = page
            // this.$router.push({ name: 'survey', params: { page: `${page}` } })

            // this.$router.push({ path: 'cuestionario/1/dashboard' })
            // this.$router.push({ path: 'cuestionario/1/1' })

            // this.$router.push({ path: 'cuestionario/1' })
            let sections = this.$store.getters.getSectionsData

            if(sections.length == 0){
                console.log('Sections totalmente vacio')
                this.getSectionDataFromServer(page)
            }else{
                console.log('Sections no esta vacio, se buscara')
                const found = sections.find(element => element.questions.current_page == page);
                if(found == undefined){
                    console.log('Section no encontrado, mandando a buscar al servidor')
                    this.getSectionDataFromServer(page)
                }else{
                    console.log('Datos de la seccion encontrado en la aplicacion')
                    this.$store.commit('setSectionData', found)
                    this.goToSectionWatcher = true
                }
            }

        },
        getSectionDataFromServer(page){
            let este = this
            this.$store.dispatch('getSectionData',page)
                .then(response => {
                    // console.log(response)
                    este.$store.commit('setSectionsData',response)
                    este.$store.commit('setSectionData', response)
                    este.goToSectionWatcher = true
                })
                .catch(data=>{
                    console.log(data.status)
                    if(data.status == 401){
                        Swal.fire(
                            'El administrador desactivo las encuestas',
                            'Para mas informacion favor de contactarse con el administrador',
                            'error'
                        )
                    }else{
                        Swal.fire(
                            'Problemas en el servidor',
                            'Porfavor intente mas tarde',
                            'error'
                        )
                    }

                })
        },
        evaluate(index){
            if(this.$store.getters.getSections[index] == 1){
                // Nuevo 
                Swal.fire('Encuesta contestada')

            }else{
                this.goToSection(index)
            }
        },
        prueba(){
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        },
        showMessageSectionCompleted(){
            let este= this
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Seccion ${este.$store.getters.getShowMessageSectionCompleted.section} contestada`,
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                este.$store.commit('setShowMessageSectionCompleted', { status: false, section: null })
            })
        },

        evaluateSections(){
            let arrSum= this.sections.reduce( (a,b) => a + b);
            let sectionsLength = this.sections.length
            // console.log('Suma del array sections: ' + arrSum)
            // console.log('Tamaño del array sections: '  + sectionsLength)

            if(arrSum == sectionsLength){ // Encuesta ya contestada o sin autorizacion
                console.log('Vamos a finished')
                this.$router.push({ name: 'finished'})
            }
        }

    },

    watch: {
        goToSectionWatcher(){
            // console.log(this.goToSectionWatcher)
            if(this.goToSectionWatcher == true){
                // console.log('Vamos a pregunta')

                let firstQuestionIsAnswered = this.$store.getters.getSectionData.sectionStatus[0].answered
                this.$router.push({ path: `cuestionario/${this.page}/dashboard` })
                
                // if(!firstQuestionIsAnswered){
                //     this.$router.push({ path: `cuestionario/${this.page}/1` })
                // }else{
                //     this.$router.push({ path: `cuestionario/${this.page}/dashboard` })
                // }
                this.goToSectionWatcher = false
            }
        },
        // sections(){
        //     console.log('Canaria song')
        // }
    }
    
}
</script>>

<style lang="scss" scoped>

@import '../../scss/variables.scss';
// $megaman:red;
$green: #26AE60;
$yellow: #FF9601;
$fondo: $background;

.home{
    background-color: $fondo;
    @include componentFather;
    width: 100%;
    &__create-sections{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3em;
        &__wrapper{
            text-align: center;
            max-width: 500px;
            margin: 0 auto;
            // background: red;
        }
    }
    &__wrapper{
        // padding: 2em; // Extra
        @media (min-width: $medium) {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2em;
        }
        @media (min-width: $large){
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: auto;
            grid-gap: 2em;
        }
        &__section{
            display: flex;
            justify-content: center;
        }
    }
    // &.nopadding{
    //     padding:0;
    //     display: flex;
    // }
}


// .green{
//     background-color: $green;
// }

// .warning{
//     background-color: #FF9601;
// }

$paddingInner: 1.5em;

.section{
    display: flex;
    border-radius: 15px;
    margin-bottom: 1em;
    box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s, background-color 1s;
    width: 100%;
    &.green{
        background-color: $green;
    }
    &.warning{
        background-color: #FF9601;
    }
    @media (min-width: $medium) {
        // width: 250px;
        margin:0;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 
            "image"
            "data"
        ;
        &__data{
            grid-area: data;
        }
        &__image{
            grid-area: image;
            &__circle{
                border-radius: 50%;
                background-color: white;
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                &.green{
                    // background-color: green;
                }
            }
        }
    }
    &__data{
        padding: $paddingInner;
        flex: 3 1 auto;
        // background-color: red;
        @media (min-width: $medium){
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            text-align: center;
        }
        &__title{
            color: $fondo;
            margin: 0;
            font-size: 1.5em;
            @media (min-width: $medium) {
                width: 100%;
                font-size: 1.3em;
            }
        }

        &__status{
            color: $fondo;
            margin: 0;
            font-size: 1em;
            @media (min-width: $medium) {
                font-size: .8em;
            }
        }

    }

    &__image{
        padding: $paddingInner;
        flex: 1 1 auto;
        // background-color: skyblue;
        display: flex;
        justify-content: center;
        align-items: center;
        // font-size: 
    }

    @media (min-width: $large){
        cursor: pointer;
        &:hover{
            box-shadow:0 0 10px rgba(0, 0, 0, 0.5);
            transform: scale(1.1,1.1);
        }
    }
}

.caramelo{
    width: 40px;
    height: 40px;
    // fill: red;
    // color: white;
    fill: red !important;
}

.uk-divider-icon{
    margin-top: 0
}
.uk-icon-link.uk-icon{
    color: rgb(221, 221, 221);
    svg{
        // fill: green !important;
        // width: 80px;
        // height: 80px;
    }
    @media (min-width: $medium){
        color: $green;
        svg{
            // fill: green !important;
            // width: 80px;
            // height: 80px;
        }
        &.clock{
            color: $yellow;
        }
    }
    
}


.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 50px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
//   background-color: #333;
  background-color: #1e87f0;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s; }
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s; }
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1); 
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  } 
}


</style>