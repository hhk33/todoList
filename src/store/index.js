import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

const state = {
    group: "a",
    workTime: [0, 20, 60, 60, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    proList: [
        {
            id: '001',
            name: 'project1',
            list: [
                {
                    id: '001',
                    area: "To do",
                    pull: 1,
                    data: [
                        { title: "todo1", content: "123456" },
                        {
                            title: "todo2131618498498498213151615",
                            content: "123456",
                        },
                        {
                            title: "todo3",
                            content:
                                "1213646456651516516161321321465111321561315153456",
                        },
                    ],
                },
                {
                    id: '002',
                    area: "In Progress",
                    pull: 1,
                    data: [
                        { title: "Pro", content: "123456" },
                        { title: "Pro2", content: "123456" },
                        { title: "Pro3", content: "123456" },
                    ],
                },
                {
                    id: '003',
                    area: "Completed",
                    pull: 1,
                    data: [
                        { title: "com1", content: "123456" },
                        { title: "com2", content: "123456" },
                        { title: "com3", content: "123456" },
                    ],
                },
            ],
        },
        {
            id: '002',
            name: 'project2',
            list: [
                {
                    id: '001',
                    area: "To do",
                    pull: 1,
                    data: [
                        { title: "todo1", content: "123456" },
                        {
                            title: "todo2131618498498498213151615",
                            content: "123456",
                        },
                        {
                            title: "todo3",
                            content:
                                "1213646456651516516161321321465111321561315153456",
                        },
                    ],
                },
                {
                    id: '002',
                    area: "In Progress",
                    pull: 1,
                    data: [
                        { title: "Pro", content: "123456" },
                        { title: "Pro2", content: "123456" },

                    ],
                },
                {
                    id: '003',
                    area: "Completed",
                    pull: 1,
                    data: [
                        { title: "com1", content: "123456" },
                        { title: "com2", content: "123456" },

                    ],
                },
            ],
        },
        {
            id: '003',
            name: 'project3',
            list: [
                {
                    id: '001',
                    area: "To do",
                    pull: 1,
                    data: [
                        { title: "todo1", content: "123456" },
                        {
                            title: "todo2131618498498498213151615",
                            content: "123456",
                        },
                        {
                            title: "todo3",
                            content:
                                "1213646456651516516161321321465111321561315153456",
                        },
                    ],
                },
                {
                    id: '002',
                    area: "In Progress",
                    pull: 1,
                    data: [
                        { title: "Pro", content: "123456" },
                        { title: "Pro2", content: "123456" },

                    ],
                },
                {
                    id: '003',
                    area: "Completed",
                    pull: 1,
                    data: [
                        { title: "com1", content: "123456" },

                    ],
                },
            ],
        },],
}

const mutations = {
    ADDPROJECT(state, name) {
        let pro = {
            id: uuidv4(),
            name,
            list: [
                {
                    area: "To do",
                    pull: 1,
                    data: [],
                },
                {
                    area: "In Progress",
                    pull: 1,
                    data: [],
                },
                {
                    area: "Completed",
                    pull: 1,
                    data: [],
                },
            ],
        };
        state.proList.push(pro);
        console.log(pro);
    },
    ADDMODULE(state, item) {
        module = {
            area: item.name,
            pull: 1,
            data: [],
        };
        state.proList[item.proNum].list.push(module);
    },
    DELPROJECT(state, proNum) {
        state.proList.splice(proNum, 1);
    },
    DELMODULE(state, item) {
        state.proList[item.proNum].list.splice(item.index, 1);
    },
    ADDTASK(state, { proNum, index, name, content }) {
        state.proList[proNum].list[index].data.push({ title: name, content },)
    },
    DELTASK(state, { proNum, modNum, TaskNum }) {
        state.proList[proNum].list[modNum].data.splice(TaskNum, 1);
    },
    ADDWORKTIME(state, hour) {
        let num = state.workTime[hour] + 1;
        Vue.set(state.workTime, hour, num);
    }
}

const actions = {
    addProject({ commit }, name) {
        commit('ADDPROJECT', name);
    },
    addModule({ commit }, item) {
        commit('ADDMODULE', item);
    },
    delProject({ commit }, proNum) {
        commit('DELPROJECT', proNum);
    },
    delModule({ commit }, item) {
        commit('DELMODULE', item);
    },
    addTask({ commit }, item) {
        commit('ADDTASK', item);
    },
    delTask({ commit }, item) {
        commit('DELTASK', item);
    },
    addWorkTime({ commit }, hour) {
        commit('ADDWORKTIME', hour);
    }
}

const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})