export const ProgramNode = (id, sheetList) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        id,
        sheetList
    };
}