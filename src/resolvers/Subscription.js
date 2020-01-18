import getUserId from '../utils/getUserId'
const Subscription = {
  book: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.book(null, info);
    }
  },
  annotation: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.annotation(
        {
          where: {
            node: {
              parent: {
                id: args.bookId
              }
            }
          }
        },
        info
      );
    }
  },
  myBook: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)
      return prisma.subscription.book({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)
    }
  }
  //   group: {
  //     subscribe(parent, args, { prisma }, info) {
  //       return prisma.subscription.group(null, info);
  //     }
  //   }
};

export { Subscription as default };
