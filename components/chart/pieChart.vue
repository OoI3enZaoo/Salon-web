<template>

<div id="chartdiv"></div>

</template>
<script>
export default {
  name: "",
  data (){
    return {
      }
    },
  mounted() {
    //do something after mounting vue instance
    AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "light",
    "dataProvider": [ {
      "title": "เจ้าของร้านเสริมสวย",
      "value": 4852
    }, {
      "title": "ช่างทำผม",
      "value": 9899
    } , {
      "title": "ผู้ช่วยช่าง",
      "value": 9899
    }
    , {
      "title": "ผู้สนใจกิจการช่างทำผม",
      "value": 9899
    } , {
      "title": "อีกอันจำไม่ได้อะลืม",
      "value": 9899
    } , {
      "title": "อีกอันจำไม่ได้อะลืม",
      "value": 9899
    } ],
    "titleField": "title",
    "valueField": "value",
    "labelRadius": 5,

    "radius": "42%",
    "innerRadius": "60%",
    "labelText": "[[title]]",
    "titles": [{
   "text": "จำนวนคอร์สที่ขายได้ทั่งหมด"
 }],
    "export": {
      "enabled": true
    }
  } )
  }
}
</script>
<style>
#chartdiv {
	width		: 100%;
	height		: 500px;
	font-size	: 11px;
}
</style>
