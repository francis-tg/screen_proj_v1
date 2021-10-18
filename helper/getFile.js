const getFileUrl = (object) => {
    const GetData = []
    const pushmulti = "";
    for (let i = 0; i < object.length; i++) {
        const getmultimedia = object[i];
        if (getmultimedia.url.endsWith('mp4') || getmultimedia.url.endsWith('mkv')) {
            pushmulti += '<video src = "' + getmultimedia.url + '" autoplay loop></video>'
        } else if (getmultimedia.url.endsWith('jpg') || getmultimedia.url.endsWith('png') || getmultimedia.url.endsWith('jpeg')) {
            pushmulti += '<img src = "' + getmultimedia.url + '"></img>'
        }

        const FormatData = {
            title: getmultimedia.title,
            url: pushmulti,
            duration: getmultimedia.duration,
            show: getmultimedia.show,
            startDate: getmultimedia.startDate,
            endDate: getmultimedia.endDate,
            id: getmultimedia.id
        }
        GetData.push(FormatData);
    }
    return GetData;
}

module.exports = getFileUrl;