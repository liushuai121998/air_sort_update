<template>
  <div class='wrap '>
    <div class='contentWrap'>
        <div class='theadWrap'>
           <table id='tab' border='1' cellpadding='0' cellspacing='0' class=" scrollX">
              <thead>
                  <tr>
                    <th v-for='(item,index) in thLeftData' :width= 'item.width' :key='index' @mousedown='sortTable($event, index)' class='change_th'>
                      <span>{{item.title}}</span><div class='ww'></div>
                    </th>
                  </tr>
              </thead> 
           </table>
        </div> 
        <div class='tbodyWrap'>
          <table border='1' cellpadding='0' cellspacing='0' class='scrollTbody scrollX'>  
                <tbody class='tbodyScroll'>
                  <tr v-for='(tdItem, index) in tdData' :class="{active: tdItem['task'] === '补班', delay: tdItem['flightState'] === '到达/延误', preFlight: tdItem['flightState'] === '前起/无'}" @click='selectTr($event,index)' :key='index'>
                    <td :style='{width: thLeftData[0]["width"]}'>{{index + 1}}</td>
                    <td v-for='(str, key, i) in tdItem' :style='{width: backData[key]}' :class='{uniqueClass: key === "flightState"}' :key='i'>{{str}}</td>
                  </tr>  
               </tbody>
          </table>
        </div>
    </div>
    <div class='rightWrap'>
      <div class='theadWrap'>
        <table border='1' cellpadding='0' cellspacing='0'>
          <thead>
                <tr>
                  <th v-for='(item, index) in thRightData' :style='{width: item.width}' :colspan='item.col' :key='index'>
                    <div>{{item.title}}</div>
                  </th>
                </tr>
          </thead>
          
        </table>
      </div>
      <div class='tbodyWrap'>
        <table border='1' cellpadding='0' cellspacing='0'  class='scrollTbody'>
            <tbody class='tbodyScroll'>
                <tr v-for='(item, index) in fixData' :key='index'>
                  <td v-for='(str, key, i) in item' :style='{width: fixTdWidth[key]}' :class='{fixDataBac: randomIndexArr.indexOf(index) > 0, noFixDataBac: str===strRandomArr[Math.round(Math.random()*2)]}' :key='i'>{{str}}</td>
                </tr>
          </tbody>
        </table>
      </div>
      <div class='fixed-x-bar'></div>
    </div>    
    <scroll-bar></scroll-bar>
    <right-content></right-content>
    <scroll-x-bar></scroll-x-bar>
  </div>
  
</template>
<script>
  import scrollBar from './scrollBar'
  import rightContent from './rightContent'
  import scrollXBar from './scrollXBar'
  import $scrollBar from '../js/jqueryScrollBar'
  export default {
    data () { 
      return {
        thLeftData: [],
        thRightData: [],
        tdData: null,
        fixData: null,
        temp: null,
        fixTemp: null,
        fixTdWidth: {
          "enterStart": "54px",
          "enterFinish": "54px",
          "enterRemove1": "58px",
          "enterRemove2": "55px",
          "makeFinish1": "53px",
          "makeFinish2": "55px"
        },
        localArr: [],
        // fixData随机显示颜色的索引
        randomIndexArr: [],
        strRandomArr: [],
        // 选中tr的indexArr
        selectIndexArr: [],
        // 选中的tr
        selectTrArr: [],
      
      }
    },
    created () {
      // this.$http.get('/api/data')
      //   .then(res => {
      //     // 请求的数据
      //     this.tdData = res.data.data
      //   })
      
      this.tdData = this.$store.state.data.contentData

      // this.$http.get('/api/fix')
      //   .then(res => {
      //     this.fixData = res.data.data
      //   })

      this.fixData = this.$store.state.data.fixData

        // fixData中的tr随机
      this.randomIndexArr = this.$store.state.arr 
      // console.info(this.randomIndexArr.indexOf(44))  
      // fixData中的tr中的td随机
      this.strRandomArr = this.$store.state.strRandomArr 

 
      
      this.thLeftData = this.$store.state.thLeftData
      
      this.thRightData = this.$store.state.thRightData

    },
    mounted () {

      // this.setInter()
      this.$store.dispatch('RANDOM_DATA')
      $scrollBar.widthChange('tab', this)


    },
    methods: {
      // 检索高亮 
      // filterStr(str,index,key){
      //   if(key === 'airPos'){
      //     // 搜索机位 
      //      return this.$store.state.data.contentData[index].airPos.search(this.$store.state.inputValue) === 0 ? 
      //  "<span style='background: yellow; color: black; font-size: 18px'>" + this.$store.state.inputValue + "</span>" 
      //  + this.$store.state.data.contentData[index].airPos.substr(this.$store.state.inputValue.length) : this.$store.state.data.contentData[index][key]
      //   }else{
      //     return this.$store.state.data.contentData[index][key]
      //   }
      // },
      setInter () {
        this.timeId1 = setInterval(() => {
          this.$http.get('/api/data')
          .then(res => {
            this.tdData = res.data.data
            //this.tdData = this.$store.state.data
            // 随机数
            let random = Math.round(Math.random() * 150)
            let randomArr = ['flightState', 'task']
            let randomStr = randomArr[Math.round(Math.random())]
            // let randomFlight = ['到达/延误', '到达/无', '前起/无']
            let randomObj = {
              'flightState': '到达/延误',
              'task': '补班'
            }
            /// 模拟动态数据的变化(结合离线存储技术localStorage)
            for(var n in this.tdData[random]){
              if(n === randomStr){
                let local = JSON.parse(localStorage.getItem('addItem'))
                
                if(local){
                  for(var i=0, len=local.length; i<len; i++){
                    this.tdData[(local[i].random)][(local[i].n)] = randomObj[(local[i].randomStr)]
                  }
                  // 存储的数据大于10条, 清除定时器
                  if(local.length > 10){
                  clearInterval(this.timeId1)
                }
                }
                this.tdData[random][n] = randomObj[randomStr]
                let obj = {random, n, randomStr}
                this.localArr.push(obj)
                localStorage.setItem('addItem', JSON.stringify(this.localArr))
                }
            }
          })
        }, 5000)
      },
      /*选中的tr*/
      selectTr (ev,index) {

        ev = ev || event
        console.log(ev.target)
        // console.log (ev,index)
        console.log(this.$store.state.isClickDel, 'this.$store.state.isClickDel')
        if(this.$store.state.isClickDel) {
          // 删除之后将this.selectIndexArr, this.selectTrArr 置为空数组
          this.selectIndexArr = []
          this.selectTrArr = []
          this.$store.commit('CHANGE_CLICK_STATE')
        }

        // classList属性 toggle()切换(添加返回true 删除返回false) add()添加 remove()删除
         if(ev.target.parentNode.classList.toggle ('selectTr')){
            this.selectIndexArr.push(index)
            this.selectTrArr.push(ev.target.parentNode)
         }else{
            // this.selectIndexArr.indexOf(index) >= 0 && this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
            // this.selectTrArr.indexOf(ev.target.parentNode) >= 0 && this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)
            this.selectIndexArr.splice(this.selectIndexArr.indexOf(index),1)
            this.selectTrArr.splice(this.selectTrArr.indexOf(ev.target.parentNode),1)

         }
         console.log(this.selectIndexArr, 'this.selectIndexArr')
         //传过去
         this.$store.commit('SELECT_TR_INDEX',{index: this.selectIndexArr, arr: this.selectTrArr})
         

      },
      // 表格排序
      sortTable (ev,index) {
        this.$store.commit('SORT_TABLE',Object.keys(this.$store.state.data.contentData[0])[index-1])

        // 解决v-for强制刷新列表 this.$forceUpdate()
        console.log(this.$store.state.data.contentData)
        //this.$forceUpdate()
      },  
    },
    computed: {
      backData () {
          this.temp = {
            "date": "12/21",
            "spot": "-",
            "mainFlightNum": "MU5444",
            "shareFlightNum": "MU3464/5435",
            "airplaneNum": "B6971",
            "type": "国内",
            "airType": "333",
            "task": "正班",
            "flightState": "到达/无",
            "flightRoute": "沪-蓉-沪",
            "airPos": "135",
            "boardingGate": "135",
            "calCome": "2100",
            "calLeave": "2100",
            "preLeave": "2100",
            "relLeave": "-",
            "prePos": "-",
            "race": "02R/"
        }
          let count = 0
          for(var n in this.temp){
            count++
            let temp = this.$store.state.thLeftData[count]
            this.temp[n] = temp.width
          }
          // console.log(this.tdData)
          return this.temp
      }
    },
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar, 'right-content': rightContent}
  }
</script>
<style>
  .wrap{
    margin-left: 60px;
    width: calc(100% - 60px);
  }
  .wrap:after{
    content: '';
    display: block;
    clear: both;
  }
  .contentWrap {
    /*width: 1376px;*/
    /*width: 75%;*/
    overflow: hidden;
  }
  /*.rightWrap {
    width: 15%;
  }*/
  /*.rightWrap .theadWrap, .rightWrap .tbodyWrap, .rightWrap .tbodyWrap table, .rightWrap .tbodyWrap tr, .rightWrap .theadWrap tr{
    width: 100%;
  }*/
  .contentWrap, .rightWrap{
    float: left;
  }
  .theadWrap{
    position: relative;
    z-index: 99;
  }
  .scrollTbody{
    position: relative;
    z-index: 9;
    left: 0;
    top: 0;   
  }
  .tbodyWrap {
    /*width: 100%;*/
    overflow: hidden;
  }
  table {
    border-collapse: collapse;
    /*border: 1px solid #5c5c5c;*/
  }
  th, td{
    /*position: relative;*/
    border: 1px solid #5c5c5c;
  }
  th{
    border-bottom: none
  }
  th{
    height: 34px;
    text-align: center;
    /*不换行*/
    /*white-space:nowrap; */
    vertical-align: middle;
    background: #e9e9e9;
    cursor: pointer;
  }
  th.change_th {
    line-height: 34px;
  }
  td{
    height: 29px;
    text-align: center;
    vertical-align: middle;
    background: #3b3b3b;
    color: #fff;
    cursor: pointer;
  }
  .delay td{
    background-color: red;
  }
  .active td{
    background-color: orange;
  }
  .uniqueClass{
    background-color: #fff8c6;
    color: black;
  }
  .preFlight td{
    background-color: #b8ff3f;
    color: black;
  }
  .fixDataBac{
    background: #f5501f;
  }
  .noFixDataBac{
    background: #3b3b3b;
  }
  /*搜索索引*/
  .searchTd td {
    background: #bfa;
  }
  .selectTr td {
    background: pink;
  }
  .ww {     
    /*position: absolute;
    right: 0;
    top: 0;*/
    float: right;
    height: 100%;
    width: 3px;
    background:  #e8e8e8;       
    cursor: col-resize
  }
        
 .line {
    width: 2px;
    background-color: #999999;
    position: absolute;
    z-index: 1000;
    display: none;
  }
 .fixed-x-bar{
    position: absolute;
    z-index: 889;
    bottom: 0;
    height: 10px;
    width: 336px;
    background: #2a2a2a;
    border-radius: 0px 5px 5px 0;
  }       
</style>