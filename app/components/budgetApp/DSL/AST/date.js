export const Date = (month, year) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        month,
        year
    };
};