<template>
    <div class="question">
        <div class="question__wrapper">

            <section class="question__wrapper__header">
                <div class="question__wrapper__header__nav" @click="goBack">
                    <span uk-icon="icon: chevron-left"></span>
                    <p>Atras</p>
                </div>
                <div class="question__wrapper__header__pages">
                    <p>{{idRoute}}/{{questionsLength}}</p>
                </div>
            </section>

            <!-- Esto es lo blanco -->
            <section class="question__wrapper__body"> 

                <div class="question__wrapper__body__question-container">
                    <h2 class="question__wrapper__body__question-container__question">{{question.question.question}}</h2>
                </div>


                <div class="question__wrapper__body__answers-container">

                    <div @click="answer(true)" class="question__wrapper__body__answers-container__button question__wrapper__body__answers-container__button--true">
                        <p>Verdadero</p>
                    </div>
                    <div @click="answer(false)" class="question__wrapper__body__answers-container__button question__wrapper__body__answers-container__button--false">
                        <p>Falso</p>
                    </div>

                </div>




                <!-- <div class="coco">{{loading}}</div>
                <button @click="answer(true)" :class="{ loading: loading }">Cierto</button>
                <button @click="answer(false)" :class="{ loading: loading }">Falso</button> -->
            </section>

            

            <!-- <button @click="nextQuestion">Siguiente</button> -->   

        </div>

    </div>
    
</template>

<script>
export default {
    name: 'Question',
    created(){
        // console.log('created ejecutado')
        this.$store.commit('setDisabled',true)
    },
    data(){
        return {
            welcome: 'Bienvenido'
        }
    },
    computed: {
        idRoute(){
            return this.$route.params.id
        },
        question(){
            return this.$store.getters.getQuestions[this.$route.params.id-1]
        },
        questionsLength(){
            return this.$store.getters.getQuestions.length
        },
        loading(){
            return this.$store.getters.getLoading
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
            this.$store.commit('setLoading',true)
            let promise= this.$store.dispatch('saveAnswer', { id: this.question.question, answer: answer })
            promise.then(value => {
                this.$store.commit('setNewAnswer', { index: this.$route.params.id-1, answer: value.answer ? 1:0 })
                // true pagina siguiente
                this.nextQuestion() ? true : false
                this.$store.commit('setLoading',false)
            })
            .catch(value =>{
                console.log(value)
            })
        },
        evaluate(answer){

        },
        goBack(){
            this.$router.go(-1)
        },
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
                    &:hover{
                        transform: scale(1.1);
                        box-shadow:0 0 9px rgba(0, 0, 0, 0.5);
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

                    }
                }
            }
        }

    }

}

.loading{
    display: none;
}

</style>