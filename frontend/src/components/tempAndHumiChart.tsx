/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chart from "react-apexcharts";
import { Card } from "./card";

export function TempAndHumiChart({
  temperature,
  humidity,
}: {
  humidity: number;
  temperature: number;
}) {
  const config = {
    series: [
      {
        name: "bpm",
        data: [temperature, humidity],
        formatter: (value: number) => `${value} bpm`,
      },
    ],
    options: {
      tooltip: {
        y: {
          formatter: (value: number) => `${value} bpm`,
        },
      },

      xaxis: {
        labels: {
          show: false, // Desabilita as labels do eixo X (inferior)
        },
        axisTicks: {
          show: false, // Desabilita os ticks do eixo X
        },
        axisBorder: {
          show: false, // Desabilita as linhas do eixo X
        },
      },
      chart: {
        toolbar: {
          show: false,
        },

        animations: {
          enabled: false, // Define como false para desativar as animações
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#0891b2"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },

      colors: ["#22d3ee"],
      stroke: {
        width: 4,
        curve: "smooth",
      },
      title: {
        text: "Temperatura e Umidade",
        style: {
          fontSize: "24px",
          //   color: `blue`,
        },
      },
    },
  };

  return (
    <Card>
      <Chart
        className="w-full"
        //@ts-ignore
        options={config.options}
        series={config.series}
        type="bar"
      />
    </Card>
  );
}
