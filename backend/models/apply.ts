import mongoose from 'mongoose';

const applySchema = new mongoose.Schema(
	{
		corporation: { type: String, required: true },
		email: { type: String, required: true },
		position: { type: String, required: true },
		techno: { type: String, required: true },
		comment: { type: String, required: true },
		city: { type: String, required: true },
		reminder: { type: Date, required: true },
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Apply = mongoose.model('Apply', applySchema);

export default Apply;
