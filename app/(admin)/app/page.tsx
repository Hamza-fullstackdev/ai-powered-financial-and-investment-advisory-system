import Herosection from '@/app/(admin)/components/app/Herosection';
import Accounts from '@/app/(admin)/components/app/Accounts';
import CardDetails from '@/app/(admin)/components/app/CardDetails';

export default function App() {
  return (
    <section>
      <div>
        <Herosection />
        <Accounts />
        <CardDetails />
      </div>
    </section>
  );
}
