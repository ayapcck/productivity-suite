export const MonthlyBudget = (date, expenses) => {
    return {
        accept: (visitor) => visitor.visit(this),
        date,
        expenses
    };
};