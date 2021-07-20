import mongoose from 'mongoose';

const applySchema = new mongoose.Schema(
	{
		corporation: { type: String, required: true },
		position: { type: String, required: true },
		city: { type: String, required: true },
		firstApply: { type: Date, required: true },
		revival: { type: Date, required: true },
		lastRevival: Date,
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
