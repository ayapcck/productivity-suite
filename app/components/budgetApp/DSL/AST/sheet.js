export const Sheet = (type, content) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        content,
        type
    };
};