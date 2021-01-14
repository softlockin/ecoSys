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
          header: [{text: "Faktura", margin: [45,25] }],
          // Main content - Customer and Owner details
          content: [
                      {margin: [20,30], text: `${owner_details.companyName}`, bold: "True", fontSize: "30"},
                      { columns: [
                              {style: "address",
                              text: `${sendListtmp[0].customerName}
  
                                      ${sendListtmp[0].customerAddress}
                                      ${sendListtmp[0].customerCity}
                                      Er referens: ${sendListtmp[0].customerContact} \n `},
                              
                                      {style: "address",
                                      text: `${owner_details.companyName}
  
                                      ${owner_details.address}
                                      ${owner_details.zipCode}
                                      ${owner_details.city} ` }    
                                  ]
                              }
                          ],
          footer: [{ style: "foot", columns: [ { alignment: "center", text: "Test"},{ alignment: "center", text:"Test2"},{alignment: "center", text: "test3"} ] }],
          
          styles: {
                  address: { margin: [45,30,25,50], columnGap:10 },
                  product_list: { alignment: "justify", margin: [45,1], width: "300", fontSize: "10" },
                  foot: { fontSize: "10" }
              }
          }                       
  
          docDefinition.content.push(
              { margin: [45,0], text: "Produkter", width:"auto", decoration: "underline"}
      
          )

        
        let sum_total = 0


        // Append product details to document
        for (let i = 0; i<p_listtmp.length; i++ ){

          let amount = p_listtmp[i].amount
          let hours = p_listtmp[i].hours
          let price = p_listtmp[i].price
          let total = amount*hours*price

          docDefinition.content.push({
          
            style: "product_list",
                    columns: [`Art.nr.   ${p_listtmp[i].productId}`, `${p_listtmp[i].productName}`, `Antal: ${p_listtmp[i].amount}`,
                    ` Tid: ${p_listtmp[i].hours} h`,` Pris: ${p_listtmp[i].price}:-`,`Moms: ${p_listtmp[i].VAT}%`,
                  total+":-"]
          
                  }) 
              }
            
            
        pdfMake.createPdf(docDefinition).open()
}