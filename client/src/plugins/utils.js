import Vue from 'vue';
import Toasted from 'vue-toasted'

Vue.use(Toasted);

function toast(msg) {
    return Vue.toasted.show(msg, {
        theme: 'bubble',
        position: 'bottom-center',
        duration: 3000,
    })
}

export default {
    toast
}