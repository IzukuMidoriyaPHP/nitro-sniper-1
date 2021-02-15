const { Util: djsUtil } = require('discord.js');

async function init() {
   // Payment
   let res = await phin({
      url: constants.paymentSourceURL,
      method: 'GET',
      parse: 'json',
      headers: {
         'Authorization': settings.tokens.main,
         'User-Agent': constants.userAgent
      }
   });

   if (!res.body || res.body?.length === 0) {
      logger.warn(constants.noPaymentMethod);
   } else if (res.body[0]) {
      global.paymentId = res.body[0].id;
   } else {
      logger.warn(constants.paymentMethodFail(res.body));
   }

   // Init webhook
   if (settings.webhook?.url) {
      const webhookToken = /[^/]*$/.exec(settings.webhook.url)[0];
      const webhookId = settings.webhook.url.replace(/^.*\/(?=[^\/]*\/[^\/]*$)|\/[^\/]*$/g, '');
      global.webhook = new Webhook(webhookId, webhookToken);
   }

   return logger.success(constants.ready(sniperCount, guildCount));
}

init();