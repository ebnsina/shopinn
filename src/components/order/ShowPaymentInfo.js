import { AiOutlineFilePdf } from "react-icons/ai";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

function ShowPaymentInfo({ order }) {
  return (
    <div>
      <small>Payment Information</small>
      <div className="border border-gray-400 p-4 grid grid-cols-2">
        <p>Order ID: {order.paymentIntent.id}</p>
        <p>
          Amount:{" "}
          {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p>Currency: {order.paymentIntent.currency.toUpperCase()}</p>
        <p>
          {/* Method: {order?.paymentIntent?.payment_method_types[0].toUpperCase()} */}
        </p>
        <p>Payment: {order.paymentIntent.status.toUpperCase()}</p>
        <p>
          Orderd Date:{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </p>
        <p>STATUS: {order.orderStatus}</p>
        <p>
          <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
          >
            <AiOutlineFilePdf size="1.2rem" />
          </PDFDownloadLink>
        </p>
      </div>
    </div>
  );
}

export default ShowPaymentInfo;
