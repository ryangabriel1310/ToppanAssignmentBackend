import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AuthorBooks from "./AuthorBook";

@Entity("books")
export default class Books {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToMany(() => AuthorBooks, (authorBook) => authorBook.book)
  authorBook: AuthorBooks[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
