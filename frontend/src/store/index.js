import { createStore } from 'vuex'
import TaskTracker from './modules/taskTracker'
import auth from './modules/auth'


const store = createStore({
  modules:{
    TaskTracker,
    auth
  }
})
export default store;