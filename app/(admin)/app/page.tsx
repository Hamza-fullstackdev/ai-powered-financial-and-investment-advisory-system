import Herosection from '@/app/(admin)/components/app/Herosection';
import Chart from '@/app/(admin)/components/app/Chart';
import Accounts from '@/app/(admin)/components/app/Accounts';
import CardDetails from '@/app/(admin)/components/app/CardDetails';
import TransactionTable from '@/app/(admin)/components/app/TransactionTable';

export default function App() {
  return (
    <section>
      <div>
        <Herosection />
        <Accounts />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TransactionTable />
          <Chart />
        </div>
        <CardDetails />
      </div>
    </section>
  );
}
