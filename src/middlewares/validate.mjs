import { createError } from "@middy/util";

const parse = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const { path, message } = result.error.issues[0];
        throw createError(400, path.length ? `${path.join('.')}: ${message}` : message);
    }
    return result.data;
};

export const validate = (schema) => ({
    before: async (handler) => {
        const { event } = handler;
        let data;

        try {
            data = JSON.parse(event.body ?? '');
        } catch {
            throw createError(400, 'Request body must be valid JSON');
        }

        event.input = parse(schema, data);
    },
});