import { useEffect, useState } from "react";
import axios from "axios";

import { BPMChart } from "./components/bpmChart";
import { TempAndHumiChart } from "./components/tempAndHumiChart";
interface IDataResponse {
  bpm: number;
  temperature: number;
  humidity: number;
}
interface IData {
  bpm: number[];
  temperature: number;
  humidity: number;
}

function App() {
  const [data, setData] = useState<IData>({
    bpm: [],
    temperature: 0,
    humidity: 0,
  });

  useEffect(() => {
    async function getValues() {
      setInterval(async () => {
        const { data } = await axios.get("http://192.168.0.75/json");

        if (data) {
          const { bpm, humidity, temperature }: IDataResponse = data;
          console.log();
          setData((prev) => {
            if (prev.bpm.length > 150) prev.bpm.shift();

            return {
              bpm: [...prev.bpm, bpm],
              temperature,
              humidity,
            };
          });
        }
      }, 1000);
    }

    getValues();
  }, []);

  return (
    <main className="grid grid-cols-2 gap-4 p-4 max-sm:grid-cols-1">
      <BPMChart bpmData={data.bpm} />
      <TempAndHumiChart
        humidity={data.humidity}
        temperature={data.temperature}
      />
    </main>
  );
}

export default App;
