import axios from 'axios';

const url = '/api/db/';

class apiRequests {
    static testReq() {
        return new Promise((resolve, reject) => {

            axios.get(url + "today").then((res) => {
                const data = res.data;
                resolve(data);
            }).catch((err) => {
                reject(err);
            })

        })
    }
}

export default apiRequests;