import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some(user => {
            return user.email == args.email
        })

        if (emailTaken) {
            throw new Error('email taken');
        }
        const newUser = {
            id: uuidv4(),
            AniLists: [],
            ...args
        }
        db.users.push(newUser)
        return newUser;
    },
    deleteUser(parent, { id }, { db }, info) {
        const userIndex = db.users.findIndex((user) => {
            return user.id == id
        })

        if (userIndex == -1) {
            throw new Error('user not found!')
        }

        const deletedUsers = db.users.splice(userIndex, 1)
        db.lists = db.lists.filter(list => {
            return list.author !== id

        })
        return deletedUsers[0];

    }
    ,
    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find(user => {
            return user.id == id
        })

        if (!user) {
            throw new Error("user not found")
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some(user => {
                user.email == data.email
            })
            if (emailTaken) {
                throw new Error('email in use')
            }
            user.email = data.email
        }
        if (typeof data.name == 'string') {
            user.name = data.name
        }
        return user;

    },

    createList(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some(user => {
            return user.id == args.author
        })
        if (!userExists) {
            throw new Error('user does not exist!')
        }
        const newList = {
            id: uuidv4(),
            collection: [],
            ...args
        }

        db.lists.push(newList)

        pubsub.publish(`user`,
            {
                list: {
                    mutation: "CREATED",
                    data: newList
                }
            })
        return newList
    },
    deleteList(parent, args, { db, pubsub }, info) {
        const listIndex = db.lists.findIndex(list => {
            return list.id == args.id
        })

        if (listIndex == -1) {
            throw new Error('list does not exist')
        }

        const deletedList = db.lists.splice(listIndex, 1)
        pubsub.publish(`user`,
            {
                list: {
                    mutation: "DELETED",
                    data: deletedList[0]
                }
            })

        return deletedList[0]
    },
    updateList(parent, args, { db, pubsub }, info) {
        const { id, data } = args;
        const foundList = db.lists.find(list => {
            return list.id == id
        })
        if (!foundList) {
            throw new Error('list not found')
        }

        if (typeof data.name == 'string') {
            foundList.name = data.name
        }
        if (typeof data.collection == 'array') {
            foundList.collection.concat(data.collection)
            for (let i = 0; i < data.collection.length; i++) {
                db.shows.push(data.collection[i])
            }
        }
        pubsub.publish(`user`,
            {
                list: {
                    mutation: "UPDATED",
                    data: foundList
                }
            })

        return foundList;
    },
    createShow(parent, args, { db, pubsub }, info) {
        const { author, data } = args
        console.log(author)
        const listExists = db.lists.some(list => {
            return list.id == author
        })
        if (!listExists) {
            throw new Error('list does not exist')
        }
        const newShow = {
            id: uuidv4(),
            author: author,
            ...data
        }

        db.shows.push(newShow)

        pubsub.publish(`list: ${author}`, {
            show: {
                mutation: "CREATED",
                data: newShow
            }
        })
        return newShow
    },
    deleteShow(parent, { id }, { db }, info) {
        const showIndex = db.shows.findIndex(show => {
            return show.id == id
        })
        if (showIndex == -1) {
            throw new Error('show does not exist')
        }
        const deletedShow = db.shows.splice(showIndex, 1)

        return deletedShow[0]
    }

}

export { Mutation as default }