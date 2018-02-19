import GoogleSpreadsheet from 'google-spreadsheet';

export default function getPhotos() {
  return new Promise((resolve, reject) => {
    if (process.env.GS_KEY.length == 0) {
      throw new Error('No GSKEY set');
    }
    const gs = new GoogleSpreadsheet(process.env.GS_KEY);
    let sheet = null;
    gs.getInfo((err, info) => {
      if (err) {
        throw new Error('Google auth failed');
      }
      console.log(`Loaded doc: ${info.title} by ${info.author.email}`);
      sheet = info.worksheets[0];
      console.log(
        `sheet 1: ${sheet.title} ${sheet.rowCount} x ${sheet.colCount}`
      );
    });
  });
}
