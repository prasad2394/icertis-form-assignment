import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormPage from './pages/FormPage';

function App() {
  return (
    <main className="font-[Sen,sans-serif] p-6 max-w-2xl mx-auto">
      <ToastContainer toastClassName="!font-[Sen,sans-serif] !text-base"/>
      <FormPage />
    </main>
  );
}

export default App
