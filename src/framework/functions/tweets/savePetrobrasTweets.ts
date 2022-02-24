'use strict';

import { SavePetrobrasTweetsController } from '../../../adapters/controller/savePetrobrasTweetsController'

exports.handler = async event => {

  console.log('init::start save petrobras tweets cron')
    
  const savePetrobrasTweetsController = new SavePetrobrasTweetsController()

  return savePetrobrasTweetsController.run()
  
};
