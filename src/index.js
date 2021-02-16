const { Util: djsUtil } = require('discord.js');

async function init() {
   // Requires
   const Constants = require('./lib/Constants');
   const Webhook = require('./lib/Webhook');
   const Logger = require('./lib/Logger');
   const modes = require('./modes/index');
   const Util = require('./lib/Util');
   const chalk = require('chalk');
   const phin = require('phin');

   // Call dotenv to recognize env vars
   require('dotenv').config();

   console.log(chalk.green(`
                                           ╓╖,
               g▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄╬╣╣╣╢╬N╖
              ▐▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╣╣╣╣╣╣╣╣╣╢╣╣@,
               ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╣╣╣╣╣╣╣╢╢╣╣╣╣╣@,
                        ╙▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╣╣╣╣╣╣╢╣╣╣╣╣╣╣╣╣╣W
                        g▓▓▓▓▓▓╢▓▓▓▓╩╨╨╩╬╣╢╣╢╣▒╣╣╣╣╣╣╣╣╣╣╣╣
 Æ▓▓▓▓⌐   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╢▓▓╝⌠░░░░░░░░░░╙╨╣╣╣╣╣╣╣╣╣╣╣╣╣╣╣
 ╙▀▓▓▀    ╙▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓╢▓▓╩░░░░░░░░░░░░░░░░╙╣╣╣╣╣╣╣╣╣╣╣╣╣@
                     ▓▓▓▓╢▓▓░░░░░╓╢▒▒▒▒▒▒╢░░░░░╙╣╣╣╣╣╣╣╣╣╣╣╣╢
               g▄▄▄▄▄▓▓▓▓▓▓Ñ░░░░║▒▒▒▒▒▒▒▒▒▒╖░░░░║╣╣╣╣╣╣╣╣╣╣╣╣⌐
              ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░║▒▒▒▒▒▒▒▒▒▒▒▒▒░░░]╣╣╣╣╣╣╣╣╣╣╣╣⌐
               ╙╙▐▓▓▓▓▓▓▓▓▓@░░░░╙▒▒▒▒▒▒▒▒▒▒╜░░░░║╣╣╣╣╣╣╣╣╣╣╣╣
                  ▓▓▓▓▓▓▓╣▓▓░░░░░╙▒▒▒▒▒▒▒▒░░░░░╓╣╣╣╣╣╣╣╣╣╣╣╣Ñ
                  ╚▓▓▓▓▓▓▓▓▓▓@░░░░░░░░░░░░░░░░░░░╢╣╣╣╣╣╣╣╣╣╣
                   ▐▓▓▓▓▓▓▓▓╢▓▓@µ░░░░░░░░░░╓@░░░░░░╙╣╣╣╣╣╣╢\`
                    ╙▓▓▓▓▓▓▓▓▓▓╢▓▓▓▓@@@@▓▓▓▓╢▓▄░░░░░░░╜╨╣╢░
                      ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄░░░░░░░▒
                         ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╜\"░▒░\"
                           ▀▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▀╩
                               ╙╙▀▀▀▓▓▓▓▀▀▀╙╙
   `));

   // Define globals
   global.snipers = [];
   global.webhook = null;
   global.constants = Constants;
   global.util = Util;
   global.logger = new Logger({ debug: false });
   global.pID = null;

   // Try to parse settings
   try {
      global.settings = JSON.parse(process.env.settings);
   } catch {
      return logger.critical(constants.invalidConfig);
   }

   // Define settings with defaults
   global.settings = djsUtil.mergeDefault(constants.defaultSettings, settings);

   if (!settings.mode) return logger.critical(constants.noMode);
   if (!Object.keys(modes).includes(settings.mode)) return logger.critical(constants.invalidMode);

   // Init selected mode
   logger.debug(constants.initSniper);
   await modes[settings.mode]();

   if (!snipers.length) return logger.critical(constants.invalidTokens);

   // Get p method
   let res = await phin({
      url: constants.pSourceURL,
      method: 'GET',
      parse: 'json',
      headers: {
         'Authorization': settings.tokens.main,
         'User-Agent': constants.userAgent
      }
   });

   if (!res.body || res.body?.length === 0) {
      logger.warn(constants.noPMethod);
   } else if (res.body[0]) {
      global.pID = res.body[0].id;
   } else {
      logger.warn(constants.pMethodFail(res.body));
   }

   // Init webhook
   if (settings.webhook?.url) {
      const webhookToken = /[^/]*$/.exec(settings.webhook.url)[0];
      const webhookId = settings.webhook.url.replace(/^.*\/(?=[^\/]*\/[^\/]*$)|\/[^\/]*$/g, '');
      global.webhook = new Webhook(webhookId, webhookToken);
   }

   return logger.success(
      constants.ready(
         snipers.length,
         snipers.map(s => s.guilds.cache.size).reduce((a, b) => a + b, 0)
      )
   );
}

init();