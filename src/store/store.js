import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://orion.com/api'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        patientCode: "a34a12588d6ca16e9766a9618daff229f484ef84",
        patiendID: "eyJpdiI6IlBpdVo3bUpZS1p6RXQyNFRka2gzTmc9PSIsInZhbHVlIjoicEpRYkFRczlKeG9vRFVvMzZMZkc1Zz09IiwibWFjIjoiMDc5MjllMzUyZmM3ZmYxNDg3NzFiODZiMjgxN2Q4Y2MwNjkzMWUwMDdjZTY3NGYxMTJlZmQ5NmFmZThiMjc3MCJ9",
        sections: null,
        paginate: null,
        questions: null,
        loading: false,
        disabled: false,
        personal: {name: 'Jason', apaterno: 'Torres', amaterno: 'Luis'},
        showSectionCompleted: { status: false, section: null },
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
        }

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

        }



    }
})
