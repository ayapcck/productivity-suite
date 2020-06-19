export const Date = (month, year) => {
    return {
        accept: (visitor) => visitor.visit(this),
        month,
        year
    };
};