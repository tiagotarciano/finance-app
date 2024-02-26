import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ({ children }) {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Nav />
            <main className="flex flex-row mb-auto">
                {children}
            </main>
            <Footer />
        </div>
    )
}