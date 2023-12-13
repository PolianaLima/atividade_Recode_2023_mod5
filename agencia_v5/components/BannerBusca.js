import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function BannerBusca() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onsubmit = (data) => {
		const { origem, destino, data_partida} = data
		const url = `/pesquisa/voos?&origem=${origem}&destino=${destino}&data_partida=${data_partida}`;

    router.push(url);
  };

  return (
    <div className="container-fluid bg-warning p-4 home-banner">
      <div className="container-sm rounded-3  p-3 w-75 d-sm-flex justify-content-center  ">
        <form className="w-100">

          <div className="d-sm-flex mt-3">
            <div className="w-100 me-2 ">
              <input
                className="form-control me-2 mb-2 p-2"
                type="input"
                placeholder="Origem"
                {...register("origem", { required: true })}
              />
              {errors?.origem?.type === "required" && (
                <p className="text-danger fw-bold">Campo Obrigatorio</p>
              )}
            </div>

            <div className="w-100 me-2 ">
              <input
                className="form-control me-2 mb-2 p-2"
                required
                type="input"
                placeholder="Destino"
                {...register("destino", { required: true })}
              />
              {errors?.destino?.type === "required" && (
                <p className="text-danger fw-bold">Campo Obrigatorio</p>
              )}
            </div>

            <div className="w-100 me-2 ">
              <input
                className="form-control me-2 mb-2 p-2"
                required
                type="date"
                {...register("data_partida", { required: true })}
              />
              {errors?.data_partida?.type === "required" && (
                <p className="text-danger fw-bold">Campo Obrigatorio</p>
              )}
            </div>
            <div className="w-100">
              <button
                className="btn btn-warning  me-2 w-100 mb-2 p-2"
                onClick={handleSubmit(onsubmit)}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BannerBusca;
