export default function AmbientBackground() {
    return (
        <>
            <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none opacity-60 z-0 mix-blend-multiply"></div>
            <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0 mix-blend-multiply"></div>
            <div className="fixed top-[40%] left-[60%] w-[30vw] h-[30vw] bg-purple-300/15 rounded-full blur-[100px] pointer-events-none opacity-40 z-0 mix-blend-multiply"></div>
        </>
    );
}
