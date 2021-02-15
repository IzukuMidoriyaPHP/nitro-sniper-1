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
   // Try to parse settings
   // Define settings with defaults
   // Init selected mode
   // Counters
   // Get payment method
   // Init webhook
}

init();