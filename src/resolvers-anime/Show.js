const Show = {
    author(parent, args, { db }, info) {
        return db.lists.find(list => {
            return list.id == parent.author
        })
    }

}

export { Show as default }