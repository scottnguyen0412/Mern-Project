import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email Address is required"],
      unique: true,
      validators: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least"],
      select: true,
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    jobPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Jobs",
      },
    ],
  },
  { timestamps: true }
);

companySchema.pre("save", async function () {
  // check field password có được sửa đổi không
  if (!this.isModified) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  // Mật khẩu được băm bằng cách kết hợp với salt để tạo ra một chuỗi băm duy nhất
  // chuỗi băm sẽ được gán lại vào field password của user
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
companySchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JWT token
companySchema.methods.createJWT = async function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Companies = mongoose.model("Companies", companySchema);

export default Companies;
