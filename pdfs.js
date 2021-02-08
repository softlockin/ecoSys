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
                      {margin: [45,28], text: `${companyDetails.companyName}`, bold: "True", fontSize: "30"},
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
        { alignment: "center", text:`\nInnehar F-skatt\n Reg.Nr: ${companyDetails.companyRegistrationNumber}\n `},{alignment: "center", text: `\nBanknr.${companyDetails.accountNumber}\n${companyDetails.bank}`} ] }],
        



        

        /* *** MAIN STYLING SECTION *** */ 
        styles: {
                  address: { margin: [45,25,0,40] },
                  product_list: { alignment: "justify", margin: [45,2], width: 120 },
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
            let total = (amount*hours*price)*1.25
            sum_total += total

            docDefinition.content.push({
                style: "product_list",
                columns: [{ width: 120, text: `${sendList[i].productId}`}, {text: `${sendList[i].amount}`},
                        {text:` ${sendList[i].hours} h`},{text: price +":-"},{text: VAT_show+"%"}, {text: total.toLocaleString() +":-"}]
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
                text: "Totalt: "+ sum_total.toLocaleString()+":- \n"+`varav moms (${VAT}%): `+(sum_total*0.20).toLocaleString()+":-"
            }
        )
        

        docDefinition.content.push(

            {
                style: "OCR",
                text: `OCR: OCRTEST \n BG: ${companyDetails.accountNumber} \n Bank: ${companyDetails.bank} \n Betalningsvillkor: ${additionalsList[0].payDay} dagar`
            }
        )
        
            
            
    pdfMake.createPdf(docDefinition).open()
}