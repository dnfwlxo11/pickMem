import Vue from 'vue';
import Toasted from 'vue-toasted'

Vue.use(Toasted);

function toast(msg) {
    Vue.toasted.clear();
    Vue.toasted.show(msg, {
        theme: 'bubble',
        position: 'bottom-center',
        duration: 3000,
        type: 'error',
        singleton: true,
    })
}

export default {
    toast
}