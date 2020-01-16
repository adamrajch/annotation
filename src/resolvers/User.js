import getUserId from "../utils/getUserId";
const User = {
  //books returns public books if not auth , if auth, returns all of users books
  books: {
    fragment: "fragment userId on User {id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return prisma.query.books({
          where: {
            author: {
              id: parent.id
            }
          }
        });
      }
      return prisma.query.books({
        where: {
          private: false,
          author: {
            id: parent.id
          }
        }
      });
    }
  },
  ///annotations should return only if the parent book is public or user is signed in
  annotations: {
    fragment: "fragment userId on User {id}",
    resolve(parent, args, { request, prisma }, info) {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return prisma.query.annotations({
          where: {
            author: {
              id: parent.id
            }
          }
        });
      }
      return prisma.query.annotations({
        where: {
          parent: {
            private: false
          },
          author: {
            id: parent.id
          }
        }
      });
    }
  },
  email: {
    fragment: "fragment userId on User {id}",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  }
};

export { User as default };
