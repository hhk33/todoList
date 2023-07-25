import Mock from "mockjs"
import list from "./list.json"

Mock.mock("/mock/list", { code: 200, data: list });