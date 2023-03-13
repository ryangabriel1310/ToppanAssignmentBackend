import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AuthorBooks from "./AuthorBook";
import Books from "./Books";
import People from "./People";

@Entity("book_rents")
export default class BookRents {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @ManyToOne(() => People, (person) => person.bookRents)
  @JoinColumn({ name: "person_id", referencedColumnName: "id" })
  person: People;

  @ManyToOne(() => Books)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  book: Books;

  @OneToMany(() => AuthorBooks, (authorBook) => authorBook.author)
  authorBook: AuthorBooks[];
}
