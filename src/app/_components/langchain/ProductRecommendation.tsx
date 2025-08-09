interface IproductRecommendationInput {
    productRecommendationText: string,
}
import React from 'react'
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent'
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
import ReadOnlyUserProfile from '../singleProductReviews/ReadOnlyUserProfile'
import { useForm } from 'react-hook-form'
import SecondaryButton from '../secondaryButton/SecondaryButton'
import { validate } from 'node_modules/@langchain/core/dist/utils/fast-json-patch'
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions'
import PageHeader from '../pageHeader/PageHeader'
import { Sparkles } from 'lucide-react'
import RecommendationTrigger from './RecommendationTrigger'
import SubmitError from '../submit/SubmitError'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
const ProductRecommendation = () => {
    const context = useUserDetails()
    const { userDetails } = context;
    const { register, formState: { errors }, handleSubmit } = useForm<IproductRecommendationInput>({ mode: 'onChange' })
    const userQueryMutation = useMutation<APIResponseSuccess|APIResponseError,Error,IproductRecommendationInput>({
        mutationFn:async(data)=>{
            const response = await axios.post('api/productRecommendation',data);
            return response.data;
        },onSuccess:(response)=>{
            toast.success(response.message)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    const onSubmit = (data: IproductRecommendationInput) => {
        userQueryMutation.mutate(data)
    }
    return (
        <AbsoluteComponent>
            <div className='recommendationHeader my-4 flex gap-4 items-center'>
                <RecommendationTrigger />
                <h2 className='secondaryHeading'>Smart selections powered by AI</h2>
            </div>
            <div className="chattingArea">
                <div className="userProfile">
                    <ReadOnlyUserProfile />
                </div>
                <form className="recommendationInfo" onSubmit={handleSubmit(onSubmit)}>
                    <textarea className='formItem' placeholder='eg. samsung mobile max price $ 500'
                        {...register('productRecommendationText', {
                            validate: (value) => validateSentence("Recommendation Text", value, 5, 100)
                        })
                        } />
                    {errors.productRecommendationText?.message && <SubmitError message={errors.productRecommendationText.message} />}
                    <SecondaryButton text={'Submit'} />
                </form>
            </div>
        </AbsoluteComponent>
    )
}
export default ProductRecommendation