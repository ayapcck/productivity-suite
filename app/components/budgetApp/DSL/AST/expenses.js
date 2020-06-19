export const Expenses = (expenseList) => {
    return {
        accept: (visitor) => visitor.visit(this),
        expenseList
    };
};