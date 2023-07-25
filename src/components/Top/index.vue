<template>
    <div class="top">
        <span>LogoIsHere</span>
    </div>
</template>

<script>
export default {
    name: "Top",
};
</script>
<style lang='less' scoped>
.top {
    position: fixed;
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 5px gray;
    background-color: rgba(255, 211, 128);
    z-index: 22;

    span {
        display: block;
        width: 150px;
        height: 50px;
        line-height: 50px;
        margin-left: 30px;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>