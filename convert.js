const pdf2excel = require("pdf-to-excel-node");

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method not allowed" }),
        };
    }

    try {
        const pdfBuffer = Buffer.from(event.body, "base64");
        const excelBuffer = await pdf2excel.process(pdfBuffer);
        
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": "attachment; filename=converted_excel.xlsx",
            },
            body: excelBuffer.toString("base64"),
            isBase64Encoded: true,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Conversion failed" }),
        };
    }
};
