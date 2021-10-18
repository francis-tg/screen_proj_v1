import { reject, resolve } from "core-js/fn/promise";
import axios from axios

const getTextUrl = 'http://192.168.1.11:3400/getAllTextData';
const getFileUrl = 'http://localhost:3400/getAllFileData';

class GetCarouselInfo {
    static GetText(){
        return new Promise(async (resolve, reject) =>{
            try {
                const res = await axios.get(getTextUrl);
                const data = res.data()
                return data
            } catch (err) {
                
            }
        })
    }
}