const AniList = {
    author(parent, args, { db }, info) {
        return db.users.find(user => {
            return user.id == parent.author
        })
    },
    collection(parent, args, { db }, info) {
        return db.shows.filter(show => {
            return show.author == parent.id
        })
    }
}

export { AniList as default }