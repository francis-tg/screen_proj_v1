<template>

<div class="bottom-item">
   <carousel  :autoplay='true' :perPage='4' :autoplayTimeout=20000 :loop='true' :speed='700' :paginationEnabled='false' :spacePadding=5>
  <slide v-for="data in getSlidedata" :key='data.id'>
    <h4>
    {{data.title}}
    </h4>
    <p>
    {{data.content}}
    </p>
  </slide>
  
</carousel>
<!-- 
<b-button  @click="show">click</b-button> -->

</div>
    
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import axios from 'axios'
export default {
    name: "BottomBar",
    components:{
      Carousel,
      Slide
    },
    data (){
      return{
        getSlidedata : []/* axios.get('http://192.168.1.11:3400/getAllTextData').data */,
        slideData: [
          {
            id: 1,
            title: "Title1",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 2,
            title: "Title2",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 3,
            title: "Title3",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 4,
            title: "Title4",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 5,
            title: "Title5",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 6,
            title: "Title6",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 7,
            title: "Title7",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          },
          {
            id: 8,
            title: "Title8",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus dolore architecto in corrupti pariatur quam. Delectus ex deleniti ipsa asperiores hic distinctio, inventore quia optio dolorum libero maxime magnam!"
          }
        ]
      }
    },
    mounted() {
      setInterval(()=>{
        axios.get('http://localhost:3400/getAllTextData')
      .then(response => (this.getSlidedata = response.data) )
      },10000)
      
    },
    methods: {
      // show (){
      //   const getSlidedata = axios.get('http://localhost:3400/getAllTextData')
      //   console.log(getSlidedata)
      // }
    },
    
}
</script>

<style scoped>

#text{
color: black;
}
.bottom-item{
height: 20vh;
width: 100%;
margin-top: 2%;

}

</style>