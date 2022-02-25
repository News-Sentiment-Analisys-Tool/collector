'use strict';

import { SaveBradescoTweetsController } from '../../../adapters/controller/saveBradescoTweetsController'

exports.handler = async event => {

  console.log('init::start save bradesco tweets cron')
  
  const saveBradescoTweetsController = new SaveBradescoTweetsController()

  await saveBradescoTweetsController.run()
  
};
