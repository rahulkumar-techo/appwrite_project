### THESE ARE ALL OPEN SOURCE CONTRIBUTE .
firBase / app write (api auth , storage,etc...)
Tinymce
ENV
React Hook Form

### Note For App Writte :

```npm
npm create vite@latest
```
Vite [https://vitejs.dev/guide/]("https://vitejs.dev/guide/")

```js
// packages Installion form this project
npm i @reduxjs/toolkit react-redux react-router-dom app
write @tinymce/tinymce-react html-react-parser react-hook-form
```

### Documnets
Tinymce:[https://www.npmjs.com/package/@tinymce/tinymce-react]("https://www.npmjs.com/package/@tinymce/tinymce-react")

Html-react-parser:[https://www.npmjs.com/package/html-react-parser]("https://www.npmjs.com/package/html-react-parser")

react-hook-form :[https://www.npmjs.com/package/react-hook-form]("https://www.npmjs.com/package/react-hook-form")

react-redux :[https://react-redux.js.org/]("https://react-redux.js.org/")

Redux/toolkit:[https://www.npmjs.com/package/@reduxjs/toolkit]("https://www.npmjs.com/package/@reduxjs/toolkit")


### Env in vite 

#### How does .env works in vite react app  ? 
This a document about .env |
                           |
[https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes]("https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes")

```js
console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(import.meta.env.DB_PASSWORD) // undefined
```
cautions : You have to always define variable in .env file with `VITE_ANY-VARIABLE-NAME`

```js
// SetUp all the files in Appwrite .
VITE_APP_APPWRITE_URL="Enviroment variable"
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
```
# 2nd Build Authentication
 #### Vendor locking 


APP WRITE LOGIN DOCS: [https://appwrite.io/docs/products/auth/email-password]("https://appwrite.io/docs/products/auth/email-password")

```js

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// We have created a sepreate class //
export class Authentication {
  Client = new Client();
  Account;
  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );
    this.Account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.Account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.Account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.Account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logOut() {
    try {
      return await this.Account.deleteSessions("all");
    } catch (error) {
      throw error;
    }
  }
}

// we export as object that can be easy to access all the methods by dot.
// otherwise it can be messi by creating new object .
const authService = new Authentication();
export default authService;

```

## File related works 
Storage related work `(createFile / update file / read or get File / delete file)` CURD operations.
[https://appwrite.io/docs/references/cloud/client-web/storage]("https://appwrite.io/docs/references/cloud/client-web/storage")
