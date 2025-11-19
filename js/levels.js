export default {
    props: ['levelOrder'], // must match the template prop name

    data() {
        return {
            levels: [],
            selected: 0
        };
    },

    async mounted() {
        const loadedLevels = [];

        for (const levelName of this.levelOrder) {
            const res = await fetch(`./aptba/data/${levelName}.json`);
            const data = await res.json();
            loadedLevels.push(data);
        }

        this.levels = loadedLevels;
    },

    template: `
        <div>
            <div>
                <button 
                    v-for="(level, index) in levels" 
                    :key="level.id"
                    @click="selected = index"
                >
                    #{{ index + 1 }} - {{ level.name }}
                </button>
            </div>

            <div v-if="levels[selected]">
                <h2>{{ levels[selected].name }}</h2>
                <p>Creator: 
                    <span v-if="Array.isArray(levels[selected].creator)">
                        {{ levels[selected].creator.join(', ') }}
                    </span>
                    <span v-else>
                        {{ levels[selected].creator }}
                    </span>
                </p>
                <p>Verifier: {{ levels[selected].verifier }}</p>
                <p>ID: {{ levels[selected].id }}</p>
            </div>
        </div>
    `
};
