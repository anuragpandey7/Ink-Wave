import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndPoint)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // another method
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.deleteSession();
    } catch (error) {
      throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
