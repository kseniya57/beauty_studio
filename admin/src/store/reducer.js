import { combineReducers } from 'redux';
import settingsReducer, {
  moduleName as settingsModule
} from './ducks/settings';
import cardsReducer, { moduleName as cardsModule } from './ducks/cards';
import coursesReducer, { moduleName as coursesModule } from './ducks/courses';
import faqReducer, { moduleName as faqModule } from './ducks/faq';
import featuresReducer, {
  moduleName as featuresModule
} from './ducks/features';
import mastersReducer, { moduleName as mastersModule } from './ducks/masters';
import photosReducer, { moduleName as photosModule } from './ducks/photos';
import professionalFeaturesReducer, {
  moduleName as professionalFeaturesModule
} from './ducks/professionalFeatures';
import socialReducer, { moduleName as socialModule } from './ducks/social';
import servicesReducer, {
  moduleName as servicesModule
} from './ducks/services';
import addressesReducer, {
  moduleName as addressesModule
} from './ducks/addresses';
import vacanciesReducer, {
  moduleName as vacanciesModule
} from './ducks/vacancies';
import reviewsReducer, {
  moduleName as reviewsModule
} from './ducks/reviews';
import authReducer, { moduleName as authModule } from './ducks/auth';

export default combineReducers({
  [settingsModule]: settingsReducer,
  [cardsModule]: cardsReducer,
  [coursesModule]: coursesReducer,
  [faqModule]: faqReducer,
  [featuresModule]: featuresReducer,
  [mastersModule]: mastersReducer,
  [photosModule]: photosReducer,
  [professionalFeaturesModule]: professionalFeaturesReducer,
  [socialModule]: socialReducer,
  [servicesModule]: servicesReducer,
  [addressesModule]: addressesReducer,
  [vacanciesModule]: vacanciesReducer,
  [reviewsModule]: reviewsReducer,
  [authModule]: authReducer
});
