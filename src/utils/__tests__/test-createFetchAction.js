jest.autoMockOff();

describe('createFetchAction', () => {
  const createFetchAction = require('../createFetchAction.js').default;

  let myAction;

  beforeEach(() => {
    global.fetch = jest.genMockFn();
    global.fetch.mockReturnValue(new Promise((resolve) => {
      resolve({
        status: 200,
        json: () => ({
          data: 'bar'
        })
      });
    }));

    myAction = createFetchAction('FOO', ({id}) => ({
      url: 'foo',
      params: {
        id: id
      }
    }));
  });

  it('dispatches the action immediately with params', () => {
    const dipatch = jest.genMockFn();

    myAction({id: 5})(dipatch);

    expect(dipatch).toBeCalledWith({
      type: 'FOO',
      payload: {
        req: {
          url: 'foo',
          params: {
            id: 5
          }
        }
      }
    });
  });

  it('calls fetch with the expected args', () => {
    const dispatch = jest.genMockFn();

    myAction({id: 4})(dispatch);

    expect(global.fetch).toBeCalledWith('foo', {
      id: 4
    });
  });

  it('dispatches with res on a good request', () => {
    const x = {
      dispatch: jest.genMockFn()
    };
    myAction({id: 6})(x.dispatch);


    // TODO
    expect(false).toBe(true);
  });

  it('dispatches with an error when it gets a bad status', () => {
    global.fetch.mockReturnValue(new Promise((resolve) => {
      resolve({
        status: 404
      });
    }));

    const dispatch = jest.genMockFn();

    myAction({id: 3})(dispatch);

    // TODO
    expect(false).toBe(true);
  });
});
