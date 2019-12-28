import { DefaultDeserializer } from "v8";

let users = [{
    id: '1',
    name: 'adam mcgee',
    email: 'arajchwald@gmail.com',
    joinedAt: 1222

},
]


let lists = []
let shows = []
const db = {
    users,
    lists,
    shows
}

export { db as default }