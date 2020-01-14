import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466",
  secret: "thisismysecret"
});

export { prisma as default };
// prisma.query
//   .annotations(null, "{id favorite}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err);
//   });

// prisma.query
//   .users(null, "{id email name}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const createBookforUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error("user not found");
//   }
//   const book = await prisma.mutation.createBook(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{id author{id email} }"
//   );
//   return book.author;
// };

// const createAnno = async (bookId, data) => {
//   console.log("hello");

//   const bookExists = await prisma.exists.Book({ id: bookId });
//   if (!bookExists) {
//     throw new Error("book does not exists");
//   }
//   console.log("anno");
//   const anno = await prisma.mutation.createAnnotation(
//     {
//       data: {
//         ...data,
//         parent: {
//           connect: {
//             id: bookId
//           }
//         }
//       }
//     },
//     "{id title chapter note quote favorite}"
//   );

//   return anno;
// };

// const updateBookforUser = async (bookId, data) => {
//   const bookExists = await prisma.exists.Book({ id: bookId });
//   if (!bookExists) {
//     throw new Error("book not found");
//   }
//   const book = await prisma.mutation.updateBook(
//     {
//       where: {
//         id: bookId
//       },
//       data
//     },
//     "{ id title author{id name }}"
//   );

//   return book;
// };
///tests
// createBookforUser("212", {
//   id: "1222",
//   title: "lord of the rings"
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

// updateBookforUser("11", { title: "goasjkls" })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

// createAnno("11", {
//   id: "117133322",
//   quote: "hehe",
//   chapter: "1",
//   title: "gods glory"
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

// createAnnotationforUser("11", {
//   id: "117122",
//   quote: "yeet the yaw",
//   chapter: "1",
//   title: "gods glory"
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(error => {
//     console.log(error.message);
//   });
