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
  }
  //   group: {
  //     subscribe(parent, args, { prisma }, info) {
  //       return prisma.subscription.group(null, info);
  //     }
  //   }
};

export { Subscription as default };
