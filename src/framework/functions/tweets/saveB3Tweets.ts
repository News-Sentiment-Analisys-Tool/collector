'use strict';

import { SaveB3TweetsController } from '../../../adapters/controller/saveB3TweetsController'

exports.handler = async event => {

  console.log('init::start save b3 tweets cron')
    
  const saveB3TweetsController = new SaveB3TweetsController()

  await saveB3TweetsController.run()
  
};
