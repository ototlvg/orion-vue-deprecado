import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// axios.defaults.baseURL = 'http://starforce.xyz/api'
// axios.defaults.baseURL = 'http://orion.com/api'
axios.defaults.baseURL = 'http://localhost:4200/api'

// 'http://localhost:4200/api/admin'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
// axios.defaults.params['energia'] = 'kakaroto'

export const store = new Vuex.Store({
    state: {
        code: sessionStorage.getItem('access_code') || null,
        // paginate: null,
        // questions: [],
        // st: null,
        // rememberCode: null,
        // checkFinalSection: false,
        sections: null,
        loading: false,
        disabled: false,
        personal: [{"id":2,"name":"Prueba","apaterno":"Prueba","amaterno":"Prueba","gender":2,"marital_status":6,"birthday":"1972-10-11","job":2,"email":null,"survey_available":"eyJpdiI6IklyMnk2YUw3djJuRkJiRlNJS3hDa2c9PSIsInZhbHVlIjoiUGlNcVAxbGlUN0h4OVpRa3BJcmVGZz09IiwibWFjIjoiZDMzNDRjOWE0N2RhYmYwZWFlYTg4ZDZmZTljNTllMjhmMzEyYmNmNTBiMjA2N2E1NzA2NDE5MmQ3YTljMmYwYSJ9","completed_surveys":"eyJpdiI6IkFTZm5yZmlDSExzZkY2YmR3ZGxIS3c9PSIsInZhbHVlIjoiWWU5WG5GSFVMSGNaUnhyVnZFa2k3Zz09IiwibWFjIjoiM2M3ODQ0ZTMzNDk1NTUyYTgwN2I2ZGU2YzBmMmY2MjE0M2EzYTZlNWE1ZjY3NzlmMjRlOTI1MjU4ZDYwZGY2ZCJ9"}],
        showMessageSectionCompleted: { status: false, section: null },
        sectionsData: [],
        sectionData: null,
        homeAlreadyFirstLoaded: false
    },
    getters: {
        getSections(state) {
            return state.sections
        },

        getLoading(state){
            return state.loading
        },
        getDisabled(state){
            return state.disabled
        },
        getShowMessageSectionCompleted(state){
            return state.showMessageSectionCompleted
        },
        getPersonal(state){
            return state.personal
        },
        getPersonalObj(state){
            return state.personal[0]
        },

        getSectionsData(state){
            return state.sectionsData
        },
        getSectionData(state){
            return state.sectionData
        },
        getHomeAlreadyFirstLoaded(state){
            return state.homeAlreadyFirstLoaded
        },
        getCode(state){
            return state.code
        }
    },
    mutations: {
        setSections(state, sections) {
            state.sections = sections;
        },

        setLoading(state, status){
            state.loading=status
        },
        setDisabled(state, status){
            state.disabled= status
        },
        setShowMessageSectionCompleted(state, data){
            state.showMessageSectionCompleted.status= data.status
            state.showMessageSectionCompleted.section= data.section
        },

        logout(state){
            state.sections= null
            state.homeAlreadyFirstLoaded = false
            state.paginate= null
            state.questions= null
            state.loading= false
            state.disabled= false,
            state.personal=[],
            state.showMessageSectionCompleted= { status: false, section: null }
        },

        setPersonal(state, data){
            state.personal= data
        },

        setSectionsData(state, data){
            state.sectionsData.push(data)
        },

        setSectionData(state, data){
            state.sectionData = JSON.parse(JSON.stringify(data))
        },

        setAnswerOfQuestion(state, data){
            let questions = state.sectionData.sectionStatus
            const question = (element) => element.question == data.question;
            let index = questions.findIndex(question)

            questions[index].answer=data.answer
            // questions[index]
            // console.log()
        },

        setNewSectionsStatus(state, page){
            let index = page-1
            state.sections[index] = 1
        },

        setHomeAlreadyFirstLoaded(state, status){
            state.homeAlreadyFirstLoaded = status
        },
        setCode(state, code){
            state.code = code
        },
        setFinished(state){
            state.sections = null
            state.homeAlreadyFirstLoaded = false
        }



    },
    actions: {
        getSections(context) {
            let code = this.getters.getCode
            return new Promise((resolve, reject) => {
                axios.get('/getsections', {
                    params: {
                        code: code
                    }
                })
                    .then(function (response) {
                        // context.commit('setSections', response.data)
                        // console.log(response.data);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        reject(error)
                    })

            })
        },

        getSectionData(context, page){
            let code = this.getters.getCode
            return new Promise((resolve, reject) => {
                axios.get('/getsectiondata', {
                    params: {
                      page: page,
                      code: code
                    }
                  })
                  .then(function (response) {
                    // console.log(response.data);
                    resolve(response.data)
                  })
                  .catch(function (error) {
                    reject(error.response)

                  })
                  .then(function () {
                    // always executed
                  });
            })

        },

        saveAnswersInServer(context, obj){
            // console.log('Pagina: ' + obj.page)
            let code = this.getters.getCode
            let questionsAnswers = context.getters.getSectionData.sectionStatus;
            // console.log(questionsAnswers)
            let data = questionsAnswers.filter( element => element.answered==false )
            // console.log(data)
            // QSAF1-1
            return new Promise((resolve, reject) => {
                axios.post('/saveanswers', {data: data, lastSection: obj.lastSection, code:code})
                .then(function (response) {
                    console.log(response.data);
                    resolve(response.data)
                })
                .catch(function (error) {
                    // console.log('toy triste')
                    // console.log(error.response.data);
                    // reject(error.response.data)
                    reject(error.response)
                });
            })
        },

        // Para usuarios no logueados


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

        getRegisterData(context){
            return new Promise((resolve, reject) => {
                axios.get('/register')
                .then(function (response) {
                  // handle success
                //   console.log(response.data);
                  resolve(response.data)
                })
                .catch(function (error) {
                  // handle error
                //   console.log(error);
                  reject(error)
                })
                .then(function () {
                  // always executed
                });
            })
        },

        storeUser(context, data){
            return new Promise((resolve, reject) => {
                axios.post('/register', data)
                .then(function (response) {
                    // console.log(response);
                    resolve(response.data)
                })
                .catch(function (error) {
                    // console.log('toy triste')
                    // console.log(error.response.data);
                    // reject(error.response.data)
                    reject(error.response)
                });

            })

        },


    }
})