<template>
    <div class="list">
        <span>Add New Project</span>
        <div class="button" @click="addProject">+</div>
        <span>My Project </span>
        <div
            v-for="(pro, index) in proList"
            :key="index"
            :class="['button', 'project', act === index ? 'active' : '']"
            @click="showPro(index)"
        >
            {{ pro.name }}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    data() {
        return {
            act: 0,
        };
    },
    computed: {
        ...mapState(["proList"]),
    },
    methods: {
        addProject() {
            let pro = prompt("new Project:");
            if (pro.length > 6) pro = pro.slice(0, 6) + "...";
            this.$store.dispatch("addProject", pro);
        },
        showPro(index) {
            this.$bus.$emit("getPro", index);
            this.act = index;
        },
    },
    mounted() {},
};
</script>
<style lang="less" scoped>
.list {
    position: fixed;
    width: 200px;
    height: calc(100% - 50px);
    margin-top: 50px;
    overflow: auto;
    overflow-y: 0;
    border-right: 3px solid #c6c6c6;
    background: #fff;

    span {
        display: block;
        margin: 30px 20px;
        font-style: italic;
        font-weight: bold;
    }

    .button {
        margin: 0 20px;
        width: 140px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: bold;
        border-radius: 5px;
        background: rgb(203, 203, 203);
    }

    .project {
        width: 136px;
        height: 28px;
        line-height: 28px;
        margin-bottom: 20px;
        font-weight: normal;
        border: 2px solid orange;
        background: #fff;
    }

    .active {
        background: orange;
        color: #fff;
    }
}

.list::-webkit-scrollbar {
    width: 5px;
}

.list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(158, 158, 158);
}

.list::-webkit-scrollbar-track {
    background: #ededed;
}
</style>