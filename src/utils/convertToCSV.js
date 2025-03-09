export const convertToCSV = (data) => {
    if(!data.length) return "";
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) => Object.values(obj).join(","));
    console.log('headers',headers);
    console.log('rows', rows);
    return [headers, ...rows].join('\n');
 }