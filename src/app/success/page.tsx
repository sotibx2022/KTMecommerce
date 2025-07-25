import Stripe from 'stripe';
import { config } from '@/config/configuration';
import PaymentSuccess from './PaymentSuccess';
import PaymentError from './PaymentError';
interface ISearchParams {
    searchParams: Promise<{ session_id: string }>
}
export default async function SuccessPage({
    searchParams: maybeSearchParams,
}: ISearchParams) {
    const searchParams = await maybeSearchParams;
    const stripe = new Stripe(config.stripe.stripeSecretKey);
    try {
        if (!searchParams.session_id) {
            throw new Error('No session ID provided');
        }
        const session = await stripe.checkout.sessions.retrieve(
            searchParams.session_id
        );
        const orderId = session.metadata?.orderId;
        if (!orderId) {
            throw new Error('No order ID found in session metadata');
        }
        return (
            <PaymentSuccess
                orderId={orderId}
            />
        );
    } catch (error) {
        return (
            <PaymentError
                error={new Error("Your payment UnsuccessFull")}
                orderId="ORD-12345"
            />
        );
    }
}