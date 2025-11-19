import Levels from './levels.js';

async function init() {
    // Fetch the order of levels
    const res = await fetch('./data/_list.json');
    const levelOrder = await res.json();

    const app = Vue.createApp({
        components: { Levels },
        template: `<Levels :level-order="levelOrder" />`, // Notice the correct prop name
        data() {
            return { levelOrder };
        }
    });

    app.mount('#app');
}

init();
