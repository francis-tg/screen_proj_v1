<template>
<!--  @input="onSlideChange" -->
<div id="right-item">
  <carousel :autoplay='playing'
   :per-page="1"
    :paginationEnabled='false'
    :loop='true'
    :autoplayTimeout=30000
    @input="onSlideChange"
      >
    <slide v-for="data in SlideData"
     :key='data.id' 
     v-html="data.url"
      >
      <!-- <img src="https://picsum.photos/1024/480/?image=55" alt=""> -->
      {{data.url}}
    </slide>
   
  </carousel>
  
</div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import axios from 'axios'

  export default {
    name: "Main-Carousel",
    components:{
      Carousel,
      Slide
    },
    created() {
      console.log(this.$attrs)
    },
    mounted() {
      setInterval(()=>{
        axios.get('http://localhost:3400/getAllFileData')
      .then(response => (this.SlideData = response.data) )
      // for (let c = 0; c < this.SlideData.length; c++) {
      //   const element = this.SlideData[c];
      //   this.duration = element.duration
        
      // }

      },10000)

      
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        playing: true,
        SlideData : [],
        GetFormatData: [],
        duration:1000,
        item: [ 
            {
                url: "https://picsum.photos/1024/480/?image=54"
            },
            {
                url : "https://picsum.photos/1024/480/?image=52"
            },
            {
                url:"https://picsum.photos/1024/480/?image=55"
            },
            {
                url: "https://picsum.photos/1024/480/?image=58"
            }
        ],
       img:{
         src: "./img/img1.jpg"
       }
      }
    },
    setup() {
       const interval = this.duration
       return {interval}
       },
    methods: {
     onSlideChange: function (getSlideId){
      this.duration = this.SlideData[getSlideId].duration
      console.log(this.duration)
      // setTimeout(()=>{
      //   this.playing = true
      // }, this.duration)
    }
   
    },
   
  }
</script>

<style>
#right-item{
    widows: 100%;
    height: 74vh;
    background: #393939;
    margin-top: 1%;
}
#right-item img,
#right video{
width: 100%;
height: 74vh;
}

</style>
