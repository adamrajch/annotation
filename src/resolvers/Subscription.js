const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0
            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)
            return pubsub.asyncIterator('count')
        }
    },
    list: {
        subscribe(parent, { userId }, { db, pubsub }, info) {

            return pubsub.asyncIterator(`user`)
        }
    },
    show: {
        subscribe(parent, { listId }, { db, pubsub }, info) {
            const sublist = db.lists.find(list => {
                return list.id == listId
            })

            if (!sublist) {
                throw new Error('no list found')
            }
            return pubsub.asyncIterator(`list: ${listId}`)
        }
    }
}

export { Subscription as default }