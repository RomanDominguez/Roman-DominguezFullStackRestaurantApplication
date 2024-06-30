"use client" //Es un componente cliente por tal motivo se debe colocar "use client"

function ButtonCheckout({ priceId }) { //El priceId se obtendra del componente insertado como propiedad "priceId={price.id}" en el <ButtonCheckout /> 
    return (
    <button
        className="bg-sky-500 text-white px-4 py-2 rounded"
        onClick={ async () => { //se cambia a funcion asincrona
            console.log("click");//Aqui mostrara un click cada vez que se haga un click en el boton buy
            console.log(priceId);//Aqui se vera en la consola el valor identificador del precio al hacer click en el boton buy
            const res = await fetch('/api/checkout', { //Aqui se solicita la informacion del codigo dentro de api/checkout/route.js
                method: 'POST', //Este metodo es para postear el resultado pero por defecto es el metodo get
                body: JSON.stringify({ priceId }), //Aqui se genera el objeto del valor del precio id
                headers: { 'Content-Type': 'application/json'}
            })
            const data = await res.json() //Aqui se convierte la respuesta a un objeto de JS
            console.log(data) //Aqui se despliega la informacion en la consola
            window.location.href = data.url //Aqui el navegador leera la url y te dirigira hacia ella
        }}
    >
        Buy
    </button>
    );
}

export default ButtonCheckout;