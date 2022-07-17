import mongoose from 'mongoose';

// const postSchema = mongoose.Schema({
//     title: String,
//     message: String,
//     name: String,
//     creator: String,
//     tags: [String],
//     selectedFile: String,
//     likes: { type: [String], default: [] },
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     },
// })

const CarsSchema = mongoose.Schema({
    numberPlate : String,
    info: {
        type: String,
        default: "no info",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var CarsInfo = mongoose.model('CarsInfo', CarsSchema);

export default CarsInfo;