<template>
    <div class="qdashboard">
        <!-- <p>Dashboards</p> -->
        <div class="qdashboard__wrapper">
            <div class="qdashboard__wrapper__title-container">
                <ul class="uk-breadcrumb">
                    <li class="home" @click="home">Inicio</li>
                    <li>Sección {{section}}</li>
                </ul>
            </div>
            <!-- {{questions}} -->

            <div class="qdashboard__wrapper__questions-container">
                
                <div class="qdashboard__wrapper__questions-container__item-container" v-for="(question,index) in questions" :key="index" >
                    <!-- <p>lkasjdklsaj</p> -->
                    <!-- {{questions}} -->

                    <div v-if="question.answered != true" @click="prueba(question.question)" class="qdashboard__wrapper__questions-container__item-container__item" :class="{active: question.answered == false}">
                        <!-- <p class="qdashboard__wrapper__questions-container__item-container__item__text">{{index+1}}</p> -->
                        <p class="qdashboard__wrapper__questions-container__item-container__item__text">{{question.question}}</p>
                    </div>


                    <div v-else class="qdashboard__wrapper__questions-container__item-container__item" :class="{active: question.answered != true}">
                        <!-- <p class="qdashboard__wrapper__questions-container__item-container__item__text">{{index+1}}</p> -->
                        <p class="qdashboard__wrapper__questions-container__item-container__item__text">{{question.question}}</p>
                    </div>



                </div>

            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'QuestionsDashboard',
    created(){
        // this.$router.push({ name: 'shera', params: { question: 1 } })
        // if(this.$store.getters.getPaginate){

        // }else{
        //     this.$router.push({ name: 'home'})
        // }
    },
    data(){
        return {
            welcome: 'Bienvenido'
        }
    },
    computed: {
        getQuestions(){
            return this.$store.getters.getQuestions
        },
        section(){
            return this.$store.getters.getSectionData.questions.current_page
        },
        questions(){
            return this.$store.getters.getSectionData.sectionStatus
        }
    },
    methods: {
        prueba(question){
            this.$router.push({ name: 'question', params: { question: question } })
        }   ,
        home(){
            this.$router.push({ name: 'home'})
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
.qdashboard{
    @include componentFather;
    background-color: $background;
    width: 100%;
    @media (min-width: $large){
        display: flex;
    }
    &__wrapper{
        // flex: 1 1 auto;
        // @media (min-width: $medium) {
        //     max-width: 1100px;
        //     margin: 0 auto;
        //     display: flex;
        //     flex-wrap: wrap;
        // }
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-content: flex-start;
        @media (min-width: $large){
            // max-width: 600px;
            // margin: 0 auto;
            // align-items: flex-start;
        }

        &__title-container{
            width: 100%;
            margin-bottom: $padding;
            .uk-breadcrumb{
                justify-content: center !important;
                margin: 0 !important;
                .home{
                    cursor: pointer;
                }
            }
        }

        

        &__questions-container{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            @media (min-width: $medium){
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            @media (min-width: $large){
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                max-width: 800px;
                // background: red;
                margin: 0 auto;
            }
            grid-template-rows: auto;
            grid-gap: 1em;
            &__item-container{
                display: flex;
                justify-content: center;    
                &__item{
                    text-align: center;
                    background: rgb(200, 200, 199);
                    $sizeItem: 70px;
                    width: $sizeItem;
                    height: $sizeItem;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &__text{
                        margin: 0;
                        color: $background;
                    }
                    &.active{
                        @media (min-width: $large){
                            cursor: pointer;
                            transition: all 0.3s;
                            &:hover{
                                transform: scale(1.2);
                            }
                        }
                        background-color: #2294F2;
                        p{
                            color: white;
                        }
                    }
                }

            }
        }

    }

}

</style>