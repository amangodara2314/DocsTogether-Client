export const handlePrint = (editor) => {
  const content = editor?.getHTML();
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            body { font-family: ${fontFamily}, sans-serif; margin: 0; padding: 0; }
            .container { width: 8.27in; min-height: 11.69in; margin: 0 auto; padding: 0; }
            
            /* Table styles */
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1rem 0;
            }
            th {
              background-color: #f1f5f9;
              font-weight: bold;
              text-align: left;
              padding: 0.5rem;
              border: 1px solid #cbd5e1;
            }
            td {
              padding: 0.5rem;
              border: 1px solid #cbd5e1;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
          </style>
        </head>
        <body>
          <div class="container">${content}</div>
        </body>
      </html>
    `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  setTimeout(() => printWindow.close(), 500);
};

export const exportAsMarkdown = (editor) => {
  const content = editor?.getHTML() || "";

  let markdown = content
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<u[^>]*>(.*?)<\/u>/gi, "_$1_")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, "$1\n")
    .replace(/<ol[^>]*>(.*?)<\/ol>/gi, "$1\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "");

  markdown = markdown.replace(/\n\s*\n\s*\n/g, "\n\n");

  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${documentTitle}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportAsPDF = (editor) => {
  const content = editor?.getHTML() || "";
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            body { font-family: ${fontFamily}, sans-serif; margin: 0; padding: 0; }
            .container { width: 8.27in; min-height: 11.69in; margin: 0 auto; padding: 0; }
            
            /* Table styles */
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1rem 0;
            }
            th {
              background-color: #f1f5f9;
              font-weight: bold;
              text-align: left;
              padding: 0.5rem;
              border: 1px solid #cbd5e1;
            }
            td {
              padding: 0.5rem;
              border: 1px solid #cbd5e1;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
          </style>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            }
          </script>
        </head>
        <body>
          <div class="container">${content}</div>
        </body>
      </html>
    `);

  printWindow.document.close();
};

export const saveAs = (
  format,
  editor,
  title,
  fontFamily,
  leftMargin,
  rightMargin
) => {
  const content = editor?.getHTML() || "";
  let blob, fileExtension;

  switch (format) {
    case "html":
      const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>${title}</title>
              <style>
                body { font-family: ${fontFamily}, sans-serif; margin: 0; padding: 0; }
                .container { width: 8.27in; margin: 0 auto; padding-left: ${leftMargin}px; padding-right: ${rightMargin}px; }
                
                /* Table styles */
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 1rem 0;
                }
                th {
                  background-color: #f1f5f9;
                  font-weight: bold;
                  text-align: left;
                  padding: 0.5rem;
                  border: 1px solid #cbd5e1;
                }
                td {
                  padding: 0.5rem;
                  border: 1px solid #cbd5e1;
                }
                tr:nth-child(even) {
                  background-color: #f8fafc;
                }
              </style>
            </head>
            <body>
              <div class="container">${content}</div>
            </body>
          </html>
        `;
      blob = new Blob([htmlContent], { type: "text/html" });
      fileExtension = "html";
      break;
    case "text":
      const textContent = content
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      blob = new Blob([textContent], { type: "text/plain" });
      fileExtension = "txt";
      break;
    case "markdown":
      return exportAsMarkdown();
    case "pdf":
      return exportAsPDF();
    default:
      return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${documentTitle}.${fileExtension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
