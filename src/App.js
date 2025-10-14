import Header from "./Components/Header";
import EmployeeTable from "./Components/EmployeeTable";
import Footer from "./Components/Footer";

export default function App() {
    return (
        <div style={{ maxWidth: 960, margin: "0 auto", fontFamily: "system-ui, Arial, sans-serif" }}>
            <Header />
            <EmployeeTable />
            <Footer />
        </div>
    );
}
