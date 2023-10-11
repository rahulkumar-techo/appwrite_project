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
