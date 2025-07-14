import { motion } from 'framer-motion'

export default function Header() {
    // Scroll to section if hash is present in URL
    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 bg-sky-400 backdrop-blur-sm shadow-sm">
            <nav className="section-container flex items-center justify-center font-lg font-bold text-white py-4">
                <div>ChatGPT Explains</div>
            </nav>
        </motion.header>
    )
}