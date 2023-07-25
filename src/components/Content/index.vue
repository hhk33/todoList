<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import List from "@/components/Content/List";
import Doing from "@/components/Content/Doing";

export default {
    name: "Content",
    components: { List, Doing },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>