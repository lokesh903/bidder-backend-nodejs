import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

interface IUser extends Document {
  userName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  password: string;
  gender: string;
  image: string;
  isDeleted: boolean;
  accessToken: string;
  oneTimeCode: string;
}

interface IUserMethods {
  setPassword(password: string): Promise<string>;
  authenticate(dbPassword: string, incomingPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const DocSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    userName: {
      type: String,
      default: "",
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    // lastName: {
    //   type: String,
    //   default: "",
    //   trim: true,
    //   lowercase: true,
    //   minlength: 3,
    // },
    email: {
      type: String,
      default: "",
      index: true,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
    // password: {
    //   type: String,
    //   default: "",
    //   required: false,
    //   unique: true,
    //   trim: true,
    // },
    // gender: {
    //   type: String,
    //   enum: ["MALE", "FEMALE", "OTHER"],
    //   default: "OTHER",
    // },
    // image: {
    //   type: String,
    //   default: "",
    // },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    // accessToken: {
    //   type: String,
    //   default: "",
    //   index: true,
    // },
    // oneTimeCode: {
    //   type: String,
    //   default: "",
    //   index: true,
    // },
  },
  {
    timestamps: true,
  }
);

DocSchema.methods.setPassword = async function setPassword(password: string) {
  return await bcrypt.hash(password, 10);
};

DocSchema.methods.authenticate = async function authenticate(
  dbPassword: string,
  incomingPassword: string
) {
  return await bcrypt.compare(incomingPassword, dbPassword);
};

export default mongoose.model<IUser, UserModel>("User", DocSchema);
