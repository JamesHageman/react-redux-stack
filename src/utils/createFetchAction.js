import invariant from 'invariant';

export const START = 'START';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export default function createFetchAction(type, configProvider) {
  invariant(type, '`createFetchAction(type, configProvider)` requires a ' +
            '`type`');

  const meta = {
    isFetchAction: true
  };

  return (...args) => {
    const {url, params} = configProvider(...args);
    invariant(url, 'The second arg to `createFetchAction()` must return an' +
                   'object with a `url`');

    return (dispatch) => {
      const req = {
        url,
        params
      };

      dispatch({
        type,
        payload: {
          req
        },
        meta: {
          ...meta,
          stage: START
        }
      });

      fetch(url, params).then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }

        return res.json();
      })
      .then(data => dispatch({
        type,
        payload: {
          req: req,
          res: data
        },
        meta: {
          ...meta,
          stage: SUCCESS
        }
      }))
      .catch(err => dispatch({
        type,
        error: err,
        payload: {
          req: req
        },
        meta: {
          ...meta,
          stage: ERROR
        }
      }));
    };
  };
}
