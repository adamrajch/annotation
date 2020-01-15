import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer.");
    }

    const password = await bcrypt.hash(args.data.password, 10);
    const user = prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisisasecret")
    };
  },

  async loginUser(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.email
      }
    });

    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) {
      throw new Error("incorrect password");
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisisasecret")
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const userExists = await prisma.exists.User({ id: userId });
    if (!userExists) {
      throw new Error("user does not exist");
    }

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },
  async createBook(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const userExists = prisma.exists.User({ id: userId });
    if (!userExists) {
      throw new Error("user does not exist");
    }

    return prisma.mutation.createBook(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  async deleteBook(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const bookExists = await prisma.exists.Book({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!bookExists) {
      throw new Error("Unable to delete Book");
    }
    return prisma.mutation.deleteBook({ where: { id: args.id } }, info);
  },
  async updateBook(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const bookExists = prisma.exists.Book({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!bookExists) {
      throw new Error("Unable to update book");
    }

    return prisma.mutation.updateBook(
      { where: { id: args.id }, data: args.data },
      info
    );
  },
  async createAnnotation(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const bookExists = await prisma.exists.Book({
      id: args.parent,
      author: {
        id: userId
      }
    });
    if (!bookExists) {
      throw new Error("Unable to create annotation");
    }

    return prisma.mutation.createAnnotation(
      {
        data: {
          author: {
            connect: {
              id: userId
            }
          },
          parent: {
            connect: {
              id: args.parent
            }
          },
          ...args.data
        }
      },
      info
    );
  },
  async deleteAnnotation(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const annotationExists = await prisma.exists.Annotation({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!annotationExists) {
      throw new Error("Unable to delete annotation.");
    }
    return prisma.mutation.deleteAnnotation(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updateAnnotation(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const annotationExists = await prisma.exists.Annotation({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!annotationExists) {
      throw new Error("Unable to update annotation.");
    }
    return prisma.mutation.updateAnnotation(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  }
};

export { Mutation as default };
