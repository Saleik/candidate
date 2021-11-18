import mongoose from 'mongoose';

interface ISavedUserSchema {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model<ISavedUserSchema>('User', userSchema);

export default User;
