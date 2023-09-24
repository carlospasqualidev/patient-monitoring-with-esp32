import { useEffect, useState } from "react";
import { TempAndHumiChart } from "../../components/tempAndHumiChart";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { MainNav } from "./components/main-nav";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";
import axios from "axios";
import { BPMChart } from "../../components/bpmChart";

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

export default function Dashboard() {
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
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Paciente - Carlos Pasquali
            </h2>
            <div className="flex items-center space-x-2">
              <Button>Imprir receita</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Dashboard</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Histórico
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Remédios
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Horários
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Status de saúde
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Bom</div>
                    <p className="text-xs text-muted-foreground">
                      melhora de 20%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nível de assistência
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Baixo</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Risco</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Nenhum</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Última verificação
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">27/09/2023 - 14:34</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
                <Card className="col-span-4 p-4">
                  <BPMChart bpmData={data.bpm} />
                </Card>
                <Card className="col-span-3 p-4">
                  <CardContent>
                    <TempAndHumiChart
                      humidity={data.humidity}
                      temperature={data.temperature}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
