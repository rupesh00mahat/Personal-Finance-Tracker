export const sortByType = (type, rows) => {
    if(type == 'date'){
        return rows.sort((a,b) =>new Date(a.date).getTime() - new Date(b.date).getTime())
    }else if(type == 'alphabet'){
        return rows.sort((a,b) => a.name.localeCompare(b.name));
    }else if(type == 'amount'){
        return rows.sort((a,b) => a.amount - b.amount);
    }else{
        return rows;
    }
}