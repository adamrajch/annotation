const Query = {
  me(parent, args, { db }, info) {
    if (!args.name) {
      return db.users.find(user => {
        return user.id == args.id;
      });
    }
    return db.users.find(x => x.name == args.name);
  },
  users(parent, args, { db, prisma }, info) {
    return prisma.query.users(null, info);
  },
  findList(parent, args, { db }, info) {
    const nameExists = db.lists.some(list => {
      return args.name == list.name;
    });
    const idExists = db.lists.some(list => {
      return args.id == list.id;
    });
    if (!nameExists && !idExists) {
      throw new Error("list does not exist");
    }

    let returnList = [];
    if (!args.id) {
      returnList = db.lists.filter(list => {
        return args.name == list.name;
      });
      return returnList;
    } else {
      let content = db.lists.find(list => {
        return args.id == list.id;
      });
      returnList.push(content);
      return returnList;
    }
  }
};

export { Query as default };
