import axios from 'axios'

export default {
    actions: {
        axiosUsers(ctx){
            axios.get('http://localhost:3000/users').then(response => {
                ctx.commit('updateUsers', response.data);
            })
        },
        async deleteUser(ctx, item) {
            await axios.delete(`http://localhost:3000/users/${item.id}`);
            axios.get('http://localhost:3000/users').then(response => {
                ctx.commit('updateUsers', response.data);
            })
        },
        async updateUser(ctx, users) {
            await axios.delete(`http://localhost:3000/users/${users.id}`);
            await axios.post('http://localhost:3000/users', users);
            axios.get('http://localhost:3000/users').then(response => {
                ctx.commit('updateUsers', response.data);
            })
        },
        async addUser(ctx, user) {
            await axios.post('http://localhost:3000/users', user)
            axios.get('http://localhost:3000/users').then(response => {
                ctx.commit('updateUsers', response.data)
            })
        },
        setToken(ctx, login, token = null){
            if(token === null) {
                token = Math.random().toString(36).substr(2)
                localStorage.setItem('token', token)
            }
            localStorage.setItem('login', login)
            ctx.commit('setToken', token)
            ctx.commit('setLogin', login)
        },
        logOut(ctx) {
            console.log('hello')
            localStorage.removeItem('token')
            localStorage.removeItem('login')
            ctx.commit('setToken', '')
            ctx.commit('setLogin', '')
        }
    },
    mutations: {
        updateUsers(state, users){
            state.users = users;
        },
        deleteUser(state, index) {
           console.log(state.users.splice(index, 1))
        },
        addUser(state, user) {
            state.users.push(user)
        },
        setToken(state, token) {
            state.token = token
        },
        setLogin(state, login) {
            state.login = login
        }
    },
    state: {
        users: [],
        token: '',
        login: ''
    },
    getters: {
        allUsers(state){
            return state.users
        },
        token(state){
            return state.token
        },
        login(state){
            return state.login
        }
    }
}