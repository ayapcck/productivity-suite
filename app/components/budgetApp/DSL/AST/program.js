export const ProgramNode =  (id, sheetList) => {
    return {
        accept: (visitor) => visitor.visit(this),
        id,
        sheetList
    }
}