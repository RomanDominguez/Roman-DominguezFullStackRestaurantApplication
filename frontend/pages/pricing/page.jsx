import {Stripe} from 'stripe'

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list();
    return prices.data;
}

async function PricingPage() {

    const prices = await loadPrices(); 
    console.log(prices); 

    return (
        <div>
            <h1>Pricing</h1>
            {
                prices.map(price => ( 
                    <div key={price.id}>
                        <h3>{price.nickname}</h3>
                        <h2>{price.unit_amount / 100}</h2>
                        <h2>{price.unit_amount_decimal}</h2>
                        <button>
                            Buy
                        </button>
                    </div>
                ))
            }
        </div>
        );
}
                
export default PricingPage;
