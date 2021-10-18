import api from '../../api/image'

const state = {
    Files: []
};

const getters = {
    allFiles: state => state.Files
};

const actions = {
    fetchFiles() {

    }
};

const mutations = {
    setFiles: (state, Files) => {
        state.Files = Files
    }
};