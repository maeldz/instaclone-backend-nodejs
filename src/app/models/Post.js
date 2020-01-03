import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: {
      path: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.set('toJSON', { virtuals: true });

PostSchema.virtual('image.url').get(
  (value, virtual, doc) => `${process.env.APP_URL}/files/${doc.image.path}`,
);

export default mongoose.model('Post', PostSchema);
