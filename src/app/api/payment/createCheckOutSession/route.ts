import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { IOrderDetails } from '@/app/types/orders';
import { config } from '@/config/configuration';
import OrderModel from '@/models/orders.model';
import { connectToDB } from '@/config/db';
// Initialize Stripe as a singleton
let stripeInstance: Stripe | null = null;
function getStripeInstance(): Stripe {
    if (!stripeInstance) {
        console.log('[Stripe] Initializing new Stripe instance');
        stripeInstance = new Stripe(config.stripe.stripeSecretKey, {
            apiVersion: "2025-06-30.basil",
            maxNetworkRetries: 2,
            timeout: 20000,
        });
    }
    return stripeInstance;
}
export async function POST(request: Request) {
    let dbConnection = null;
    try {
        console.log('[API] Starting checkout process');
        // Database connection
        console.log('[DB] Connecting to database...');
        dbConnection = await connectToDB();
        const requestBody = await request.json();
        console.log('[API] Received request body with items:', requestBody.items?.length || 0);
        const { items } = requestBody as IOrderDetails;
        // Create order
        console.log('[DB] Creating new order...');
        const newOrder = new OrderModel({
            ...requestBody,
            status: "Unpaid"
        });
        const savedOrder = await newOrder.save();
        console.log('[DB] Order created with ID:', savedOrder._id.toString());
        if (!savedOrder) {
            console.error('[DB] Failed to save order');
            return NextResponse.json({
                message: "Error creating Order",
                success: false,
                status: 400
            });
        }
        // Prepare Stripe items
        console.log('[Stripe] Preparing line items...');
        const line_items = items.map((item) => {
            const unit_amount = Math.round(parseFloat(item.price) * 100);
            if (isNaN(unit_amount)) {
                console.error('[Validation] Invalid price for item:', item.productName);
                throw new Error(`Invalid price for ${item.productName}`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productName,
                    },
                    unit_amount,
                },
                quantity: item.quantity,
            };
        });
        // Create Stripe session
        console.log('[Stripe] Creating checkout session...');
        const stripe = getStripeInstance();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: `${config.websiteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.websiteUrl}/cancel`,
            metadata: {
                orderId: savedOrder._id.toString(),
            },
        });
        console.log('[Stripe] Session created with URL:', session.url);
        return NextResponse.json({
            message: "Order Request Received, redirecting to Payment page.",
            success: true,
            data: {
                type: 'stripe',
                url: session.url
            }
        });
    } catch (error: any) {
        console.error('[ERROR] Checkout failed:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            {
                error: 'Failed to create checkout session',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}