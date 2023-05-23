import ConversionMenu from "./components/menu/ConversionMenu";

function App() {
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-slate-700">
      <h1 className="text-5xl font-bold text-white mb-5">ConverX</h1>
      <ConversionMenu></ConversionMenu>
    </main>
  );
}

export default App;
