import moment from "moment";
import { http } from "@/utils/http";

export const getDataVoos = async ()=>{

    moment.locale('pt-br');

    try {
        const response = await http.get(`/voosLista`);

        // Extraindo voos do response
        const voos = response.data;

        // Mapeando os id empresa, e aeroportos
        const idEmpresas = voos.map((voo) => voo.id_empresa);
        const idAeroportosSaida = voos.map((voo) => voo.id_aeroporto_partida);
        const idAeroportosChegada = voos.map((voo) => voo.id_aeroporto_chegada);

        // Remover id duplicado :: Empresa e Aeroportos
        const uniqueIdEmpresas = [...new Set(idEmpresas)];

        const uniqueIdAeroportos = [
            ...new Set([...idAeroportosSaida, ...idAeroportosChegada]),
        ];

        // Para cada ID único de empresa, buscar o nome da empresa
        const empresaResponses = await Promise.all(
            uniqueIdEmpresas.map((id) => http.get(`/empresasaereas/${id}`))
        );

        // Buscando informações sobre o Aeroporto
        const aeroportoResponses = await Promise.all(
            uniqueIdAeroportos.map((id) => http.get(`/aeroportos/${id}`))
        );

        const empresaMap = empresaResponses
            .filter((resp) => resp.data.hasOwnProperty("nome"))
            .reduce((map, empresaResponse) => {
                const empresa = empresaResponse.data;
                map[empresa.id] = empresa.nome;
                return map;
            }, {});

        const aeroportoMap = aeroportoResponses
            .filter((resp) => resp.data.hasOwnProperty("cidade"))
            .reduce((map, aeroportoResponse) => {
                const aeroporto = aeroportoResponse.data;
                map[aeroporto.id] = {
                    cidade: aeroporto.cidade,
                    nome: aeroporto.nome,
                    sigla: aeroporto.sigla
                };
                return map;
            }, {});

      return voos.map((voo) => ({
            ...voo,
            nomeEmpresa: empresaMap[voo.id_empresa],
            cidadeSaida: aeroportoMap[voo.id_aeroporto_partida]?.cidade,
            nomeAeroportoSaida: aeroportoMap[voo.id_aeroporto_partida]?.nome,
            cidadeChegada: aeroportoMap[voo.id_aeroporto_chegada]?.cidade,
            nomeAeroportoChegada: aeroportoMap[voo.id_aeroporto_chegada]?.nome,
            siglaAeroportoSaida: aeroportoMap[voo.id_aeroporto_partida]?.sigla,
            siglaAeroportoChegada: aeroportoMap[voo.id_aeroporto_chegada]?.sigla,
            data_partida_formatada: moment(voo.data_partida).format('ddd D MMM YYYY'),

        }));
    }catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error; // Rejeitar o erro para que o chamador possa lidar com ele
    }
}