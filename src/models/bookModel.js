// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genresEnum = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Historical Fiction",
    "Romance",
    "Adventure",
    "Action",
    "Dystopian",
    "Comedy",
    "Satire",
    "Drama",
    "Poetry",
    "Non-fiction",
    "Biography",
    "Autobiography",
    "Memoir",
    "Self-help",
    "Business",
    "Finance",
    "Psychology",
    "Philosophy",
    "Science",
    "Technology",
    "History",
    "Politics",
    "Sociology",
    "Anthropology",
    "Mystery",
    "Crime",
    "Detective",
    "Espionage",
    "Legal",
    "Medical",
    "Political thriller",
    "Spy thriller",
    "War/Military",
    "Western",
    "Coming-of-age",
    "Family drama",
    "Children's",
    "Middle-grade",
    "Young Adult (YA)",
    "New Adult (NA)",
    "Religious/Inspirational",
    "Fantasy Romance",
    "Paranormal Romance",
    "Historical Romance",
    "Contemporary Romance",
    "LGBTQ+",
    "Women's Fiction",
    "Chick Lit",
    "Urban Fantasy",
    "Epic Fantasy",
    "High Fantasy",
    "Alternate History",
    "Steampunk",
    "Cyberpunk",
    "Post-apocalyptic",
    "Space Opera",
    "Hard Science Fiction",
    "Soft Science Fiction",
    "Humor",
    "Satire",
    "Farce",
    "Tragedy",
    "Historical Non-fiction",
    "True Crime",
    "Science and Nature",
    "Travel",
    "Food and Cooking",
    "Art and Photography",
    "Music",
    "Sports and Recreation",
  ];

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: Number,
    genres: [{ type: String, enum: genresEnum }],
    public: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coverImage: { type: String, required: false }, // Optional path or URL to the cover image
    // Optional fields
    characters: [
      {
        name: String,
        description: String,
        _id: false,
        // timestamps: { createdAt: true }
      },
    ],
    additionalFields: [
      {
        field: String,
        note: String,
        _id: false,
        // timestamps: { createdAt: true }
      },
    ],
    dateOfPublication: Date,
    dateStartedReading: Date,
    dateFinishedReading: Date,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;



// const characterSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: String,
//   },
//   { _id: false, timestamps: { createdAt: true, updatedAt: false } }
// );

// const additionalFieldSchema = new mongoose.Schema(
//   {
//     field: {
//       type: String,
//       required: true,
//     },
//     note: String,
//   },
//   { _id: false, timestamps: { createdAt: true, updatedAt: false } }
// );

// const bookSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     publishedYear: Number,
//     genres: [String], // An array of strings
//     characters: [characterSchema], // Optional field for characters
//     additionalFields: [additionalFieldSchema], // Optional field for user-defined fields and notes
//     dateOfPublication: Date,
//     dateStartedReading: Date,
//     dateFinishedReading: Date,
//   },
//   { timestamps: true }
// ); // Automatically adds createdAt and updatedAt fields

// module.exports = mongoose.model("Book", bookSchema);
