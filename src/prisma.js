import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466"
});

prisma.query
  .annotations(null, "{id favorite}")
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  })
  .catch(err => {
    console.log(err);
  });

prisma.query
  .users(null, "{id email name}")
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  })
  .catch(err => {
    console.log(err);
  });

const createBookforUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId });
  if (!userExists) {
    throw new Error("user not found");
  }
  const book = await prisma.mutation.createBook(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    "{id author{id email} }"
  );
  return book.author;
};

createBookforUser("212", {
  id: "1222",
  title: "lord of the rings"
})
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(error => {
    console.log(error.message);
  });
