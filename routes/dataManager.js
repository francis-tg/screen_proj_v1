const axios = require("axios");
const express = require('express'),
    fs = require('fs'),
    path = require('path');
const multer = require('multer');
const upload = multer({ dest: '/tmp/' });
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');
const router = express.Router();
const cron = require("node-cron")
const { getVideoDurationInSeconds } = require('get-video-duration');
const { hostname, networkInterfaces } = require("os");
const host = require('../helper/gethost')

router.get("/uploadForm", async(req, res) => {
    res.render("forms/file");
});

// const getHost = networkInterfaces()

// console.log(getHost)

router.get("/textForm", async(req, res) => {
    res.render("forms/text");
});

router.get("/", async(req, res) => {
    res.render("index");
});
router.post("/upload", upload.single('file'), async function(req, res) {

    //determiner si c'est une video qui est uploader avec l'option req.file.mimetype
    let option = ""
    let duration = 0;
    let startDate = ""
    let endDate = ""
    const image = /image/
    const video = /video/
    if (image.test(req.file.mimetype) === true) {
        option = "pictures"
    } else if (video.test(req.file.mimetype) === true) {
        option = "videos"
    }
    //Adaptation de l'url au type de fichier$

    let file = `uploads/${option}` + '/' + req.file.originalname;
    let filename = req.file.originalname;
    //upload  du fichier dans le chemin indiquer


    fs.rename(req.file.path, file, async function(err) {
        if (err) {
            console.log(err)
            res.send(500);
        } else {
            //recuperation du temps de la video et fixation du temps des images a 10 seconde
            ffprobe(file, { path: ffprobeStatic.path }, async function(err, info) {
                if (err) return console.log(err);
                duration = info.streams[0].duration
                console.log(duration)
                if (duration === 0)
                    duration = 10

                //recuperation et formatage des dates
                startDate = req.body.startDate.split('-').join('').split('/').join('')
                endDate = req.body.endDate.split('-').join('').split('/').join('')
                    // Get duration
                    /* let getDuration = 0;
                    if (filename.endsWith('mp4') || filename.endsWith('mkv')) {
                        getVideoDurationInSeconds(filename, (duration => { getDuration = duration }))
                        console.log(getDuration)
                    } else if (filename.endsWith('jpg') || filename.endsWith('png') || filename.endsWith('jpeg')) {

                    } */
                    //creation du model de donner a mettre dans json

                const fileData = {
                    title: req.body.title,
                    url: filename,
                    duration: Math.round(duration * 1000),
                    show: false,
                    startDate: startDate,
                    endDate: endDate
                }

                console.log(fileData)

                //envoi des donner dans le fichier json
                await axios.post("http://localhost:4040/mainScreen", fileData)
                res.redirect("/");
            });
        }

    });

})

router.post('/text', async function(req, res) {

    //formatage de la date 
    let getDate = new Date();
    let getmonth = "";
    let getDay = "";
    if (getDate.getMonth() <= 9) {
        getmonth = "0" + (getDate.getMonth() + 1)
    } else {
        getmonth = (getDate.getMonth() + 1)
    }

    if (getDate.getUTCDate() <= 9) {
        getDay = "0" + getDate.getUTCDate();
    } else {
        getDay = getDate.getUTCDate();
    }
    let startDate = req.body.startDate.split('-').join('').split('/').join('')
    let endDate = req.body.endDate.split('-').join('').split('/').join('')
    let setShow = false;
    const getcurentDate = getDate.getUTCFullYear() + getmonth + getDay;

    if (startDate == getcurentDate) {
        setShow = true;
    } else {
        setShow = false;
    }
    console.log(getcurentDate)
    const textData = {
        title: req.body.title,
        content: req.body.content,
        show: setShow,
        startDate: startDate,
        endDate: endDate
    }
    await axios.post("http://localhost:4040/bottomScreen", textData)
    res.redirect("/");
});

router.get("/getAllFileData", async function(req, res) {

    let mainScreen = await axios.get("http://localhost:4040/mainScreen")
    const getData = [];
    let virtualid = 0;

    for (let i = 0; i < mainScreen.data.length; i++) {
        const element = mainScreen.data[i];
        let pushmulti = ``;
        let type = ``;
        if (element.show === true) {
            virtualid++
            if (element.url.endsWith('mp4') || element.url.endsWith('mkv')) {
                pushmulti = `<video src = 'http://localhost:3400/videos/${element.url}' muted autoplay loop></video>`
                type = 'video';
            } else if (element.url.endsWith('jpg') || element.url.endsWith('png') || element.url.endsWith('jpeg')) {
                pushmulti = `<img src = 'http://localhost:3400/pictures/${element.url}'></img>`
                type = 'image';
            }

            const FormatData = {
                    title: element.title,
                    url: pushmulti,
                    duration: element.duration,
                    show: element.show,
                    startDate: element.startDate,
                    endDate: element.endDate,
                    id: element.id,
                    type: type,
                    vId: virtualid
                }
                //console.log(FormatData)
            getData.push(FormatData)
        }


    }

    // console.log(getData)
    res.json(getData);
})

router.get("/getAllTextData", async function(req, res) {

        const bottomScreen = await axios.get("http://localhost:4040/bottomScreen")
        const getData = []
        let virtualid = 0;
        for (let i = 0; i < bottomScreen.data.length; i++) {
            const element = bottomScreen.data[i];
            if (element.show === true) {
                virtualid += 1
                const formatData = {
                        id: element.id,
                        title: element.title.length >= 50 ? element.title.substring(0, 50) + "..." : element.title,
                        content: element.content.length >= 50 ? element.content.substring(0, 320) + "..." : element.content,
                        show: element.show,
                        startDate: element.startDate,
                        endDate: element.endDate,
                        vId: virtualid

                    }
                    // console.log(formatData)
                getData.push(formatData)
            }

        }

        res.json(getData);
    })
    ///////////////////////////////////////////////////////           ***CRON PART***         ///////////////////////////////////////////////////


//mettre a true le show si la date du jour est egal a celle du start date du ficher ou du text tout les jours a 00h01

cron.schedule("1 0 * * *", async() => {
    console.log("running a task every days at 00h00");

    //mettre a true le show si la date du jour est egal a celle du start date du ficher ou du text
    const bottomScreen = await axios.get("http://localhost:4040/bottomScreen")
    const nowDate1 = new Date()
    for (let element in bottomScreen) {

        if (moment(nowDate1, "YYYYMMDD").diff(moment(bottomScreen[element].startDate, "YYYYMMDD"), 'days') === 0) {
            await axios.put(`http://localhost:4040/bottomScreen/${element}`, {
                title: bottomScreen[element].title,
                content: bottomScreen[element].content,
                show: true,
                startDate: moment(bottomScreen[element].startDate, "YYYYMMDD"),
                endDate: moment(bottomScreen[element].endDate, "YYYYMMDD")
            })
        }
    }

    const mainScreen = await axios.get("http://localhost:4040/mainScreen")
    const nowDate2 = new Date()
    for (let element in mainScreen) {

        if (moment(nowDate2, "YYYYMMDD").diff(moment(mainScreen[element].startDate, "YYYYMMDD"), 'days') === 0) {
            await axios.put(`http://localhost:4040/mainScreen/${element}`, {
                title: mainScreen[element].title,
                url: mainScreen[element].url,
                duration: mainScreen[element].duration,
                show: true,
                startDate: moment(mainScreen[element].startDate, "YYYYMMDD"),
                endDate: moment(mainScreen[element].endDate, "YYYYMMDD")
            })
        }
    }
});

//mettre a false le show si la date du jour est egal a celle du start date du ficher ou du text tout les jours a 23h50


cron.schedule("50 23 * * *", async() => {
    console.log("running a task every days at 23h50");




    const bottomScreen = await axios.get("http://localhost:4040/bottomScreen")
    const nowDate3 = new Date()
    for (let element in bottomScreen) {

        if (moment(nowDate3, "YYYYMMDD").diff(moment(bottomScreen[element].endDate, "YYYYMMDD"), 'days') === 0) {
            await axios.put(`http://localhost:4040/bottomScreen/${element}`, {
                title: bottomScreen[element].title,
                content: bottomScreen[element].content,
                show: false,
                startDate: moment(bottomScreen[element].startDate, "YYYYMMDD"),
                endDate: moment(bottomScreen[element].endDate, "YYYYMMDD")
            })
        }
    }

    const mainScreen = await axios.get("http://localhost:4040/mainScreen")
    const nowDate4 = new Date()
    for (let element in mainScreen) {

        if (moment(nowDate4, "YYYYMMDD").diff(moment(mainScreen[element].endDate, "YYYYMMDD"), 'days') === 0) {
            await axios.put(`http://localhost:4040/mainScreen/${element}`, {
                title: mainScreen[element].title,
                url: mainScreen[element].url,
                duration: mainScreen[element].duration,
                show: false,
                startDate: moment(mainScreen[element].startDate, "YYYYMMDD"),
                endDate: moment(mainScreen[element].endDate, "YYYYMMDD")
            })
        }
    }
});

module.exports = router;