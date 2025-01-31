import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  const { name, email, content, discount, taxes } = await req.json();

  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4 (ancho x alto)
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  // ** TÍTULO CENTRADO **
  const title = "Budget";
  const titleWidth = boldFont.widthOfTextAtSize(title, 24);
  page.drawText(title, {
    x: (width - titleWidth) / 2, // Centrar texto
    y,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  y -= 50; // Espacio debajo del título

  // ** DATOS DEL CLIENTE **
  page.drawText(`Client: ${name}`, { x: 50, y, size: 12, font });
  y -= 20;
  page.drawText(`Email: ${email}`, { x: 50, y, size: 12, font });
  y -= 40;

  // ** TABLA DE CONTENIDO **
  const columnX = [50, 250, 350, 450]; // Posiciones de las columnas
  const rowHeight = 20;

  // Encabezados
  const headers = ["Description", "Quantity", "Cost ($)", "Subtotal ($)"];
  headers.forEach((header, i) => {
    page.drawText(header, { x: columnX[i], y, size: 12, font: boldFont });
  });

  y -= 15; // Espacio debajo del encabezado
  page.drawLine({
    start: { x: 50, y },
    end: { x: 550, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  y -= 15;

  // Filas de contenido
  let subtotal = 0;
  content.forEach((item: any) => {
    const itemSubtotal = item.quantity * parseFloat(item.cost);
    subtotal += itemSubtotal;

    page.drawText(item.description, { x: columnX[0], y, size: 12, font });
    page.drawText(String(item.quantity), { x: columnX[1], y, size: 12, font });
    page.drawText(`${item.cost} $`, { x: columnX[2], y, size: 12, font });
    page.drawText(itemSubtotal.toFixed(2) + " $", {
      x: columnX[3],
      y,
      size: 12,
      font,
    });

    y -= rowHeight;
  });

  y -= 30; // Espacio antes de los totales

  // ** CÁLCULO DE TOTALES  **
  const discountValue = (subtotal * discount) / 100;
  const total = (subtotal - discountValue) * (1 + taxes / 100);
  const formatText = (label: string, value: string) => `${label}: ${value}`;

  const totalsY = 150; // Posición fija en la parte inferior de la página
  const totalsX = 510; // Alineado a la izquierda

  const subtotalText = formatText("Subtotal", `${subtotal.toFixed(2)}€`);
  const discountText = formatText("Discount", `${discount}% (-${discountValue.toFixed(2)}€)`);
  const totalText = formatText("Total with taxes", `${taxes}%: ${total.toFixed(2)}€`);
  // Calculamos el ancho del texto
  const subtotalWidth = font.widthOfTextAtSize(subtotalText, 12);
  const discountWidth = font.widthOfTextAtSize(discountText, 12);
  const totalWidth = boldFont.widthOfTextAtSize(totalText, 14);

 

  page.drawText(`Subtotal: ${subtotal.toFixed(2)}€`, {
    x: totalsX - subtotalWidth,
    y: totalsY,
    size: 12,
    font,
  });

  page.drawText(`Discount: ${discount}% (-${discountValue.toFixed(2)}€)`, {
    x: totalsX - discountWidth,
    y: totalsY - 20,
    size: 12,
    font,
  });

  page.drawText(`Total with taxes (${taxes}%): ${total.toFixed(2)}€`, {
    x: totalsX - totalWidth,
    y: totalsY - 40,
    size: 14,
    font: boldFont, // Total en negrita
  });

  // ** NOTA FINAL EN LETRA PEQUEÑA CENTRADA **
  const note = "This budget is valid for 30 days.";
  const noteWidth = font.widthOfTextAtSize(note, 9);
  page.drawText(note, {
    x: (width - noteWidth) / 2, // Centrar texto
    y: 50, // Al final de la página
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5), // Gris
  });

  // Guardar PDF
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=budget.pdf",
    },
  });
}
