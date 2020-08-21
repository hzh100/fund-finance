<template>
  <div class="counter">
    <h1>筛选器</h1>
    <p class="tips">😺 输入多种排序数据，筛选出交叉数据</p>
    <el-card class="box-card">
      <el-form ref="fundForm" :model="fundForm" label-width="100px" label-position="left">
        <el-form-item
          :label="`代码列表${idx + 1}`"
          align="left"
          v-for="(item, idx) in fundForm.list"
          :key="idx"
          :prop="'list.' + idx + '.code'"
          :rules="{
              required: true, message: '请输入 fund 代码', trigger: 'blur'
            }"
        >
          <el-input type="textarea" v-model="item.code"></el-input>
          <el-tooltip effect="dark" content="输入代码 “、” 隔开" placement="top-end" v-if="idx == 0">
            <el-button type="primary" @click="fundForm.list.push({code: ''})">添加</el-button>
          </el-tooltip>
          <el-button v-else @click="fundForm.list.splice(idx, 1)">删除</el-button>
        </el-form-item>

        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click.prevent="submitForm">计 算 结 果</el-button>

        <ul v-if="resList.length">
          <li v-for="(item, idx) in resList" :key="idx">
            <span v-if="resList.length !== 1">{{idx + 1}}、</span>
            {{item}}
            </li>
        </ul>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resList: [],
      fundForm: {
        list: [
          { code: '' },
          { code: '' },
          // { code: '通用航空、 大飞机、 小金属、 贬值受益、 航母概念、' },
          // { code: '大飞机、通用航空、航母概念、军民融合、航天航空' },
          // { code: '病毒防治、大飞机、食品行业、社保重仓、生物疫苗' },
        ],
      },
    };
  },

  props: [],

  computed: {},

  components: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    submitForm() {
      this.$refs.fundForm.validate((valid) => {
        if (valid) {
          this.resList = this.fundForm.list.reduce((prev, cur, idx, arr) => {
            let prevCode = Array.isArray(prev)
              ? prev
              : [...new Set(this.strToArr(prev.code))];
            let curCode = [...new Set(this.strToArr(cur.code))];
            return this.computeCross(prevCode.concat(curCode));
          });
        }
      });
    },

    strToArr(str, cut = "、") {
      return str.split(cut).reduce((prev, cur) => {
        if (cur) prev.push(cur.trim());
        return prev;
      }, []);
    },

    computeCross(arr) {
      let cross = new Set();

      arr.map((item, index) => {
        let lastIndexOfItem = arr.lastIndexOf(item);
        while (index !== lastIndexOfItem) {
          cross.add(item);
          arr.splice(lastIndexOfItem, 1);
          lastIndexOfItem = arr.lastIndexOf(item);
        }
      });
      if (!cross.size) cross.add('没有你想要的结果，谢谢！')
      return [...cross];
    },

    resetForm() {
      this.$refs.fundForm.resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.counter {
  min-height: 100vh;
  background-color: #cccccc61;
  h1 {
    margin: 0;
    padding-top: 20px;
  }
}

.tips {
  font-size: 13px;
  color: red;
}

.box-card {
  width: 80%;
  max-width: 888px;
  min-height: 500px;
  margin: auto;
}
.el-textarea {
  width: 80%;
  margin-right: 10px;
}

ul {
  padding-left: 100px;
  font-size: 28px;
  font-weight: bold;
  color: red;
  list-style: none;
  text-align: left;
  animation: font-style 1s infinite ease-in;
}

@keyframes font-style {
  0% {
    color: red;
    // font-size: 30px;
  }
  50% {
    color: #e610e0;
    // font-size: 28px;
  }
  100% {
    color: blue;
    // font-size: 30px;
  }
}
</style>