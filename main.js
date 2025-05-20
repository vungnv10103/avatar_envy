"use strict";


const spreadsheetId = "1AxaF8XzR0JcYeFZJW9Maof7431pKpsI3guLc489UtEs";
const urlParams = new URLSearchParams(window.location.search);
const sheetName = urlParams.get("sheet") || "data-farm";
const url = `https://opensheet.elk.sh/${spreadsheetId}/${sheetName}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const raw = data[0];
        const parsed = {};

        for (const key in raw) {
            const value = raw[key];

            try {
                const parsedValue = JSON.parse(value);
                parsed[key] = parsedValue;
            } catch (e) {
                parsed[key] = isNaN(value) ? value : parseInt(value);
            }
        }
        console.log("Khôi phục động:", parsed);

    })
    .catch(error => {
        console.error("Lỗi khi tải dữ liệu:", error);
    });
