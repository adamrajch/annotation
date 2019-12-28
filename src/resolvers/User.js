const User = {
    AniLists(parent, args, { db }, info) {
        return db.lists.filter(list => {
            return list.author == parent.id
        })
    }
}

export { User as default }