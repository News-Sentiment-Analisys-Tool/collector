'use strict';

import { SaveItauTweetsController } from '../../../adapters/controller/saveItauTweetsController'

exports.handler = async event => {

  console.log('init::start save itau tweets cron')
    
  const saveItauTweetsController = new SaveItauTweetsController()

  await saveItauTweetsController.run()
  
};
