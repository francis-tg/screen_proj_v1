<template>
    <div class="leftbar" @load="ShowDateTime">
        <div class="clock">
            <div class="time">
                <span class="hour">{{hour}}</span>
                <span class="timer">:</span>
                <span class="minute">{{minutes}}</span>
                <span class="timer">:</span>
                <span class="second">{{secondes}}</span>
            </div>
            <div class="date">
                {{date}}
            </div>
        </div>
        <div class="weather" v-for="wdata in weather['weather']" :key="wdata.id">
            <span class="state" v-if="wdata.description = 'peu nuageux'"><b-icon icon="cloud" scale='2'></b-icon></span>
            <span class="state" v-else-if="wdata.description = 'nuageux'"><b-icon icon="cloud-fill" scale='2'></b-icon></span>
            <span class="state" v-else-if="wdata.description = 'pluvieuse'"><b-icon icon="cloud-fill" scale='2'></b-icon></span>
            <span class="state" v-else-if="wdata.description = 'en soleilé'"><b-icon icon="sun" scale='2'></b-icon></span>
            <span class="weather">{{wdata.description}}</span>
        </div>
         <div class="temp">
            <span class="temp">Température: {{weather.main.temp}} °C</span> <br>
            <span class="mintemp">Température minimale: {{weather.main.temp_min}} °C</span><br>
            <span class="maxtemp">Température maximale: {{weather.main.temp_max}} °C</span><br>
            <span class="Humidity">Taux d'Humidité: {{weather.main.humidity}} °C</span><br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'leftBar',
    data() {
        return {
            hour: "",
            minutes : "",
            secondes: "",
            date: "",
            api_key: "dba5feb876c3b7a9c53049f13dacf31d",
            base_url: "http://api.openweathermap.org/data/2.5/weather?q=",
            api_id :'&appid=',
            weather: []
        }
    },
    mounted(){
        setInterval(()=>{
            axios.get(`${this.base_url}Lome&units=metric${this.api_id}${this.api_key}&lang=fr`).then(response =>(this.weather = response.data))
            console.log(this.weather['weather'].main)
        },2000)
    },
    created() {
        this.ShowDateTime()
    },
    methods: {
        ShowDateTime (){
            const dayList = ['Lundi', "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
            const MonthList = ['Janvier', 'Février', "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

            setInterval(() => {
                    const getDate = new Date()
                    const getsecond = getDate.getUTCSeconds();
                    const getminute = getDate.getUTCMinutes();
                    const getHour = getDate.getUTCHours();
                    if (getHour <= 9) {
                        this.hour="0" + getHour
                    } else {
                        this.hour = getHour
                    }
                    if (getminute <= 9) {
                        this.minutes="0" + getminute
                    } else {
                        this.minutes=(getminute)
                    }
                    if (getsecond <= 9) {
                        this.secondes = "0" + getsecond
                    } else {
                        this.secondes=getsecond
                    }

                    const dayname = dayList[getDate.getUTCDay() - 1];

                    this.date = dayname + ", " + getDate.getUTCDate() + " " + MonthList[getDate.getUTCMonth()] + " " + getDate.getUTCFullYear()


                }, 100);

        }
    },

}
</script>

<style>
@font-face {
    font-family: "Newsreader";
    src: url(./font/Newsreader-VariableFont_opsz\,wght.ttf);
}

@font-face {
    font-family: "Digital";
    src: url(./font/digital-7.ttf);
}
.leftbar{
    border: 1px solid #242424;
    background: #242424;
    width: 100%;
    height: 70vh;
    margin-top: 2.5%;

}

.leftbar .hour,
.leftbar .minute,
.leftbar .second,
.leftbar .timer {
    display: inline-block;
    font-size: 9.5rem;
    color: white;
    font-family: Digital;
    text-align: center;
}

.leftbar .date {
    color: #fff;
    font-family: Newsreader;
    font-size: 2rem;
}

.leftbar .timer {
    animation: secAnim 1s infinite;
}

@keyframes secAnim {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.state{
    margin-right: 20px;
}

.weather{
    font-size: 30px;
    font-stretch: semi-condensed;
    font-style: italic;
}

</style>