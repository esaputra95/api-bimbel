const readXlsxFile = require('read-excel-file/node')

const excelToJson = () => {
    try {
        const label = [{
            kabupaten:'JAWA TIMUR', no: 1, noProv: 15
        }];
        
        for (const value of label) {
            readXlsxFile(`./15-${value.kabupaten}.xlsx`).then((rows:any) => {
                console.log(rows[6]);
                
            })
        }
        
    } catch (error) {
        console.log({error});
        
    }
}

export {excelToJson}