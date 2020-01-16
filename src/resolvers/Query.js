import getUserId from "../utils/getUserId";
const Query = {
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  books(parent, args, { db, prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            writer_contains: args.query
          }
        ]
      };
    }
    return prisma.query.books(opArgs, info);
  },
  myBooks(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          writer_contains: args.query
        }
      ];
    }
    return prisma.query.books(opArgs, info);
  },
  annotations(parent, args, { db, prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            quote_contains: args.query
          },
          {
            title_contains: args.query
          },
          {
            parent: {
              OR: [
                {
                  title_contains: args.query
                },
                {
                  writer_contains: args.query
                }
              ]
            }
          }
        ]
      };
    }
    return prisma.query.annotations(opArgs, info);
  },
  groups(parent, args, { prisma }, info) {
    const opArgs = {};
    if (opArgs) {
      opArgs.where = {
        title_contains: args.query
      };
    }
    return prisma.query.groups(opArgs, info);
  },
  findBook(parent, { id }, { db, prisma }, info) {
    return prisma.query.book({
      where: {
        id: id
      }
    });
  },
  findAnnotation(parent, { id }, { db, prisma }, info) {
    return prisma.query.annotation({
      where: {
        id: id
      }
    });
  }
};

export { Query as default };
