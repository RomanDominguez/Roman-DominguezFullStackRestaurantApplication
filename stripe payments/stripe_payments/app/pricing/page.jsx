import {Stripe} from 'stripe'
import ButtonCheckout from '../components/ButtonCheckout'
/*
Para este ejercicio es lo mismo que en la api/prices/route.js solamente que en este caso se hara dentro de un componente
*/

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list();
    const sortedPrices = prices.data.sort((a, b) => a.unit_amount - b.unit_amount) //Esta linea de codig acomoda los precios de menor a mayor
    return sortedPrices; //Aqui retorna el valor de los items acomodados por precio
}

//React server component

async function PricingPage() {

    const prices = await loadPrices(); //Aqui se ejecuta la orden para ver los precios
    console.log(prices); //se debe desplegar los precios en consola de buscador 

    return (
        <center><div className="flex justify-center items-center h-screen">
            <div>
                <header>
                    <h1 className="text-center my-5">Pricing</h1>
                </header>
                <div className="flex gap-x-2">
                    {prices.map(price => ( 
                    <div key={price.id} className="bg-slate-300 mb-2 p-7">
                        <h3>{price.nickname}</h3>
                        <h2 className="text-3xl font-bold">{price.unit_amount / 100}$</h2>
                        <ButtonCheckout priceId={price.id}/>
                    </div>
                ))}
                </div>
            </div>
        </div></center>
    );
}
                
export default PricingPage;