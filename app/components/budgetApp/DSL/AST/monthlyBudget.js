export const MonthlyBudget = (date, expenses) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        date,
        expenses
    };
};