'use strict';

const stripe = require ("stripe")("sk_test_51PTcC8068sYNCeUIMqURVZjJz71UGz3BY2ZiQc7HVsE6EFFPfaUY0OzuXmYhIZ5IgEcYycqxBP7R60WaVdCGNlpW00IfHYhl4j");


const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You are not authorized!");
    }
    
/*
    console.log(ctx.request.body.data);
    console.log(ctx.state.user.id);
    console.log("order controller");
*/
    const { address, amount, dishes, token, city, state } = ctx.state.body.data;

    try {
      // Charge the customer
      await stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });

      // Create the order
      const order = await strapi.service("api::order.order").create({
        data: {
          amount,
          address,
          dishes,
          city,
          state,
          token,
          user: ctx.state.user.id,
        },
      });
      return order;
    } catch (err) {
      // return 500 error
      console.log("err", err);
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
        address,
        amount,
        dishes,
        token,
        city,
        state,
      };
    }
  },
}));
 


