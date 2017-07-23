<template>
  <div>
    <v-toolbar dark class="primary">
      <v-btn icon dark nuxt to= "/member">
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <v-toolbar-title>นายนานา มานา (เจ้าของร้านทำผม)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon dark flat @click.native=""><v-icon dark>chat_bubble</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-card>
      <v-layout row>
          <v-flex xs-5>
            <img src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" height="500" alt="รูป">
          </v-flex>
          <v-flex xs-7>
            <div class="text-xs-left">
          <br>
          <h4 style="display:inline"><b>{{ name }}</b></h4>
          <h5 >คอร์สเจ้าขอร้าน/ช่างตัดผม</h5>
          <v-divider></v-divider>
          <br>

            <v-layout row>
              <v-flex xs3>
                <h6><b>อายุ</b></h6><br>
                <h6><b>ที่อยู่</b></h6><br>
                <h6><b>อีเมล</b></h6><br>
                <h6><b>เบอร์โทรศัพท์</b></h6><br>
                </v-flex>
                <v-flex xs9>
                   <h6>{{ id }}</h6><br>
                   <h6>{{ address.street}}</h6><br>
                    <h6>{{ email}}</h6><br>
                    <h6>{{ phone}}</h6><br>
                </v-flex>
            </v-layout>
            </div>

          </v-flex>
      </v-layout>
      </v-card>




      <v-list three-line subheader>

        <v-container>
          <v-subheader>รายได้ของเดือน</v-subheader>
          <v-card >
            <div id="chartdiv"></div>

          </v-card>
        </v-container>
      </v-list>

      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-container>
          <v-subheader>ราคาค่าบริการของร้าน</v-subheader>

          <v-layout row>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline" >ค่าทำผม</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำสี</h5>
                <h5>150</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าสระไดร์</h5>
                <h5>100-200</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำผม</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำเล็บ</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำเล็บ</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
          </v-layout>

          <br>
          <v-layout row>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline" >ค่าทำผม</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำสี</h5>
                <h5>150</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าสระไดร์</h5>
                <h5>100-200</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำผม</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำเล็บ</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="text-xs-center">
                <h5 style="display:inline">ค่าทำเล็บ</h5>
                <h5>50</h5>
              </v-card>
            </v-flex>
          </v-layout>


        </v-container>
      </v-list>
      <!-- <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>ตั้งค่า</v-subheader>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notifications</v-list-tile-title>
            <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sound</v-list-tile-title>
            <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Auto-add widgets</v-list-tile-title>
            <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list> -->


       </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {

   async asyncData ({ params, error }) {

     try {
       const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
       return data
     } catch (e) {
       error({ message: 'User not found', statusCode: 404 })
     }
   },
   mounted() {
     //do something after mounting vue instance
     let a = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "dataProvider": [ {
        "country": "มกราคม",
        "visits": 2025
      }, {
        "country": "กุมภาพันธ์",
        "visits": 1882
      }, {
        "country": "มีนาคม",
        "visits": 1809
      }, {
        "country": "เมษายน",
        "visits": 1322
      }, {
        "country": "พฤษภาคม",
        "visits": 1122
      }, {
        "country": "มิถุนายน",
        "visits": 1114
      }, {
        "country": "กรกฎาคม",
        "visits": 984
      }, {
        "country": "สิงหาคม",
        "visits": 711
      }, {
        "country": "กันยายน",
        "visits": 665
      }, {
        "country": "ตุลาคม",
        "visits": 580
      }, {
        "country": "พฤศจิกายน",
        "visits": 443
      }, {
        "country": "ธันวาคม",
        "visits": 441
      }
     ],
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      }

     } );
     console.log("ID MOUNTED: " + a );

   }
}
</script>
<style >
#chartdiv {
width		: 100%; height		: 500px; font-size	: 11px;
}
</style>
