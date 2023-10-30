import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
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
    accountType: {
      type: String,
      default: "seeker",
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

// middleware thực thi trước khi user được lưu vào DB
userSchema.pre("save", async function() {
    // check field password có được sửa đổi không
    if(!this.isModified) {
        return;
    }

    const salt =  await bcrypt.getSalt(10);
    // Mật khẩu được băm bằng cách kết hợp với salt để tạo ra một chuỗi băm duy nhất
    // chuỗi băm sẽ được gán lại vào field password của user
    this.password = await bcrypt.hash(this.password, salt);
})

// compare password
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

// JWT token
userSchema.methods.createToken = async function() {
    return JWT.sign({userId: this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '1d'});
}

const Users = mongoose.model('Users', userSchema);

export default Users;
