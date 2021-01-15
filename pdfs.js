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
          header: [{text: "Faktura", margin: [60,25] }],
          // Main content - Customer and Owner details
          content: [
                    // Headline
                      {margin: [30,38], text: `${owner_details.companyName}`, bold: "True", fontSize: "30"},
                      // 
                      { columns: [
                              {style: "address",
                              text: `${sendListtmp[0].customerName}
                                      ${sendListtmp[0].customerAddress}
                                      ${sendListtmp[0].zipCode}
                                      ${sendListtmp[0].customerCity}

                                      Er referens: ${sendListtmp[0].customerContact} \n `},
                              
                                      {style: "address",
                                      text: `${owner_details.companyName}
                                      ${owner_details.address}
                                      ${owner_details.zipCode}
                                      ${owner_details.city}

                                      Vår referens: ${owner_details.owner}` }    
                                  ]
                              }
                          ],

        // Footer details
        footer: [{ style: "foot", columns: [ { alignment: "center", text: "Test"},{ alignment: "center", text:"Test2"},{alignment: "center", text: "test3"} ] }],
        



        

        /* *** MAIN STYLING SECTION *** */ 
        styles: {
                  address: { margin: [45,25,0,40] },
                  product_list: { alignment: "justify", margin: [45,2], width: "300", fontSize: "10" },
                  totals: { margin: [364,50,40,0],bold: true },
                  foot: { fontSize: "10" }
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
        for (let i = 0; i<p_listtmp.length; i++ ){

            let amount = p_listtmp[i].amount
            let hours = p_listtmp[i].hours
            let price = p_listtmp[i].price
            let total = amount*hours*price
            sum_total += total

            docDefinition.content.push({
                style: "product_list",
                columns: [`Art.nr.   ${p_listtmp[i].productId}`, `${p_listtmp[i].productName}`, `${p_listtmp[i].amount}`,
                        ` ${p_listtmp[i].hours} h`,`${p_listtmp[i].price.toLocaleString("se-SE")}:-`,`${p_listtmp[i].VAT}%`, total.toLocaleString("se-SE") +":-"]
                  })
              }


        // Total sum of all products
        docDefinition.content.push(
            {
                style: "totals",
                text: "Totalt: "+ sum_total.toLocaleString('se-SE')
            }
        )
            
        
            
            
    pdfMake.createPdf(docDefinition).open()
}