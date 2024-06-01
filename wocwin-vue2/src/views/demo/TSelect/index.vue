<template>
  <t-layout-page>
    <!-- <t-layout-page-item>
      <h4 style="margin-top: 0;">单选</h4>
      <t-select
        placeholder="请选择工序"
        v-model="selectVlaue"
        :optionSource="stepList"
        valueKey="label"
        @change="($event,'single')"
      />
    </t-layout-page-item> -->
    <t-layout-page-item>
      <h4 style="margin-top: 0;">ele单选</h4>
      <el-select
        :optionSource="stepList"
        placeholder="请选择工序"
        v-model="selectVlaue"
        valueKey="label"
        @change="($event,'single')"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <h4 style="margin-top: 0;">多选</h4>
      <t-select
        placeholder="请选择工序"
        v-model="selectVlaue1"
        multiple
        :optionSource="stepList1"
        valueKey="label"
        @change="selectChange($event,'multiple')"
      />
    </t-layout-page-item>
    <div class="components-container" ref="ok">子应用的样式</div>
    <div>
      <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        ref="pop"
      >  
        <el-button slot="reference">click 激活</el-button>
      </el-popover>
      字数
    </div>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      popShow: false,
      selectVlaue1: null,
      stepList1: [
        { label: '开始' }, { label: 'POSUI' }, { label: '11' }, { label: 'GX123' }, { label: '烘干破碎' }, { label: '车间仓库' }, { label: 'ui3333' }, { label: 'hhh333' }],
      selectVlaue: null,
      stepList: [
        { label: '开始' }, { label: 'POSUI' }, { label: '11' }, { label: 'GX123' }, { label: '烘干破碎' }, { label: '车间仓库' }, { label: 'ui3333' }, { label: 'hhh333' }]
    }
  },
  methods: {
    selectChange(val, type) {
      if (type === 'multiple') {
        console.log(`多选`, val, this.selectVlaue1)
      } else {
        console.log(`单选`, val, this.selectVlaue1)
      }
    }
  },
  mounted() {
  }
}
</script>