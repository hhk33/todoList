<template>
    <div>
        <Left />
        <Tasks />
    </div>
</template>

<script>
import Tasks from "./Tasks";
import Left from "./Left";

export default {
    name: "List",
    data() {
        return {};
    },
    components: { Tasks, Left },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>