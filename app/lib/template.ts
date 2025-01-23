// import { Template, BLANK_PDF } from "@pdfme/common";
// import { text, barcodes, image } from "@pdfme/schemas";
// import myCustomPlugin from "./custom-plugins";
// import { generate } from "@pdfme/generator";

// const template: Template = {
//   basePdf: BLANK_PDF,
//   schemas: [
//     [
//       {
//         name: "example_text",
//         type: "text",
//         position: { x: 0, y: 0 },
//         width: 40,
//         height: 10,
//       },
//       {
//         name: "example_image",
//         type: "image",
//         position: { x: 200, y: 200 },
//         width: 60,
//         height: 40,
//       },
//       {
//         name: "example_qr_code",
//         type: "qrcode",
//         position: { x: 100, y: 100 },
//         width: 50,
//         height: 50,
//       },
//     ],
//   ],
// };

// const plugins = {
//   Text: multiVariableText,
//   "QR Code": barcodes.qrcode,
//   Image: image,
//   MyCustomPlugin: myCustomPlugin,
// };

// const inputs = [
//   {
//     example_text: "Hello, World!",
//     example_image: "data:image/png;base64,iVBORw0KG....",
//     example_qr_code: "https://pdfme.com/",
//   },
// ];

// generate({ template, inputs, plugins }).then((pdf) => {
//   console.log(pdf);
// });
