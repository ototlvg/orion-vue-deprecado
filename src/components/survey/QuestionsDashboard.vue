<template>
    <div class="qdashboard">
        <div class="qdashboard__wrapper">
            <div class="qdashboard__wrapper__title-container">
                <ul class="uk-breadcrumb">
                    <li>Inicio</li>
                    <li>Sección {{Section}}</li>
                    <!-- <li class="uk-disabled"><a>Disabled</a></li>
                    <li><span>Active</span></li> -->
                </ul>
            </div>


            <div class="qdashboard__wrapper__questions-container">
                
                <div class="qdashboard__wrapper__questions-container__item-container" v-for="(question,index) in getQuestions" :key="index" >
                    <div @click="prueba(index+1)" class="qdashboard__wrapper__questions-container__item-container__item" :class="{active: question.answer == null}">
                        <p class="qdashboard__wrapper__questions-container__item-container__item__text">{{index+1}}</p>
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
        if(this.$store.getters.getPaginate){

        }else{
            this.$router.push({ name: 'home'})
        }
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
        Section(){
            return this.$store.getters.getPaginate
        }
    },
    methods: {
        prueba(pregunta){
            this.$router.push({ name: 'surveyQuestion', params: { id: pregunta } })
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
                        background-color: skyblue;
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