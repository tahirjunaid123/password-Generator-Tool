import { AdvancedEncryptionTool } from "@/components/features/AdvancedEncryptionTool";

export default function EncryptionToolPage() {
    return (
        <div className="relative flex flex-col items-center justify-start overflow-x-hidden selection:bg-primary/30 selection:text-primary min-h-screen">
            {/* Background Base */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ff00ff22_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff00ff11_100%)]"></div>

            <section className="w-full flex justify-center py-20 px-4">
                <AdvancedEncryptionTool />
            </section>
        </div>
    );
}
