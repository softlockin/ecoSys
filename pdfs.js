pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      }
}



function make_pdf() {

      let docDefinition = {
  
          // Header
            header: [{text: "Faktura", margin: [73,25] }],
          // Main content - Customer and Owner details
            content: [
                    // Headline
                      {margin: [30,8], text: `${sendList[0].customerName}`, bold: "True", fontSize: "30"},
                      //{margin: [30,0], text: `Faktura`, fontSize: "12"},                      
                      // 
                      { columns: [
                              {style: "address",
                              text: `${sendList[0].customerName}
                                      ${sendList[0].customerAddress}
                                      ${sendList[0].zip}
                                      ${sendList[0].city.toUpperCase()}

                                      Er referens: ${sendList[0].customerContact} \n `},
                              
                                      {style: "address",
                                      text: `${companyDetails.companyName}
                                      ${companyDetails.address}
                                      ${companyDetails.zipCode}
                                      ${companyDetails.city.toUpperCase()}

                                      Vår referens: ${companyDetails.referenceName}` }    
                                  ]
                              }
                          ],

        // Footer details
        footer: [{ style: "foot", columns: [ { alignment: "center", text: `${companyDetails.companyName}\n${companyDetails.address}\n${companyDetails.zipCode} ${companyDetails.city.toUpperCase()}`},
        { alignment: "center", text:"Innehar F-skatt"},{alignment: "center", text: `Reg.Nr: ${companyDetails.companyRegistrationNumber}\n Banknr.${companyDetails.accountNumber}\n${companyDetails.bank}`} ] }],
        



        

        /* *** MAIN STYLING SECTION *** */ 
        styles: {
                  address: { margin: [45,25,0,40] },
                  product_list: { /*alignment: "justify",*/ margin: [45,2], width: "120", fontSize: "10" },
                  totals: { margin: [280,50,70,0], alignment: "right" },
                  additionals: { margin: [45,20,0,0] },
                  OCR: {margin: [45,60,0,0], bold: true},
                  foot: { fontSize: "8" }
              }
          }                       
          /* *** MAIN STYLING SECTION END *** */

        




          // Category row
          docDefinition.content.push(
              { columns: [ { width: 120, text: "Produkter"},{text:"Antal"},{text:"Tid"},{text:"Pris"},{text:"Moms"},{text:"Totalt"}],
              margin: [45,0]}
          )

        
        // Append products to list of products
        let sum_total = 0

        for (let i = 1; i<sendList.length; i++ ){

            let amount = sendList[i].amount
            let hours = sendList[i].hours
            let price = sendList[i].price
            let VAT = sendList[i].VAT
            let VAT_show = sendList[i].VAT*100
            let total = amount*hours*price*(VAT+1)
            sum_total += total

            docDefinition.content.push({
                style: "product_list",
                columns: [`${sendList[i].productName}`, `${sendList[i].amount}`,
                        ` ${sendList[i].hours} h`,price +":-",VAT_show+"%", total.toLocaleString("se-SE") +":-"]
                  })
              }


              // Additionals row
              docDefinition.content.push(

                { 
                    style: "additionals",
                    text: `${additionalsList[0].comment}`
                 }

              )

        // Total sum of all products
        let VAT = sendList[1].VAT*100
        docDefinition.content.push(
            {
                style: "totals",
                text: "Totalt: "+ sum_total.toLocaleString('se-SE')+":- \n"+`varav moms (${VAT}%): `+(sum_total*0.20).toLocaleString("se-SE")+":-"
            }
        )
        

        docDefinition.content.push(

            {
                style: "OCR",
                text: `OCR: OCRTEST \n Clr.nr: ${companyDetails.clearingNumber} \n  BG: ${companyDetails.accountNumber} \n Bank: ${companyDetails.bank} \n Betalningsvillkor: dagar`
            }
        )
        
            
            
    pdfMake.createPdf(docDefinition).open()
}