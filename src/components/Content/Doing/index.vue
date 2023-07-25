<template>
    <div>
        <div class="content">
            <div class="block">
                <div class="text">
                    <span>{{ getTime }},</span>
                    <span>{{ getDate }}</span>
                </div>
                <div class="topBtn alter" @click="$router.push('/list')">
                    to List
                </div>
            </div>
            <div class="content1">
                <!-- 日历 -->
                <div class="block calender">
                    <el-calendar v-model="value" size="mini"> </el-calendar>
                </div>
                <div class="block chart">
                    <span>任务状况统计：</span>
                    <div id="chart1">暂无数据</div>
                </div>
                <div class="block chart">
                    <span>工作时间统计：</span>
                    <div id="chart2">暂无数据</div>
                </div>
            </div>
            <div class="content2">
                <!-- 计时器 -->
                <div class="block timer">
                    <h1>{{ formatTime }}</h1>
                    <div class="timerTxt">
                        <span>时</span>
                        <span>分</span>
                        <span>秒</span>
                    </div>
                    <div class="timerBtn">
                        <span @click="startTimer">Start</span>
                        <span @click="pauseTimer">Pause</span>
                        <span @click="stopTimer">Stop</span>
                    </div>
                </div>
                <!-- 任务选择器 -->
                <div class="block list">
                    <div class="select">
                        <span>Ptojects:</span>
                        <!-- 选择器1 -->
                        <el-select
                            v-model="selectValue1"
                            size="small"
                            @change="selectChange1"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in proList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                        <span>Modules:</span>
                        <!-- 选择器2 -->
                        <el-select
                            v-model="selectValue2"
                            size="small"
                            :disabled="disabled"
                            placeholder="请选择"
                            @change="drawLine1()"
                        >
                            <el-option
                                v-for="item in selectContent"
                                :key="item.id"
                                :label="item.area"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="task">
                        <!-- 走马灯 -->
                        <el-carousel
                            height="190px"
                            :autoplay="false"
                            indicator-position="outside"
                        >
                            <el-carousel-item
                                v-for="(item, index) in taskContent"
                                :key="index"
                            >
                                <div class="taskTop">
                                    <span class="point"></span>
                                    <p class="title">{{ item.title }}</p>
                                </div>
                                <p class="content">{{ item.content }}</p>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            //选择器2是否可用
            disabled: true,
            //选择器1的值
            selectValue1: "",
            //选择器2的值
            selectValue2: "",
            // setInterval id
            timerId: null,
            //计时器时间
            seconds: 0,
            //计时器是否暂停
            isPause: false,
            //日历日期
            value: new Date(),
        };
    },
    watch: {},
    computed: {
        //获取当前时间段
        getTime() {
            const words = ["早上好", "中午好", "晚上好"];
            let hour = new Date().getHours();
            if (hour >= 5 && hour <= 12) return words[0];
            else if (hour >= 13 && hour <= 16) return words[1];
            return words[2];
        },
        //获取当前年月日 星期
        getDate() {
            const weeks = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let week = weeks[date.getDay()];
            return year + "年" + month + "月" + day + "日 · " + week;
        },
        proList() {
            return this.$store.state.proList;
        },
        //选择器2内容
        selectContent() {
            if (this.selectValue1 == "") return [{ id: "0", area: "" }];
            let arr = this.proList.filter((item) => {
                return item.id == this.selectValue1;
            });
            return arr[0].list;
        },
        //走马灯内容
        taskContent() {
            if (this.selectValue2 == "") return [];
            let arr = this.selectContent.filter((item) => {
                return item.id == this.selectValue2;
            });
            return arr[0].data;
        },
        //计时器
        formatTime() {
            let hours = Math.floor(this.seconds / 3600);
            let minutes = Math.floor((this.seconds % 3600) / 60);
            let seconds = this.seconds % 60;
            return (
                hours.toString().padStart(2, "0") +
                " : " +
                minutes.toString().padStart(2, "0") +
                " : " +
                seconds.toString().padStart(2, "0")
            );
        },
        getOneDayHour() {
            let arr = [];
            for (let i = 0; i < 24; i++) {
                arr.push(i.toString());
            }
            let hour = new Date().getHours();
            return arr.slice(0, hour + 1);
        },
        workTime() {
            let arr = this.$store.state.workTime;
            let hour = new Date().getHours();
            return arr.slice(0, hour + 1);
        },
    },
    methods: {
        startTimer() {
            if (this.timerId == null || this.isPause == true) {
                this.timerId = setInterval(() => {
                    this.seconds++;
                    //每分钟更新chart2
                    if (this.seconds % 60 == 0) this.addWorkTime();
                }, 1000);
                this.isPause = false;
            }
        },
        async addWorkTime() {
            let hour = new Date().getHours();
            if (this.workTime[hour] < 60) {
                await this.$store.dispatch("addWorkTime", hour);
                this.drawLine2();
            }
        },
        pauseTimer() {
            clearInterval(this.timerId);
            this.timerId = null;
            this.isPause = true;
        },
        stopTimer() {
            clearInterval(this.timerId);
            this.timerId = null;
            this.seconds = 0;
        },
        drawLine1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart1"));
            let data = [];
            this.selectContent.forEach((item) => {
                let obj = { value: item.data.length, name: item.area };
                data.push(obj);
            });
            // 绘制图表
            myChart.setOption({
                legend: {
                    // 图例
                    right: "0%",
                    top: "30%",
                    orient: "vertical",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{b} : {c} ({d}%)",
                },
                series: [
                    {
                        type: "pie",
                        label: {
                            show: false,
                        },
                        right: "30%",
                        radius: "70%", //饼图半径
                        data,
                    },
                ],
            });
        },
        selectChange1() {
            this.disabled = false;
            this.drawLine1();
        },
        drawLine2() {
            this.charts = this.$echarts.init(document.getElementById("chart2"));
            this.charts.setOption({
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    top: "10%",
                    left: "6%",
                    right: "8%",
                    bottom: "5%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.getOneDayHour,
                },
                yAxis: {
                    type: "value",
                },

                series: [
                    {
                        name: "工作时间（分钟）：",
                        type: "bar",
                        data: this.workTime,
                    },
                ],
            });
        },
    },
    mounted() {
        this.drawLine2();
    },
};
</script>
<style lang='less' scoped>
@import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
.content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    padding-top: 68px;
    width: calc(100% - 60px);
    z-index: -1;

    .block {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 10px 30px;
        border-radius: 10px;
        border: 1px solid #7676765f;
        background: #fff;
        box-shadow: 0 0 2px 2px #7676763b;

        .text {
            flex: 1;
            display: inline-block;
            font-size: 22px;
            font-style: italic;
            font-weight: bold;

            span {
                display: block;
            }

            span:nth-child(2) {
                margin-top: 3px;
                font-size: 16px;
                font-weight: normal;
            }
        }

        .topBtn {
            display: inline-block;
            padding: 5px 18px;
            color: white;
            background: orange;
            border: 2px solid orange;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 500;
        }
    }

    .content1,
    .content2 {
        display: flex;
        margin-top: 15px;
        height: 240px;

        div + div {
            margin-left: 15px;
        }

        .calender ::v-deep {
            flex: 2;

            .el-calendar {
                height: 200px;
                margin-top: -15px;
                font-size: 13px;

                .el-calendar__header {
                    padding: 0 5px 5px 3px;
                }

                .el-calendar__body {
                    padding: 0;
                }

                thead {
                    display: none;
                }

                .el-calendar-table .el-calendar-day {
                    height: 28px;
                }
            }
        }

        .chart {
            flex: 1;
            flex-direction: column;

            #chart1,
            #chart2 {
                width: 100%;
                height: 80%;
                line-height: 180px;
                margin-top: 10px;
                text-align: center;
                color: #00000040;
            }
        }

        .timer {
            flex: 2;
            flex-direction: column;

            h1 {
                margin: 50px 0 0 0;
                font-size: 42px;
            }

            .timerTxt {
                margin-top: -5px;
                color: #949494;
                font-size: 13px;

                span + span {
                    margin-left: 75px;
                }
            }

            .timerBtn {
                margin: 30px 0 0 0;
                span {
                    display: inline-block;
                    border: 2px solid #67c23a;
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 8px;
                }

                span:nth-child(1):hover {
                    background: #67c23a;
                    color: #fff;
                }

                span:nth-child(2) {
                    border: 2px solid #e6a23c;
                }

                span:nth-child(2):hover {
                    background: #e6a23c;
                    color: #fff;
                }

                span:nth-child(3) {
                    border: 2px solid #f56c6c;
                }

                span:nth-child(3):hover {
                    background: #f56c6c;
                    color: #fff;
                }

                span + span {
                    margin-left: 30px;
                }
            }
        }

        .list {
            flex-direction: column;
            flex: 3;

            .select {
                display: flex;
                align-items: center;
                margin: 5px 0;

                span {
                    margin: 0 10px 0 30px;
                    font-style: italic;
                }
            }

            .task {
                width: 600px;

                .taskTop {
                    display: flex;
                    align-items: flex-start;
                    margin: 20px;

                    .point {
                        margin: 6px 10px 0 0;
                        width: 10px;
                        height: 10px;
                        background: orange;
                        border-radius: 10px;
                    }

                    .title {
                        width: 210px;
                        margin: 0;
                        font-size: 20px;
                        font-style: italic;
                        font-weight: bold;
                        word-wrap: break-word;
                    }
                }

                .content {
                    display: block;
                    width: 500px;
                    margin-left: 40px;
                    padding: 0;
                    font-size: 17px;
                    font-weight: normal;
                    color: rgb(82, 82, 82);
                    word-wrap: break-word;
                }

                .el-carousel__item {
                    width: 580px;
                    margin-right: 10px;
                    border: 3px solid rgba(255, 166, 0, 0.37);
                    border-radius: 10px;
                }
            }
        }
    }

    .content2 {
        height: 270px;
    }
}
</style>