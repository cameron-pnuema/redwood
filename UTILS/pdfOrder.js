import JsPDF from "jspdf";

const pdfOrder = async({ rootElementId, downloadFileName }) => {
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
       
    });
    var base 
    await doc.html(iframedoc.body, {
        callback: function (pdf) {
        // base = pdf.save('my.pdf')
            base = pdf.output("blob"); // directly to base664
            return base
        }
    })
    return base
}
export default pdfOrder