import JsPDF from "jspdf";

const downloadPdfDocument = async({ rootElementId, downloadFileName }) => {
    const parser = new DOMParser();
    const html = parser.parseFromString(rootElementId, 'text/html');
    let iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.innerHTML = rootElementId
    iframedoc.body.style = "width:760px; padding:20px"
    const doc = new JsPDF({
        orientation: 'p',
        unit: 'pt',
        format: [800, 2500],
        compress : true
    });
    var base 
    await doc.html(iframedoc.body, {
        callback: function (pdf) {
            // pdf.save('my.pdf')
           base = pdf.output('datauri'); // directly to base664
            return base
        }
    })
    return base
}
export default downloadPdfDocument