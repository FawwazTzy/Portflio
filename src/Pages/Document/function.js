import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export async function generateCSV(data) {

    // [{
    //     "nodeName": "Node-1-test-test0000",
    //     "UPT": "UPT Pulogadung",
    //     "ULTG": "ULTG Harapan Indah",
    //     "unit": "GI Bekasi",
    //     "brand": "brand-test",
    //     "zonaInstallation": "zona-test",
    //     "isolasi": "isolasi-test",
    //     "statusGauge": "false",
    //     "statusCam": "false",
    //     "pressure": "10.11",
    //     "dateTime": "2025-04-05 15:35:00"
    // }]

    const csvContent =
        "data:text/csv;charset=utf-8," +
        ["Tanggal & Waktu,NodeID,Nilai Tekanan,Status Kamera,Status Gauge,ULTG,Lokasi,Merk,Isolasi,Zona",
            ...data.map((row) => `${row.dateTime},${row.nodeName},${row.pressure},${row.statusCam},${row.statusGauge},${row.ULTG},${row.unit},${row.brand},${row.isolasi},${row.zonaInstallation}`)].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export async function generateXLS(data) {
    // const data = [
    //     { name: "Alice", age: 25 },
    //     { name: "Bob", age: 30 },
    // ];
    const transformedArray = data.map(item => ({
        "Tanggal & Waktu": item.dateTime,
        "NodeID": item.nodeName,
        "Nilai Tekanan": item.pressure,
        "Status Kamera": item.statusCam,
        "Status Gauge": item.statusGauge,
        "ULTG": item.ULTG,
        "Lokasi": item.unit,
        "Merk": item.brand,
        "Isolasi": item.isolasi,
        "Zona": item.zonaInstallation
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const file = new Blob([excelBuffer], {
        type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "data.xlsx");
}