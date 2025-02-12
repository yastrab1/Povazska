import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
                <CheckCircle className="text-green-500" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Confirmed</h2>
                <p className="text-gray-600 mt-2">Your action has been successfully completed.</p>
                <Link href={"/"}>
                    <button className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    );
}