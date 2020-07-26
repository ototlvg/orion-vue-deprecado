import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// axios.defaults.baseURL = 'http://starforce.xyz/api'
axios.defaults.baseURL = 'http://orion.com/api'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        sections: null,
        paginate: null,
        questions: [],
        loading: false,
        disabled: false,
        personal: [{"id":2,"name":"Prueba","apaterno":"Prueba","amaterno":"Prueba","gender":2,"marital_status":6,"birthday":"1972-10-11","job":2,"email":null,"survey_available":"eyJpdiI6IklyMnk2YUw3djJuRkJiRlNJS3hDa2c9PSIsInZhbHVlIjoiUGlNcVAxbGlUN0h4OVpRa3BJcmVGZz09IiwibWFjIjoiZDMzNDRjOWE0N2RhYmYwZWFlYTg4ZDZmZTljNTllMjhmMzEyYmNmNTBiMjA2N2E1NzA2NDE5MmQ3YTljMmYwYSJ9","completed_surveys":"eyJpdiI6IkFTZm5yZmlDSExzZkY2YmR3ZGxIS3c9PSIsInZhbHVlIjoiWWU5WG5GSFVMSGNaUnhyVnZFa2k3Zz09IiwibWFjIjoiM2M3ODQ0ZTMzNDk1NTUyYTgwN2I2ZGU2YzBmMmY2MjE0M2EzYTZlNWE1ZjY3NzlmMjRlOTI1MjU4ZDYwZGY2ZCJ9"}],
        showMessageSectionCompleted: { status: false, section: null },
        st: null,
        rememberCode: null,
        checkFinalSection: false,
        sectionsData: [],
        sectionData: null,
        homeAlreadyFirstLoaded: false
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
        getShowMessageSectionCompleted(state){
            return state.showMessageSectionCompleted
        },
        getPersonal(state){
            return state.personal
        },
        getRememberCode(state){
            return state.rememberCode
        },
        getCheckFinalSection(state){
            return state.checkFinalSection
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
            state.questions.push(questions)
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
        setShowMessageSectionCompleted(state, data){
            state.showMessageSectionCompleted.status= data.status
            state.showMessageSectionCompleted.section= data.section
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
        },

        setRememberCode(state, code){
            state.rememberCode= code
        },

        setCheckFinalSection(state){
            state.checkFinalSection= true
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
        }



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
                axios.get('/getquestionsprime', {
                    params: {
                        id: context.getters.getPatiendID,
                        page: page
                    }
                })
                    .then(function (response) {
                        // console.log(response.data);
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
                        // patient_id: context.getters.getPatiendID,
                    }
                })
                    .then(function (response) {
                        // context.commit('setSections', response.data)
                        // console.dir(response.data);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        reject(error)
                    })

            })
        },
        
        saveAnswer(context, question) {
            // console.log(question.checkLastSection)
            return new Promise((resolve, reject) => {
                axios.post('/saveanswer', {
                    id: question.id,
                    answer: question.answer,
                    patient: context.getters.getPatiendID,
                    checkLastSection: question.checkLastSection,
                    completedSurveys: context.getters.getPersonalObj.completed_surveys,
                    surveyAvailable: context.getters.getPersonalObj.survey_available
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

        // createSections(context){
        //     return new Promise((resolve, reject) => {
        //         axios.get('/createsections', {
        //             params: {
        //               patient_id: context.getters.getPatiendID
        //             }
        //           })
        //           .then(function (response) {
        //             // console.log(response.data);
        //             resolve(response.data)
        //           })
        //           .catch(function (error) {
        //             console.log(error);
        //           })
        //           .then(function () {
        //             // always executed
        //           });  
                

        //     })
        // },

        getSectionData(context, page){
            return new Promise((resolve, reject) => {
                axios.get('/getsectiondata', {
                    params: {
                      page: page
                    }
                  })
                  .then(function (response) {
                    // console.log(response.data);
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

        saveAnswersInServer(context, obj){
            console.log('Pagina: ' + obj.page)
            let questionsAnswers = context.getters.getSectionData.sectionStatus;
            // console.log(questionsAnswers)
            let data = questionsAnswers.filter( element => element.answered==false )
            // console.log(data)
            // QSAF1-1
            return new Promise((resolve, reject) => {
                axios.post('/saveanswers', {data: data, lastSection: obj.lastSection})
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
        }



    }
})
