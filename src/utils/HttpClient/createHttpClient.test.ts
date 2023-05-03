import createHttpClient from './createHttpClient';

describe('createHttpClient', () => {
  it('should return a client', () => {
    const { client } = createHttpClient();
    expect(client).toBeDefined();
  });

  it('should create a client with 1 request interceptor', () => {
    const { outgoingRequestInterceptors } = createHttpClient({
      outgoingRequestInterceptors: [{ onFulfilled: config => ({ ...config }) }],
    });
    expect(outgoingRequestInterceptors).toBeDefined();
    expect(outgoingRequestInterceptors?.length).toEqual(1);
  });

  it('should create a client with multiple request interceptors', () => {
    const { outgoingRequestInterceptors } = createHttpClient({
      outgoingRequestInterceptors: [
        { onFulfilled: config => ({ ...config }) },
        { onFulfilled: config => ({ ...config }) },
        { onFulfilled: config => ({ ...config }) },
      ],
    });
    expect(outgoingRequestInterceptors).toBeDefined();
    expect(outgoingRequestInterceptors?.length).toEqual(3);
  });

  it('should create a client with 1 response interceptor', () => {
    const { incomingRequestInterceptors } = createHttpClient({
      incomingRequestInterceptors: [{ onFulfilled: response => ({ ...response }) }],
    });
    expect(incomingRequestInterceptors).toBeDefined();
    expect(incomingRequestInterceptors?.length).toEqual(1);
  });

  it('should create a client with multiple response interceptors', () => {
    const { incomingRequestInterceptors } = createHttpClient({
      incomingRequestInterceptors: [
        { onFulfilled: response => ({ ...response }) },
        { onFulfilled: response => ({ ...response }) },
        { onFulfilled: response => ({ ...response }) },
      ],
    });
    expect(incomingRequestInterceptors).toBeDefined();
    expect(incomingRequestInterceptors?.length).toEqual(3);
  });

  it("should save 'userId' from response using an interceptor", done => {
    type Todo = { userId: number; id: number; title: string; completed: boolean };
    let todo: Partial<Todo> = {};
    const { client } = createHttpClient<Todo>({
      incomingRequestInterceptors: [
        {
          onFulfilled: response => {
            todo = response.data;
            return { ...response };
          },
        },
      ],
    });
    client
      .get<Todo>('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => expect(res.data.userId).toEqual(1))
      .finally(() => {
        expect(todo.userId).toEqual(1);
        done();
      });
  });

  it("should save 'userId' conditionally from response using an interceptor", done => {
    type Todo = { userId: number; id: number; title: string; completed: boolean };
    let todo: Partial<Todo> = {};
    const { client } = createHttpClient<Todo>({
      incomingRequestInterceptors: [
        {
          onFulfilled: response => {
            if (response.config.url?.split('/').at(-1) !== '1') return { ...response };
            todo = response.data;
            return { ...response };
          },
        },
      ],
    });
    client
      .get<Todo>('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => expect(res.data.userId).toEqual(1))
      .finally(() => {
        expect(todo.userId).toEqual(1);
      });
    client
      .get<Todo>('https://jsonplaceholder.typicode.com/todos/21')
      .then(res => expect(res.data.userId).toEqual(2))
      .finally(() => {
        expect(todo.userId).toEqual(1);
        done();
      });
  });

  it('should attach query param to a request using an interceptor', done => {
    type Comment = { postId: number; id: number; name: string; email: string; body: string };
    const { client } = createHttpClient({
      outgoingRequestInterceptors: [{ onFulfilled: response => ({ ...response, params: { postId: 1 } }) }],
    });
    client
      .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
      .then(res => expect(res.data.at(-1)?.id).toEqual(5))
      .finally(() => done());
  });

  it('should attach query param conditionally to a request using an interceptor', done => {
    type Comment = { postId: number; id: number; name: string; email: string; body: string };
    const { client } = createHttpClient({
      outgoingRequestInterceptors: [
        {
          onFulfilled: response => ({ ...response, params: { postId: 1 } }),
          options: { runWhen: config => !config.params?.postId },
        },
      ],
    });
    client
      .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
      .then(res => expect(res.data.at(-1)?.id).toEqual(5));
    client
      .get<Comment[]>('https://jsonplaceholder.typicode.com/comments', { params: { postId: 2 } })
      .then(res => expect(res.data.at(-1)?.id).toEqual(10))
      .finally(() => done());
  });
});
