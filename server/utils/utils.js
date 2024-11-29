const puppeteer = require('puppeteer');

exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

async function createPDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}


exports.generateShippingLabel = async (order) => {
  let shippingTemplate = `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Shipping Label</title><style>* {margin: 0; padding: 0; box-sizing: border-box;} body {font-family: Arial, sans-serif; background-color: #f7f7f7;} .shipping-label {width: 500px; padding: 20px; border: 2px solid #000; background-color: #fff; margin: 20px auto; font-size: 14px;} .label-header {display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;} .business-name {white-space: nowrap; font-size: 18px; font-weight: bold;} .tracking-number {font-size: 16px; font-weight: bold; white-space: nowrap;} .address-container {display: flex; justify-content: space-between; margin-bottom: 20px;} .sender, .recipient {width: 48%;} h3 {margin-bottom: 10px; font-size: 16px; font-weight: bold;} p {margin: 4px 0;} .barcode {text-align: center; margin-bottom: 20px;} .footer {text-align: center; font-size: 12px; color: #888;}</style></head><body><div class='shipping-label'><div class='label-header'><div class='business-name'>Kanha Collections</div><div class='tracking-number'><strong>Order Id:</strong><span id='tracking-number'>${order._id}</span></div></div><div class='address-container'><div class='sender'><h3>Sender Information</h3><p><strong>Company:</strong>Kanha Collections</p><p><strong>Address:</strong> Kamati Street, Chinna Bazar</p><p><strong>City:</strong> Nellore</p><p><strong>State:</strong> AP</p><p><strong>ZIP:</strong> 524001</p><p><strong>Phone:</strong> +91-8297997256</p></div><div class='recipient'><h3>Recipient Information</h3><p><strong>Name:</strong> ${order.address.fullName}</p><p><strong>Address:</strong> ${order.address.address}</p><p><strong>City:</strong> ${order.address.city}</p><p><strong>State:</strong> ${order.address.state}</p><p><strong>ZIP:</strong> ${order.address.zipCode}</p><p><strong>Phone:</strong> ${order.address.phoneNumber}</p></div></div><div class='barcode'><canvas id='barcode'></canvas></div><div class='footer'><p>&copy; 2024 Kanha Collections. All Rights Reserved.</p></div></div><script src='https://cdn.jsdelivr.net/npm/jsbarcode/dist/JsBarcode.all.min.js'></script><script>window.onload = function() {const trackingNumber = document.getElementById('tracking-number').textContent; JsBarcode('#barcode', trackingNumber, { format: 'CODE128', width: 2, height: 50, displayValue: true, fontSize: 12 });};</script></body></html>`;
  const pdfPath = `labels/${order._id}.pdf`;
  await createPDF(shippingTemplate, pdfPath);
  return pdfPath;
}