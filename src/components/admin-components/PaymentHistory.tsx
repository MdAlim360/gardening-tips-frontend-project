import { useGetAllUsersQuery } from "@src//redux/features/user/userManagement";

export function PaymentHistory() {
  const { data: payments, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <p>Loading payment history...</p>;
  }

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Payment ID</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">User</th>
          </tr>
        </thead>
        <tbody>
          {payments?.data.map((payment) => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border">{payment._id}</td>
              <td className="py-2 px-4 border">$100</td>
              <td className="py-2 px-4 border">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{payment.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
