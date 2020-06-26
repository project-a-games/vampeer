
export interface Action<P> {
    type: string;
    payload: P;
}

type ActionBuilder<P> = ((p: P) => Action<P>) & {type: string, is: (action: Action<any>) => action is Action<P>}

type ExtractPayload<A extends ActionBuilder<any>> = A extends ActionBuilder<infer P> ? P : never;

function isType<B extends ActionBuilder<any>>(actionBuilder: B, action: Action<any>): action is Action<ExtractPayload<B>> {
    return actionBuilder.type === action.type;
}

export function defineAction<P>(type: string): ActionBuilder<P> {
    const builder = (payload: P) => ({
        type,
        payload,
    });

    builder.type = type;
    builder.is = (action: Action<any>): action is Action<P> => isType(builder, action);

    return builder;
}
