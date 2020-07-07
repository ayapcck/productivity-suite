export const Expenses = (expenseList) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        expenseList
    };
};