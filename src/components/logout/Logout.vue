<template>
    <div class="logout">
        <div class="aksldj">Aqui va el logout</div>
    </div>
    
</template>

<script>
export default {
    name: 'Logout',
    created(){
        localStorage.removeItem('patient_id')
        localStorage.removeItem('patient_code')
        this.$store.commit('logout')
        this.$router.push({ name: 'login'})
    },
    data(){
        return {
            welcome: 'Bienvenido'
        }
    }
    
}
</script>>

<style lang="scss">

</style>