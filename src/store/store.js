import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://orion.com/api'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        patientCode: localStorage.getItem('patient_code') || null,
        patiendID: localStorage.getItem('patient_id') || null,
        sections: null,
        paginate: null,
        questions: null,
        loading: false,
        disabled: false,
        personal: [],
        showSectionCompleted: { status: false, section: null },
        st: null,
    },
    getters: {
        getSections(state) {
            return state.sections
        },

        getPatiendID(state) {
            return state.patiendID
        },

        getQuestions(state) {
            return state.questions
        },

        getPaginate(state) {
            return state.paginate
        },
        getLoading(state){
            return state.loading
        },
        getDisabled(state){
            return state.disabled
        },
        showSectionCompleted(state){
            return state.showSectionCompleted
        },
        getPersonal(state){
            return state.personal
        },
    },
    mutations: {
        // addTodo(state, todo) {
        //   state.todos.push({
        //     id: todo.id,
        //     title: todo.title,
        //     completed: false,
        //     editing: false,
        //   })
        // },


        setSections(state, sections) {
            state.sections = sections;
        },

        setQuestions(state, questions) {
            state.questions = questions
        },
        setPaginate(state, page) {
            state.paginate = page
        },
        setNewAnswer(state, data){
            state.questions[data.index].answer= data.answer
        },
        setLoading(state, status){
            state.loading=status
        },
        setDisabled(state, status){
            state.disabled= status
        },
        setShowSectionCompleted(state, data){
            state.showSectionCompleted.status= data.status
            state.showSectionCompleted.section= data.section
        },
        setPatientCode(state, code){
            state.patientCode= code;
        },
        setPatiendID(state, id){
            state.patiendID= id;
        },
        logout(state){
            // state.patiendID=null
            // state.patientCode=null
            // state.sections= null
            // state.personal=null

            state.token=null
            state.patientCode= null
            state.patiendID= null
            state.sections= null
            state.paginate= null
            state.questions= null
            state.loading= false
            state.disabled= false,
            state.personal=[],
            state.showSectionCompleted= { status: false, section: null }
        },
        setPersonal(state, data){
            state.personal= data
        }

        // goToSection(state, index){
        //   this.router.push({ path: 'questionsDashboard' })
        // }



    },
    actions: {
        // retrieveName(context) {
        //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        //   return new Promise((resolve, reject) => {
        //     axios.get('/user')
        //       .then(response => {
        //         resolve(response)
        //       })
        //       .catch(error => {
        //         reject(error)
        //       })
        //   })
        // },

        getQuestionsOfSection(context, page) {
            // let page= index+1
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get('/getquestions', {
                    params: {
                        id: context.getters.getPatiendID,
                        page: page
                    }
                })
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            })
        },

        getSections(context) {
            return new Promise((resolve, reject) => {
                axios.get('/getsections', {
                    params: {
                        patient_id: context.getters.getPatiendID,
                    }
                })
                    .then(function (response) {
                        // context.commit('setSections', response.data)
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        // console.log(error);
                        reject(error)
                    })

            })
        },
        saveAnswer(context, question) {
            // console.log(question)
            return new Promise((resolve, reject) => {
                axios.post('/saveanswer', {
                    id: question.id,
                    answer: question.answer,
                    patient: context.getters.getPatiendID,
                })
                .then(function (response) {
                    // console.log(response);
                    
                    resolve(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        getPersonalInfo(){

        },

        login(context, code){
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    code: code
                })
                .then(function (response) {
                    // console.log(response);
                    
                    resolve(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                });
            })

        },

        getPersonal(context, code){
            return new Promise((resolve, reject) => {
                axios.get('/getpersonal', {
                    params: {
                        id: context.getters.getPatiendID,
                    }
                })
                    .then(function (response) {
                        // context.commit('setSections', response.data)
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        // console.log(error);
                        reject(error)
                    })
            })

        }



    }
})
