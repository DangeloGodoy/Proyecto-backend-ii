import { connect } from "mongoose";

class DatabaseConect {
  constructor(url) {
    this.url = url;
    if (typeof DatabaseConect.instance === "object") {
      return DatabaseConect.instance;
    } else {
      DatabaseConect.instance = this;
        return this;
    }
  }

  /**
   * @dbConnect
   * Connect to database
   * @param {string} url
   * @returns {Promise}
   */
  dbConnect = async (url) => {
    try {
      connect(url);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection error");
    }
  };
}
export default DatabaseConect;
