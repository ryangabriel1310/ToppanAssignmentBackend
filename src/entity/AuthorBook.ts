import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import Authors from "./Authors";
import Books from "./Books";

@Entity("author_books")
export default class AuthorBooks {
  @PrimaryColumn()
  author_id: number;

  @PrimaryColumn()
  book_id: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @ManyToOne(() => Authors, (author) => author.authorBook, { nullable: false, cascade: ["remove", "update"] })
  @JoinColumn({ name: "author_id" })
  author: Authors;

  @ManyToOne(() => Books, (book) => book.authorBook, { nullable: false, cascade: ["remove", "update"] })
  @JoinColumn({ name: "book_id" })
  book: Books;
}
