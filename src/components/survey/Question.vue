<template>
    <div class="question">
        <!-- <p>{{ $route.params }}</p> -->
        <!-- <p>as;dksakldj</p> -->
        <!-- <p>Estamos en el question</p>
        <p>{{question}}</p>
        <p>lkjsfdajkhdfilkashdjksh</p> -->
        <div class="question__wrapper">

            <section class="question__wrapper__header">
                <div class="question__wrapper__header__nav" @click="goBack">
                    <span uk-icon="icon: chevron-left"></span>
                    <p>Atras</p>
                </div>
                <div class="question__wrapper__header__list">
                    <span uk-icon="icon: grid; ratio: 1.3" @click="goToDashboard"></span>
                </div>
                <div class="question__wrapper__header__pages">
                    <p>{{actualQuestion}}/75</p>
                </div>
            </section>

            <section class="question__wrapper__body"> 

                <div class="question__wrapper__body__question-container">
                    <!-- <p>{{question}}</p> -->
                    <h2 class="question__wrapper__body__question-container__question">{{question.id}}. {{question.question}}</h2>
                </div>

                <div class="question__wrapper__body__answers-container">

                    <div @click="answer(true)" class="question__wrapper__body__answers-container__button question__wrapper__body__answers-container__button--true" :class="{ loadingButton: loading }">
                        <p>Verdadero</p>
                    </div>
                    <div @click="answer(false)" class="question__wrapper__body__answers-container__button question__wrapper__body__answers-container__button--false" :class="{ loadingButton: loading }">
                        <p>Falso</p>
                    </div>

                    <div class="question__wrapper__body__answers-container__overlay" v-show="loading">

                    </div>

                </div>
            </section>

        </div>

    </div>
    
</template>

<script>
export default {
    name: 'Question',
    created(){
        // if(this.$store.getters.getPaginate==null){

        //     this.$router.push({ name: 'home'})
        // }else{
        // }
        // this.$router.push({ path: 'cuestionario/1/dashboard' })
        
        this.$store.commit('setDisabled',true)
    },
    data(){
        return {
            welcome: 'Bienvenido'
        }
    },
    computed: {
        actualQuestion(){
            return this.$route.params.question
        },
        question(){
            let questions = this.$store.getters.getSectionData.questions.data
            // console.log(questions)
            let este= this
            let found = questions.find(element => element.id == este.actualQuestion);
            console.log(found)
            return found
        },
        questionsLength(){
            return this.$store.getters.getQuestions.length
        },
        loading(){
            return this.$store.getters.getLoading
        },
        checkLastSection(){
            return this.$store.getters.getCheckFinalSection
        }
    },
    methods: {
        nextQuestion(){
            // console.log('ejecutado')
            let nextPage= parseInt(this.$route.params.id)
            if(nextPage+1 > this.questionsLength){
                this.$store.commit('setShowSectionCompleted', { status: true, section: this.$store.getters.getPaginate })
                this.$router.push({ name: 'home'})
            }else{
                // Si existe pregunta siguiente
                nextPage= nextPage+1
                this.$router.push({ name: 'surveyQuestion', params: {id: nextPage } })
                return true;
            }
        },
        answer(answer){
            // this.$store.commit('setLoading',true)
           this.$router.push({ name: 'question', params: { question: this.actualQuestion+1 } })
           
        //    let promise= this.$store.dispatch('saveAnswer', { id: this.question.question.id, answer: answer, checkLastSection: this.checkLastSection })
        //     promise.then(value => {
        //         // console.log(value)

        //         this.$store.commit('setNewAnswer', { index: this.$route.params.id-1, answer: value.answer ? 1:0 })
        //         // true pagina siguiente
        //         this.nextQuestion() ? true : false
        //         this.$store.commit('setLoading',false)

        //     })
        //     .catch(value =>{
        //         console.log(value)
        //     })
        },
        evaluate(answer){

        },
        goBack(){
            this.$router.go(-1)
        },
        leaving(){
            this.$router.push({ name: 'home'})
        },
        goToDashboard(){
            this.$router.push({ name: 'dashboard'})
        }
    },
    watch: {
        $route(to, from) {
            this.$store.commit('setDisabled',true)
        }
    },
    
}
</script>>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$padding-x: 2.5em;

*{
    // flex-wrap: wrap;
}

.question{
    width: 100%;
    height: 100vh;
    display: flex;
    @media (min-width: $medium){
        flex-wrap: wrap;
    }
    &__wrapper{
        width: 100%;
        background-color: #FF3A46;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        @media (min-width: $medium){
            flex-direction: row;
            justify-content: center;
            align-content: flex-start;
        }
        &__header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            color: white;
            padding: 2em $padding-x;
            align-items: center;
            font-size: 1.1em;
            &__nav{
                display: flex;
                align-items: center;
                cursor: pointer;
                p{
                    margin: 0;
                }
                
            }
            &__pages{
                p{
                    display: flex;
                    align-items: center;
                    margin: 0;
                }
            }

        }

        &__body{
            background-color: #FFFFFF;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            padding: 3em $padding-x;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            @media (min-width: $medium){
                width: 700px;
                flex: 0 0 auto;
                border-radius: 30px;
                padding: 50px 80px;
                // align-self: center;
                box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
            }
            &__question-container{
                display: flex;
                justify-content: center;    
                align-items: center;
                &__question{
                    margin: 0;
                    color: #233D63;
                }
                height: 250px;
            }

            &__answers-container{
                // background-color: red;
                flex: 1 1 auto;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                flex-direction: column;
                position: relative;
                // &__spinner-container{
                //     width: 100%;
                //     background: white;
                //     // background: blue;
                //     position: absolute;
                //     top: 0;
                //     // opacity: 0.5;
                //     // height: 245px;
                //     display: flex;
                //     align-items: center;
                // }
                &__overlay{
                    width: 100%;
                    height: 40px;
                    // background-color: red;
                    position: absolute;
                    height: 300px;
                    top: 0;
                    @media (min-width: $medium){
                        height: 200px;
                    }
                }
                @media (min-width: $medium){
                    // max-width: 1070px;
                }
                &__button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    $sizeButton: 90px;
                    width: 100%;
                    height: 80px;
                    border-radius: 45px;
                    cursor: pointer;
                    box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
                    transition: all 0.2s;
                    @media (min-width: $large){
                        &:hover{
                            transform: scale(1.1);
                            box-shadow:0 0 9px rgba(0, 0, 0, 0.5);
                        }
                    }
                    &:nth-child(odd){
                        margin-bottom: 2em;
                    }
                    p{
                        margin: 0;
                    }
                    &--true{
                        background: #21395C;
                        p{
                            color:white;
                        }
                    }

                    &--false{
                        background-color: #F1F1F1;
                        p{
                            color: black;
                        }
                        &.loading{
                            background-color: gray;
                        }

                    }

                    &.loadingButton{
                        background-color: rgb(85, 85, 85);
                        p{
                            color: white;
                        }
                    }

                    
                }
            }
        }

    }

}

.loading{
    display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  @media (min-width: $large){
    margin: 80px auto;

  }
}

.spinner > div {
  background-color: #FF3A46;
  height: 100%;
  width: 6px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

</style>