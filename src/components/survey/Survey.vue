<template>
    <div class="survey">
        <!-- <div class="aksldj">Survey</div>
        <p>{{ $route.params.page }}</p> -->
        <router-view class="survey__view"></router-view>
    </div>
    
</template>

<script>
export default {
    name: 'Survey',
    data(){
        return {
            welcome: 'Bienvenido'
        }
    },
    created(){
        let page = this.$route.params.page
        // this.$store.dispatch('getStatusQuestionsOfSection', page)

        // this.$router.push({ name: 'shera', params: { question: 1 } })
        // this.$router.push({ path: 'cuestionario/1/dashboard' })
        // this.$router.push({ name: 'shera', params: { question: 1 } })

    },
    mounted(){
        // this.$router.push({ path: 'cuestionario/1/dashboard' })

    },
    beforeRouteLeave (to, from, next) {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Las preguntas contestadas no seran guardadas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Entendido'
        }).then((result) => {
            if (result.value) {
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                next()
            }else{
                next(false)
            }
        })

        // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        // if (answer) {
        //     next()
        // } else {
        //     next(false)
        // }
    }

}
</script>>

<style lang="scss">
.survey{
    width: 100%;
    display: flex;
    &__view{
        // background: red;
        width: 100%;
    }
}
</style>