import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({

    slotNo : {type: Number, required: true},
    free : {type: String, default: "NO"},

});

export default mongoose.model("parking", parkingSchema);