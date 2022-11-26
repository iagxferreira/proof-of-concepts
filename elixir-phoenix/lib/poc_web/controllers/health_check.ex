defmodule PocWeb.HealthcheckController do
  use PocWeb, :controller

  def index(conn, _params) do
    conn
    |> put_status(:ok)
    |> json(%{ service: "online"})
  end
end
