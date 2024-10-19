// "use client"
import { PageBottom, Tailwind } from "@fileforge/react-print";


export const InvoiceDoc=({details}:{details:any}) => {
  return (
    <>
      <Tailwind>
        <div >
          <div className="flex justify-between items-end pb-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Invoice {details.id}</h1>
              <p className="text-xs">January 1, 2025</p>
            </div>
            
          </div>

          <div className="text-right">
            <p className="p-0 mb-1">
              <b>Inventory</b>
            </p>
            <p className="p-0 mb-1">Guntur,</p>
            <p className="p-0 mb-1">AndhraPradesh,</p>
            <p className="p-0 mb-1">522007,</p>
            <p className="p-0 mb-1">India</p>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <div className="flex justify-between">
            <div>
                <p className="p-0 mb-1">
                <b>Bill to:</b>
                </p>
                <p className="p-0 mb-1">{details.customer.firstname}</p>
                <p className="p-0 mb-1">{details.customer.email}</p>
                <p className="p-0 mb-1">{details.customer.mobilenumber}</p>
                {/* <p className="p-0 mb-1">NJ 12345,</p>
                <p className="p-0 mb-1">United States of America</p> */}
            </div>
            <div>
                <p className="p-0 mb-1"><b>Payment Type:</b> Prepaid</p>
                <p className="p-0 mb-1"><b>Payment Method:</b>{details.transaction_type}</p>
            </div>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          
          <h1 className=" font-bold text-2xl">Invoice Details</h1>

          <table className="w-full my-2">
            <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2">Item</th>
              <th className="text-left font-bold py-2">Description</th>
              <th className="text-left font-bold py-2">Unit Price</th>
              <th className="text-left font-bold py-2">Quantity</th>
              <th className="text-left font-bold py-2">Amount</th>
            </tr>
            </thead>
            <tbody>
                {
                    details.items.map((i:any,v:number)=>{
                        return(
                            <>
                            <tr className="border-b border-gray-300">
                                <td className="py-2">{v+1}</td>
                                <td className="py-2">{(i.product)?i.product.name:i.service?.name}</td>
                                <td className="py-2">${(i.product)?i.product.selling_price:i.service?.charge}</td>
                                <td className="py-2">{i.quantity!}</td>
                                <td className="py-2">${i.total_amount!}</td>
                            </tr>
                            </>
                        )
                    })
                }
            
            

            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">Total</th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">${details.total_amount}</th>
            </tr>
            </tbody>
          </table>

          <PageBottom>
            <div className="h-px bg-gray-300 my-4" />
            <div className="text-gray-400 text-sm">Invoice {details.id!}</div>
          </PageBottom>
        </div>
      </Tailwind>
    </>
  );
}
