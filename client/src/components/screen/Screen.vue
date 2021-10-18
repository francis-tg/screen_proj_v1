<template>
    <b-container fluid>
    <b-row class="text-center">
        <b-col cols="9"><carousel /></b-col>
        <b-col clos='3'><left-bar/></b-col>
    </b-row>
    <b-col><BottomBar/></b-col>
  </b-container>
</template>

<script>
import Carousel from './components/Carousel.vue'
import leftBar from './components/leftBar.vue'
import BottomBar from './components/BottomBar.vue'
export default {
    name: 'Screen',
    components:{
        leftBar,
        BottomBar,
        Carousel
    }
}
</script>
<style>
* {
    background-color: #242424;
    color: #fff;
}
</style>