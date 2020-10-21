import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Mongo db connect ${conn.connection.host}`.green.bold);
  } catch (err) {
    console.error(
      `Error on connect to mongodb, ${err.message}`.red.underline.bold
    );
    process.exit(1);
  }
};

export default connectDb;
