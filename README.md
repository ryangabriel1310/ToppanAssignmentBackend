# A. Setting Up The Application:

### 1. Requirements:

- NodeJS, npm, and nvm </br>
  Guide: https://heynode.com/tutorial/install-nodejs-locally-nvm/
- PostgreSQL and a GUI tool (optional)</br>
  Download: https://www.postgresql.org/download/

</br>

### 2. Check node version:

- To check the node version, run the following command and make sure it is of version 18.14.2

```
node -v
```

- If the version is different, to change the node version, run the following commands

```
nvm install 18.14.2
nvm use 18.14.2
```

</br>

### 3. To install the required packages, run the following command:

```
npm i
```

</br>

### 4. Create a postgresql database according to the settings inside `config.ts` (can be found under the `src` directory).

</br>

### 5. To start the server and synchronize the schemas in the postgres database with the entities defined using TypeORM, run the following command:

```
npm run start
```

</br>

### 6. Click on the terminal that's running the server and press `ctrl + c` on Windows or `cmd + c` on MacOS.

</br>

### 7. Populate the database with dummy data by running the queries defined under the `sql` folder. This can be done by copy and pasting the queries and running them in any Postgres GUI of your choice or the Postgres terminal.

</br>

# B. Running the Application

### 1. To start the dev server, run the following command:

```
npm run dev
```

</br>

### 2. To terminate the server, click on the terminal that's running the server and press `ctrl + c` on Windows or `cmd + c` on MacOS.

</br>

# C. Testing the Application

### 1. Make sure the dev server is not running.

</br>

### 2. To run the test suites, run the following command:

```
npm run test
```

# D. Additional Info

### 1. Table relationships

a. Relationships between author and books:

- Authors table to author_books table: one-to-many.
- Books table to author_books table: one-to-many.
- This will result in a many-to-many relationship between authors and books with author-books table as the bridge.
- Reason for using this relationship: one author might write multiple books and one book might be written by multiple authors.

b. Relationship between books and book rents:

- People table to book_rents table: one-to-many.</br>
- Reason for using this relationship: one person might make multiple rents but one rent can only be attributed to one person.

c. Relationship between people and book rents:

- Book table to book_rents table: one-to-many.</br>
- Reason for using this relationship: One book might be rented multiple times but one rent can only be attributed to one person.

### 2. Query performance

The sets of queries were run in Posgres with the `EXPLAIN` statement before the queries in order to show the run time statistics. The cost of different sets were compared and the lowest-cost set was chosen.
