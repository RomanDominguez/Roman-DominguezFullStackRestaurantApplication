import { NextResponse } from 'next/server'
import {Stripe} from 'stripe' //se importa una clase llamada Stripe la cual se debe instanciar e introducirle la llave secreta generada en stripe test mode

export async function GET() {
   const  stripe =  new Stripe(process.env.STRIPE_SECRET_KEY) //Esto genera un objeto por lo cual se denomina como una constante o instancia
   const prices = await stripe.prices.list() //aqui se genera la consulta de precios se usa await ya que sera asincona
   console.log(prices) //aqui se pueden ver los precios en la consola no en la pagina
   
   return NextResponse.json(prices.data); //aqui se desplegara la lista de informacion de productos creados en stripe
}