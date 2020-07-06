import { combineReducers } from 'redux';
import settingsReducer, { moduleName as settingsModule } from './ducks/settings';
import dataReducer, { moduleName as dataModule } from './ducks/data';
import schoolReducer, { moduleName as schoolModule } from './ducks/school';

export default combineReducers({
  [settingsModule]: settingsReducer,
  [dataModule]: dataReducer,
  [schoolModule]: schoolReducer,
});
