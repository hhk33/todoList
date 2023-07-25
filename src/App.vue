<template>
    <div id="app">
        <Top />
        <Content />
    </div>
</template>

<script>
import Top from "@/components/Top";
import Content from "@/components/Content";

export default {
    name: "App",
    components: {
        Top,
        Content,
    },
};
</script>

<style lang="less">
html,
body {
    margin: 0;
    height: 100%;
    width: 100%;
}
</style>
