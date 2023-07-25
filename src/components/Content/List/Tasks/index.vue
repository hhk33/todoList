<template>
    <div class="content">
        <span class="title">All Tasks</span>
        <div class="topBtn" @click="addModule">增加新模块</div>
        <div class="topBtn" @click="delProject">删除该项目</div>
        <div class="topBtn alter" @click="$router.push('/doing')">to Work</div>

        <div class="arealist">
            <div
                class="area"
                v-for="(item, index) in proList[proNum].list"
                :key="index"
            >
                <span>{{ item.area }}</span>
                <div class="areaBtn" @click="delModule(index)">删除</div>
                <div class="areaBtn" 
                @click="pullBtn(item)"  
                v-text="item.pull == 1 ? '收起' : '下拉'"></div>
                <div class="todos">
                    <draggable
                        class="todo"
                        v-model="proList[proNum].list[index].data"
                        :group="group"
                        animation="300"
                        force-fallback="true"
                    >
                        <div
                            class="task"
                            v-for="(task, index1) in item.data"
                            :key="index1"
                            v-show="item.pull == 1 || index1 == 0"
                        >
                            <div class="taskTop">
                                <span class="point"></span>
                                <p class="title">{{ task.title }}</p>
                                <div
                                    class="delBtn"
                                    @click="delBtn(index, index1)"
                                >
                                    -
                                </div>
                            </div>
                            <p class="content">{{ task.content }}</p>
                        </div>
                    </draggable>
                </div>
                <div class="addBtn" @click="addTask(index)">+</div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "Tasks",
    components: {
        draggable,
    },
    data() {
        return {
            proNum: 0,
            group: "a",
        };
    },
    computed: {
        proList() {
            let proList = this.$store.state.proList;
            if (proList.length == 0) return [{ list: [] }];
            return proList;
        },
    },
    methods: {
        pullBtn(item) {
            item.pull = Math.abs(item.pull - 1);
        },
        delBtn(index, index1) {
            this.$store.dispatch("delTask", {
                proNum: this.proNum,
                modNum: index,
                TaskNum: index1,
            });
        },
        setProNum(num) {
            this.$set(this, "proNum", num);
        },
        addModule() {
            let name = prompt("new Model:");
            if (name.length > 8) name = name.slice(0, 8) + "...";
            this.$store.dispatch("addModule", { proNum: this.proNum, name });
        },
        async delProject() {
            await this.$store.dispatch("delProject", this.proNum);
            this.proNum = 0;
        },
        delModule(index) {
            this.$store.dispatch("delModule", { proNum: this.proNum, index });
        },
        addTask(index) {
            console.log(index);
            let name = prompt("Task Name:");
            let content = prompt("Task Content:");
            this.$store.dispatch("addTask", {
                proNum: this.proNum,
                index,
                name,
                content,
            });
        },
    },
    mounted() {
        this.$bus.$on("getPro", (index) => {
            this.setProNum(index);
        });
    },
};
</script>
<style lang="less"  scoped>
.content {
    margin-left: 203px;
    padding-top: 50px;
    width: calc(100% - 205px);
    z-index: -1;

    .title {
        display: inline-block;
        margin: 25px 0 0 60px;
        font-size: 22px;
        font-style: italic;
        font-weight: bold;
    }

    .topBtn {
        display: inline-block;
        padding: 1px 10px;
        margin-left: 40px;
        border: 2px solid orange;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        color: gray;
    }

    .alter {
        float: right;
        overflow: hidden;
        margin: 24px 100px 0 0;
        z-index: -1;
        padding: 5px 15px;
        color: white;
        background: orange;
    }

    .arealist {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .area {
            display: inline-block;
            width: 330px;
            margin: 50px 50px 0px 50px;
            padding: 10px 0;
            background: #f1f1f1;
            border-radius: 20px;

            span {
                display: inline-block;
                margin: 0 20px;
                font-size: 19px;
                font-style: italic;
                font-weight: bold;
            }

            .areaBtn {
                display: block;
                float: right;
                overflow: hidden;
                margin-right: 20px;
            }

            .todos {
                width: 280px;
                margin: 10px auto;

                .todo {
                    min-height: 80px;
                }
                .task {
                    width: 260px;
                    padding: 10px;
                    background: #fff;
                    border-radius: 10px;
                    border: 1px solid gray;

                    .taskTop {
                        display: flex;
                        align-items: flex-start;

                        .point {
                            margin: 6px 10px 0 0;
                            width: 8px;
                            height: 8px;
                            background: orange;
                            border-radius: 10px;
                        }

                        .title {
                            width: 210px;
                            margin: 0;
                            font-size: 16px;
                            word-wrap: break-word;
                        }

                        .delBtn {
                            display: block;
                            float: right;
                            overflow: hidden;
                            margin-left: 10px;
                            font-weight: bold;
                            font-size: 18px;
                        }
                    }
                }

                .task + .task {
                    margin-top: 10px;
                }

                .content {
                    display: block;
                    width: 240px;
                    margin: 5px 10px 0 10px;
                    padding: 0;
                    font-size: 13px;
                    font-weight: normal;
                    color: grey;
                    word-wrap: break-word;
                }
            }

            .addBtn {
                width: 280px;
                height: 28px;
                line-height: 28px;
                margin: 5px auto 0 auto;
                text-align: center;
                border-radius: 15px;
                font-weight: bolder;
                font-size: 18px;
                background: #c9c9c9;
            }
        }
    }
}
</style>