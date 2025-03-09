export const downloadToCSV = (data)=>{
    const csvContent = "data:text/csv;charset=utf-8,"+data;
    const link = document.createElement("a");
    link.href=csvContent;
    link.download = "data.csv";
    link.click();
}