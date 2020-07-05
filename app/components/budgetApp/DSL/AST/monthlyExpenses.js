export const MonthlyExpenses = (date, expenses, tracking) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        date,
        expenses,
        tracking
    };
};