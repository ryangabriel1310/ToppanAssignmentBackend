import { Request, Response, Router } from "express";
import { AppDataSource } from "../dataSource";

import { AuthorBooks, BookRents, People } from "../entity";
import countries from "../countries";

async function getBooks(req: Request, res: Response) {
  // Check query parameter
  console.log(req.query);
  const countryCode = String(req.query.country_code);
  if (!countries.map(({ countryCode }) => countryCode).includes(countryCode)) {
    return res.status(400).json({ message: "invalid parameter" });
  }
  console.log(`countryCode: ${countryCode}`);

  // Run the queries
  const top3BookIDs = await bookIDsQuery();
  const response = top3BookIDs.map(async (book_id) => {
    const bookName = await bookNameQuery(book_id);
    const author = await authorQuery(book_id);
    const borrowers = await borrowersQuery(book_id, countryCode);
    console.log(`borrowers: ${borrowers}`);

    return { name: bookName, author: author, borrowers: borrowers };
  });

  // Resolve promises
  const resolvedResponse = await Promise.all(response);

  if (resolvedResponse.length === 0) {
    return res.status(404).json({ message: "no results" });
  }

  return res.json(resolvedResponse);
}

async function bookIDsQuery() {
  const booksObjArr = await AppDataSource.getRepository(BookRents)
    .createQueryBuilder("book_rents")
    .select(["book_id", "COUNT(*) AS rent_count"])
    .groupBy("book_id")
    .orderBy("rent_count", "DESC")
    .limit(3)
    .getRawMany();
  return booksObjArr.map(({ book_id }) => book_id);
}

async function bookNameQuery(book_id: number) {
  const bookNameObj = await AppDataSource.getRepository(BookRents)
    .createQueryBuilder("book_rents")
    .select("books.name AS book_name")
    .leftJoin("book_rents.book", "books")
    .where("book_rents.book_id = :bookId", { bookId: book_id })
    .getRawOne();
  return bookNameObj.book_name;
}

async function authorQuery(book_id: number) {
  const authorObjArr = await AppDataSource.getRepository(AuthorBooks)
    .createQueryBuilder("author_books")
    .select("authors.name AS author_name")
    .leftJoin("author_books.author", "authors")
    .where("author_books.book_id = :bookId", { bookId: book_id })
    .getRawMany();
  return authorObjArr.map(({ author_name }) => author_name).join(", ");
}

async function borrowersQuery(book_id: number, countryCode?: string) {
  const top3PeopleObjArr = countryCode
    ? await AppDataSource.getRepository(People)
        .createQueryBuilder("people")
        .select("people.name AS person_name, COUNT(*) AS people_count")
        .leftJoin("book_rents", "bookRents", "people.id = bookRents.person_id")
        .where("bookRents.book_id = :bookId", { bookId: book_id })
        .andWhere("people.country_id = :countryId", { countryId: countryCode })
        .groupBy("people.id")
        .orderBy("people_count")
        .limit(3)
        .getRawMany()
    : await AppDataSource.getRepository(People)
        .createQueryBuilder("people")
        .select("people.name AS person_name, COUNT(*) AS people_count")
        .leftJoin("book_rents", "bookRents", "people.id = bookRents.person_id")
        .where("bookRents.book_id = :bookId", { bookId: book_id })
        .groupBy("people.id")
        .orderBy("people_count")
        .limit(3)
        .getRawMany();
  return top3PeopleObjArr.map(({ person_name }) => person_name);
}

const router = Router();

router.get("/", getBooks);

export default router;
