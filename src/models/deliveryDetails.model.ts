import mongoose, { Document, Schema, Types } from "mongoose"
interface IDeliveryDetails extends Document {
    shippingAddress: {
        state: string,
        city: string,
        street: string,
    },
    userId:{
        type:Types.ObjectId
    }
}
const deliveryDetailsSchema = new Schema<IDeliveryDetails>({
    shippingAddress: {
        state: {
            required: true,
            type: String,
        },
        city: {
            required: true,
            type: String,
        },
        street: {
            required: true,
            type: String
        }
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        reference:"User"
    }
},
{timestamps:true})
const DeliveryDetailsModel = mongoose.models.delivery || mongoose.model("delivery",deliveryDetailsSchema)
export default DeliveryDetailsModel