<template>
    <div class="home">
        <div class="wrapper">
            <div class="section" v-for="(section,index) in sections" :key="index" @click="evaluate(index)" :class="{green: section, warning: !section}">
                <div class="section__data">
                    <h2 class="section__data__title">Seccion {{index+1}}</h2>
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
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Home',
    created(){
        this.$store.dispatch('getSections')
            .then(response => {
                this.$store.commit('setSections', response)
            })
        this.$store.getters.showSectionCompleted.status ? this.showSectionCompleted() : false
    },
    data(){
        return {
            welcome: 'Bienvenido'
        }
    },
    computed: {
        sections(){
            return this.$store.getters.getSections
        },
        questions(){
            return this.$store.getters.getQuestions
        }
    },
    methods:{
        goToSection(index){
            // console.log(this.$store.getters.getSections)
            let page= index+1
            this.$store.dispatch('getQuestionsOfSection',page)
                .then(response => {
                    this.$store.commit('setPaginate', page)
                    this.$store.commit('setQuestions', response.data)
                    if(this.questions[0].answer){ // Si es null esto sera false
                        this.$router.push({ name: 'questionsDashboard'})
                        // console.log('Vamos al dashboard')
                    }else{
                        // console.log('Vamos a la primera pregunta')
                        this.$router.push({ name: 'surveyQuestion', params: { id: '1' } })
                    }
                })
        },
        evaluate(index){
            if(this.$store.getters.getSections[index] == 1){
                Swal.fire({
                title: '¿Esta seguro?',
                text: "Ya terminaste de contestar esta encuesta",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo contestarla de nuevo',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        this.goToSection(index)
                    }
                })
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
        showSectionCompleted(){
            let este= this
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Seccion ${este.$store.getters.showSectionCompleted.section} contestada`,
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                este.$store.commit('setShowSectionCompleted', { status: false, section: null })
            })
        }
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
}

.wrapper{
    // padding: 2em; // Extra
    @media (min-width: $medium) {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        // flex-wrap: wrap
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-gap: 1em;
    }
    @media (min-width: $large){
        // max-width: 900px;
        // background: red;
    }
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
    &.green{
        background-color: $green;
    }
    &.warning{
        background-color: #FF9601;
    }
    @media (min-width: $medium) {
        width: 250px;
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
</style>