import { makeReducer, makeSaga } from '@/store/helpers';
import { photosActions } from './photos';
import * as R from 'ramda';

export const moduleName = 'cards';

export const ReducerRecord = {
  cards: [],
  card: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'cards', 'card', ReducerRecord, ({ type, payload }, state) => {
  if (type === photosActions.request.remove) {
    return R.merge(state, {
      error: null,
      cards: state.cards.map(item => item.id === payload.cardId
        ? R.merge(item, { images: item.images.filter(image => image.id !== payload.id) })
        : item
      )});
  }
  return state;
});

export default reducer;

export const cardsActionCreators = actionCreators;

export const saga = makeSaga('/cards', actions);
