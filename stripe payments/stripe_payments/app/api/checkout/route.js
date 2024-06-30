import { NextResponse } from 'next/server'
import { Stripe } from 'stripe'//Se hara uso de la creacion de sesiones en stripe es decir del formulario de compra

export async function POST(request) { //Para poder extraer la informacion se añade un request
    const data = await request.json() //Aqui se genera un objeto de la informacion, data puede ser reemplazado por 
                                      //const {priceId} = await request.json() para anotar en line_items: [{ price: priceId}]
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)//Aqui se hace uso nuevamente de la llave screta de stripe

   const session = await stripe.checkout.sessions.create({ //Aqui se crea el formulario de compra, SE DENOMINA SESSION ES DECIR UN OBJETO PARA PODER VER EL RESULTADO EN CONSOLA
        mode: 'payment', //modo: pago ESTE VALOR SERA AFECTADO POR LOS VALORES INTRODUCIDOS EN STRIPE P.EJ PARA PAGO RECURRENTE ES [mode: 'suscription]
        payment_method_types: ['card'], //tipo de pago
        line_items: [  //aqui se deben introducir todos los productos en venta
            {
                price: data.priceId, //Aqui se puede utilizar solo price: priceId pero se debera reemplazar const data por {priceId}
                quantity: 1  //Aqui se define la cantidad de productos de compra
            }
        ],
        success_url: 'http://localhost:3000/success', //Aqui al finalizar la compra se dirigira a una pagina de compra exitosa
        cancel_url: 'http://localhost:3000/pricing' //Aqui si se cancela la compra regresara a la pagina de pricing
    })
    console.log(session)

    return NextResponse.json({ url: session.url, });
}

//para probar este mensaje se podra realizar con thunderclient, postman u otro plugin pero no desde el navegador
//o incluso hacer una peticion post en el boton co un onClick

//la sesion es el formulario de compra