<template>
  <div class='wrap' ref='wrap'>
    <div class='merge_wrap' v-show='!isDiviScreen' ref='mergeWrap'> 
      <div class='merge_title'>到离港</div>
      <div class='contentWrap'>
        <div class='main_content'>
          <div class='theadWrap  scrollX' ref='theadWrap'>
           <ul class='tab'>
             <li v-for='(item, index) in thLeftData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tdData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
             <!--服务数据头部-->
             <li v-for='(item, serIndex) in tdData[0] && tdData[0]["services"]' :style='{width: serviceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
             <li v-else-if='item.sorE === "E"' :style='{width: serviceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
           </ul>
          </div> 
          <div class='tbodyWrap scrollX scrollTbody' ref='tbodyWrap'>
            <ul v-for='(tdItem, index) in tdData' :key='index' @click='selectTr($event,index)' @dblclick='serviceSubmit($event, tdItem, index)'>
                  <li :style='{width: thLeftData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in thLeftData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}' :class='{selectLi: tdItem["class"]&&item["class"]}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: serviceWidth[serIndex]["width"]}'>
                    <span :style='{display: "inline-block", width: parseInt(serviceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(serviceWidth[serIndex]["width"])/2+"px", height: "100%"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
            </ul>
          </div>
        </div>
      </div>
      <scroll-bar></scroll-bar>
      <scroll-x-bar></scroll-x-bar>
      <right-content></right-content>
    </div>
    <div class='divi_wrap' v-show='isDiviScreen'>
      <div class='divi_content1' ref='diviContent1'>
          <div class='title_come'>到港</div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap  scrollX' ref='divi1TheadWrap'>
              <ul class='tab'>
                <li v-for='(item, index) in tabComeData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, comeData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                <li v-for='(item, serIndex) in comeData[0] && comeData[0]["services"]' :style='{width: comeServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                <li v-else-if='item.sorE === "E"' :style='{width: comeServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
              </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody'  ref='divi1TbodyWrap'>
                <ul v-for='(tdItem, index) in comeData' :key='index' @click='selectTr($event,index)'  @dblclick='serviceSubmit($event, tdItem, index)'>
                  <li :style='{width: tabComeData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in tabComeData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: comeServiceWidth[serIndex]["width"]}'>
                    <span :style='{display: "inline-block", width: parseInt(comeServiceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(comeServiceWidth[serIndex]["width"])/2+"px", height: "100%"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='scroll_bar'>
            <span class='scroll_bar_child'></span>
          </div>
          <scroll-x-bar></scroll-x-bar>
      </div>
      <div class='divi_content2' ref='diviContent2'>
          <div class='title_leave'><span>离港</span><div class='divi_height_scale'></div></div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap scrollX' ref='divi2TheadWrap'>
                <ul class='tab'>
                  <li v-for='(item, index) in tabLeaveData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, leaveData)' class='sort_li'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                  <li v-for='(item, serIndex) in leaveData[0] && leaveData[0]["services"]' :style='{width: leaveServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                  <li v-else-if='item.sorE === "E"' :style='{width: leaveServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
                </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody' ref='divi2TbodyWrap'>
                <ul v-for='(tdItem, index) in leaveData' :key='index' @click='selectTr($event,index)'  @dblclick='serviceSubmit($event, tdItem, index)'>
                  <li :style='{width: tabLeaveData[0]["width"]}'>{{index+1}}</li>
                  <li v-for='(item, i) in tabLeaveData.slice(1)' :style='{width: item.width}' :key='i' v-if='!tdItem[item["name"]] || tdItem[item["name"]].indexOf("2017-") < 0'>{{tdItem[item['name']]}}</li>
                  <li v-else-if="item['name'] === 'operationDate'" :style='{width: item.width}'>{{tdItem[item['name']].slice(5, 10)}}</li>
                  <li v-else :style='{width: item.width}'>{{tdItem[item['name']].slice(11, 16).split(':').join('')}}</li>
                  <!--服务部分-->
                  <li v-for='(serItem, serIndex) in tdItem["services"]' :style='{width: leaveServiceWidth[serIndex]["width"]}'>
                    <span :style='{display: "inline-block", width: parseInt(leaveServiceWidth[serIndex]["width"])/2+"px", borderRight: "1px solid black", boxSizing: "border-box", height: "100%", textAlign: "center"}'>{{tdItem["services"][serIndex]['planTime']}}</span><!--
                    --><span :style='{display: "inline-block", width: parseInt(leaveServiceWidth[serIndex]["width"])/2+"px", height: "100%", textAlign: "center"}'>{{serviceData[index][serIndex]['actualTime']}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='scroll_bar'>
            <span class='scroll_bar_child'></span>
          </div>
          <scroll-x-bar></scroll-x-bar>
      </div>
      <right-content></right-content>
    </div>
  </div>
  
</template>
<script>
  import scrollBar from './scrollBar'
  import scrollXBar from './scrollXBar'
  import rightContent from './rightContent'
  import $scrollBar from '../js/jqueryScrollBar'
  export default {
    data () { 
      return {
        tdData: this.$store.state.initData,
        isFirstUpdate: false,
        isMergeFirstUpdate: false,
        selectTarget: '',
        serviceData: this.$store.state.serviceData, 
        comeData: this.$store.state.comeData,
        leaveData: this.$store.state.leaveData,
        serviceWidth: this.$store.state.serviceWidth,
        comeServiceWidth: this.$store.state.comeServiceWidth,
        leaveServiceWidth: this.$store.state.leaveServiceWidth,
        target: null
      }
    },
    created () {
      this.$store.commit('GET_INIT_DATA', this)
    },
    mounted () {
     if(this.$store.state.isDiviScreen) {
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'

        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollBar('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)

        $scrollBar.diviHeightScale('.divi_height_scale', '.scroll_bar_child', '.scrollTbody', {divi1: this.$refs.diviContent1, divi2: this.$refs.diviContent2})
       
        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
     }else {
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.scrollBar('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)
        $scrollBar.mouseScroll('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})
     }
     this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'

     $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap'},  this.$store.state.isDiviScreen)
     
    },
    updated () {
      if(!this.$store.state.isDiviScreen) {
                let rightContent = document.querySelector('.merge_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
            } else {
                let rightContent = document.querySelector('.divi_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
                // console.log(rightContent)
          }
      if(this.$store.state.isDiviScreen && !this.isFirstUpdate) {
        // 第一次进入
        this.isFirstUpdate = true
        this.isMergeFirstUpdate = false
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollBar('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll_bar_child', '.scrollTbody', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2})
        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap'},  this.$store.state.isDiviScreen)
        $scrollBar.diviHeightScale('.divi_height_scale', '.scroll_bar_child', '.scrollTbody', {divi1: this.$refs.diviContent1, divi2: this.$refs.diviContent2})
        
      }else if(!this.$store.state.isDiviScreen && !this.isMergeFirstUpdate){
        // 第一次进入
        this.isMergeFirstUpdate = true
        this.isFirstUpdate = false
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        // $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)
        $scrollBar.scrollBar('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})

        // 鼠标滚动
        $scrollBar.mouseScroll('.scroll', '.scrollTbody', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null})

        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.resize('.scroll-x', '.scroll', {merge: '.merge_wrap', divi1: '.divi_content1', divi2: '.divi_content2'}, {content: '.contentWrap'},  this.$store.state.isDiviScreen)
      }
        // $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.scrollXBar('.scroll-x', '.scrollX', {mergeWrap: this.$refs.mergeWrap, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
    },
    methods: {

      /*选中的li*/
      selectTr(ev, index) {
        if(!this.target) {
          this.target = ev.target
        }

        /*添加之前将所有的class清掉*/
        if(this.target != ev.target) {
          if(this.target.nodeName.toLowerCase() === 'li') {
            this.target.classList.remove('selectLi')
            this.target.parentNode.classList.remove('selectTr')
          }else if(this.target.nodeName.toLowerCase() === 'span') {
            this.target.classList.remove('selectLi')
            this.target.parentNode.parentNode.classList.remove('selectTr')
          }
          this.target = ev.target
        }

        if(ev.target.nodeName.toLowerCase() === 'li') {
          let liNodes = ev.target.parentNode.getElementsByTagName('li');
          let liTargetIndex = [].slice.call(liNodes).indexOf(ev.target)
          ev.target.classList.add('selectLi')
          ev.target.parentNode.classList.add('selectTr')
        } else if(ev.target.nodeName.toLowerCase() === 'span') {
         ev.target.classList.add('selectLi')
         ev.target.parentNode.parentNode.classList.add('selectTr')
        }



      },
      // 表格排序
      sortTable (ev,index, data) {
        if(!this.$store.state.isSort) {
          return
        }
        let str = ''
        let arrowNodes
        if(data === this.tdData) {
          str = 'merge'
          arrowNodes = document.querySelector('.merge_wrap').querySelectorAll('.arrow');
        }else if(data === this.comeData) {
          str = 'come'
          arrowNodes = document.querySelector('.divi_content1').querySelectorAll('.arrow');
        }else if(data === this.leaveData) {
          str = 'leave'
          arrowNodes = document.querySelector('.divi_content2').querySelectorAll('.arrow');
        }
        [].slice.call(arrowNodes).forEach((item) => {
          item.style.display = 'none'
        })
        
       

       if(this.target) {
          this.target.parentNode.classList.remove('selectTr')
          this.target.classList.remove('selectLi')
       }
       // console.log(ev.target.sort)
       

       let arrow
       if(ev.target.nodeName.toLowerCase() === 'li') {
         arrow = ev.target.querySelector('.arrow')
       }else {
         arrow = ev.target.parentNode.querySelector('.arrow')
       }

       if(ev.target.sort) {
         arrow.style.display = 'block'
         arrow.style.borderBottomColor = 'red' 
         arrow.style.borderTopColor = 'transparent'
       }else{
         arrow.style.display = 'block'
         arrow.style.borderBottomColor = 'transparent'
         arrow.style.borderTopColor = 'red'
       }

       this.$store.commit('SORT_TABLE', {str, target: ev.target, param: this.$store.state.thLeftData[index]['name'], vm: this})
 
        // 解决v-for强制刷新列表 this.$forceUpdate()
         //this.$forceUpdate()
         
      },
      /*
      提交服务serviceSubmit
      */
      serviceSubmit (ev, item, index) {
        // console.log(ev.target)
        /*flight的权限*/
       //  console.log(this.$store.state.authData.flight)
        if(ev.target.nodeName.toLowerCase() === 'li') {
          let liNodes = [].slice.call(ev.target.parentNode.getElementsByTagName('li'));
          let searchIndex = liNodes.indexOf(ev.target)
          if(this.$store.state.authData.flight.indexOf(this.$store.state.thLeftData[searchIndex]['title']) >= 0) {
            alert('不错哟')
          }
        }else if(ev.target.nodeName.toLowerCase() === 'span') { // 服务数据
          let liNodes = [].slice.call(ev.target.parentNode.parentNode.getElementsByTagName('li'));
          let searchIndex = liNodes.indexOf(ev.target.parentNode)
          let serviceIndex = searchIndex - this.$store.state.thLeftData.length
          if(this.$store.state.authData.service.indexOf(item['services'][serviceIndex]['detailName']) >= 0) {
            alert('services')
          }
        }
      }
    },
    computed: {
      thLeftData () {
        if(this.$store.state.isBai) {
          // this.$refs.mergeWrap.style.width = '100%'
          this.$refs.theadWrap.style.width = '100%'
          this.$refs.tbodyWrap.style.width = '100%'
          this.isFirst = true
        }
        return this.$store.state.thLeftData
      },
      // 到港数据
      tabComeData () {

        return this.$store.state.tabComeData
      },
      // 离港数据
      tabLeaveData () {

        return this.$store.state.tabLeaveData
      },
      thRightData () {

        return this.$store.state.thRightData

      },
      isDiviScreen () {
        return this.$store.state.isDiviScreen
      }
    },
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar, 'right-content': rightContent}
  }
</script>
<style>

  .divi_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .divi_wrap {
    width: 85%;
  }
  .divi_wrap .divi_content1, .divi_wrap .divi_content2 {
    position: relative;
    width: 100%;
    float: left;
    /*border: 2px solid red;
    box-sizing: border-box;*/
    /*overflow: auto;*/
  }
  .divi_wrap .divi_content2 {
    z-index: 2000;
  }
  
  .divi_wrap .divi_content1 .contentWrap, .divi_wrap .divi_content2 .contentWrap {
    /*width: 80%;*/
    width: 100%;
  }
  .divi_wrap .divi_content1 .rightWrap, .divi_wrap .divi_content2 .rightWrap {
    /*width: 20%;*/
  }

  .divi_content1 .scroll_bar, .divi_content2 .scroll_bar {
    position: absolute;
    right: -15px;
    /*top: 68px;
    height: calc(100% - 68px);*/
    top: 0;
    height: 100%;
    width: 15px;
    background: #2A2A2A;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .divi_content1 .scroll_bar .scroll_bar_child, .divi_content2 .scroll_bar .scroll_bar_child {
    position: absolute;
    left: 0;
    top: 0;
    background: #808080;
    width: 100%;
    height: 50px;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .divi_content2 .divi_height_scale {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    cursor: n-resize;
  }

  .wrap{
    margin-left: 60px;
    width: calc(100% - 60px);
    overflow: hidden;
    position: relative;
  }
  .wrap:after{
    content: '';
    display: block;
    clear: both;
  }
  .merge_wrap {
    width: 85%;
    /*position:relative;*/
  }
  .merge_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .merge_title {
    position: relative;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
    background: #fff;
  }

  .contentWrap {
    width: 100%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid black;
  }
  .contentWrap .main_content {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .title_come, .title_leave {
    position: relative;
    background: #fff;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
  }
  .title_leave {
    background: #fff;
  }

  .contentWrap ul, .rightWrap ul{
    /*width: auto;*/
    box-sizing: border-box;
    font-size: 0;
    cursor: pointer;
  }
  .contentWrap {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .contentWrap .main_content .tbodyWrap, .contentWrap .main_content .theadWrap {
    /*float: left;*/
    position: absolute;
    left: 0;
    top: 0;
  }
  .contentWrap .main_content .tbodyWrap {
    top: 34px;
  }

  .theadWrap{
    position: relative;
    z-index: 99;
  }
  
  .theadWrap ul li {
    background: #ebebeb;
  }
  .tbodyWrap ul li {
    background: #3b3b3b;
    color: #fff;
  }
  .wrap ul li {
    display: inline-block;
    border: 1px solid black;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .rightWrap {
    position: relative;
    width: 20%;
    float: left;
    overflow: hidden;
  }
  /*.rightWrap .theadWrap {
    float: left;
  }*/
  .rightWrap ul li {
    display: inline-block;
    border: 1px solid black;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .rightWrap ul li:first-child {
    border-left: 1px solid black;
  }
  .tbodyWrap .delay li{
    background-color: red;
  }
  .tbodyWrap .active li{
    background-color: orange;
  }
  .tbodyWrap .uniqueClass{
    background-color: #fff8c6;
    color: black;
  }
  .tbodyWrap .preFlight li{
    background-color: #b8ff3f;
    color: black;
  }
  .rightWrap .tbodyWrap .fixDataBac{
    background: #f5501f;
  }
  .rightWrap .tbodyWrap .noFixDataBac{
    background: #3b3b3b;
  }
  /*搜索索引*/
  .tbodyWrap .searchTd li{
    background: #bfa;
  }
  .contentWrap .tbodyWrap  .selectTr li{
    background: #B8CF00;
  }
  .contentWrap .tbodyWrap .selectUl li {
    background: #B8CF00;
  }
  .theadWrap li {
    position: relative;
  }
  .ww {     
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    /*margin-right: -1px;*/
    background:  #e8e8e8;         
    /*background: red;*/
    cursor: e-resize;
  }       
  .qq {     
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    /*margin-right: -1px;*/
    /*background:  #e8e8e8;         */
    background: red;
    cursor: e-resize;
  }
  /*.tbodyWrap .firstClass li {
    background: #31849B;
  }
  .tbodyWrap .secondClass li {
    background: #E5E0EC;
  }
  .tbodyWrap .thirdClass li {
    background: #FCD5B4;
  }
  .tbodyWrap .forthClass li {
    background: #B2A1C7;
  }
  .tbodyWrap .fifthClass li {
    background: #E6B9B8;
  }
  .tbodyWrap .sixClass li {
    background: #D7E4BC;
  }
  .tbodyWrap .sevenClass li {
    background: #538ED5;
  }*/
  .contentWrap .tbodyWrap ul .selectLi {
    background: #3b3b3b;
    border: 2px solid blue;
    box-sizing: border-box;
  }
  .contentWrap .tbodyWrap .selectTr li:nth-child(5) {

    /*border: 2px solid blue;*/
  }
  /*排序箭头*/
  .wrap li.sort_li .arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    /*border-top-color: red;*/
    display: none;
  }
  .divi_content1 .contentWrap {
    height: 100%;
  }
  .divi_content1 .main_content{
    height: calc(100% - 32px);
    overflow: hidden;
  }
</style>