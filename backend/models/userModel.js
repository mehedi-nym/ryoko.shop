import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, //  Added phone
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false });

// model definition
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
