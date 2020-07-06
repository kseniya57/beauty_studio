import * as R from 'ramda';

const createActions = (moduleName, subject) =>
  ['request', 'success'].reduce(
    (result, type) =>
      Object.assign(result, {
        [type]: ['get', 'add', 'update', 'remove', 'reorder'].reduce(
          (map, actionName) =>
            Object.assign(map, {
              [actionName]: `${moduleName}/${actionName}_${subject}_${type}`
            }),
          {}
        )
      }),
    {}
  );

const findRelatedAndChange = (state, subject, relatedId, process) =>
  state[subject].map(item => (item.id === relatedId ? process(item) : item));

export default (moduleName, subject, singleSubject, ReducerRecord, defaultReducer) => {
  const actions = Object.assign(createActions(moduleName, subject), {
    related: createActions(moduleName, `${subject}_relation`),
    error: `${moduleName}/ERROR`
  });

  function reducer(state = R.clone(ReducerRecord), action) {
    const { type, payload } = action;
    switch (type) {
      case actions.request.get:
      case actions.request.add:
      case actions.request.update:
      case actions.request.remove:
      case actions.related.request.get:
      case actions.related.request.add:
      case actions.related.request.update:
      case actions.related.request.remove:
        return R.merge(state, { loading: true, error: null });
      case actions.success.get:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: payload
        });
      case actions.success.add:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: [...state[subject], payload],
          [singleSubject]: payload,
        });
      case actions.success.update:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: state[subject].map(item =>
            item.id === payload.id ? payload : item
          ),
          [singleSubject]: payload,
        });
      case actions.success.remove:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: state[subject].filter(item => item.id !== +payload)
        });
      case actions.related.success.get:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: findRelatedAndChange(
            state,
            subject,
            payload.relatedId,
            item => R.merge(item, { [payload.relation]: payload.data })
          )
        });
      case actions.related.success.add:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: findRelatedAndChange(
            state,
            subject,
            payload.relatedId,
            item =>
              R.merge(item, {
                [payload.relation]: [...item[payload.relation], payload.data]
              })
          )
        });
      case actions.related.success.update:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: findRelatedAndChange(
            state,
            subject,
            payload.relatedId,
            item =>
              R.merge(item, {
                [payload.relation]: item[payload.relation].map(t =>
                  t[`${payload.relation}Id`] === payload.data.id
                    ? payload.data
                    : t
                )
              })
          )
        });
      case actions.related.success.remove:
        return R.merge(state, {
          loading: false,
          error: null,
          [subject]: findRelatedAndChange(
            state,
            subject,
            payload.relatedId,
            item =>
              R.merge(item, {
                [payload.relation]: item[payload.relation].filter(
                  t => t[`${payload.relation}Id`] !== +payload.id
                )
              })
          )
        });
      case actions.error:
        return R.merge(state, {
          loading: false,
          activate: false,
          error: payload
        });
      case actions.request.reorder: {
        const { startIndex, endIndex } = action.payload.data;
        const result = Array.from(state[subject]);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return R.merge(state, {
          [subject]: result,
        })
      }
      default:
        return defaultReducer
          ? defaultReducer(action, state)
          : R.set(R.lensProp('error'), null, state);
    }
  }

  const actionCreators = {
    get: payload => ({
      type: actions.request.get,
      payload
    }),

    add: data => ({
      type: actions.request.add,
      payload: {
        data
      }
    }),

    update: data => ({
      type: actions.request.update,
      payload: {
        data
      }
    }),

    reorder: data => ({
      type: actions.request.reorder,
      payload: {
        data
      }
    }),

    remove: data => ({
      type: actions.request.remove,
      payload:
        typeof data === 'object'
          ? data
          : {
              id: data
            }
    }),

    addRelated: (relation, id, data) => ({
      type: actions.related.request.add,
      payload: {
        data,
        id,
        relation
      }
    }),

    updateRelated: (relation, id, data) => ({
      type: actions.related.request.update,
      payload: {
        data,
        id,
        relation
      }
    }),

    removeRelated: (relation, data) => ({
      type: actions.related.request.remove,
      payload: {
        relation,
        data
      }
    })
  };

  return { reducer, actions, actionCreators };
};
