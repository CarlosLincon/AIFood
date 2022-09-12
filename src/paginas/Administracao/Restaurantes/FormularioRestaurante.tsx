import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import htpp from "../../../http";



const FormularioRestaurante = () => {

    const parametros = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (parametros.id) {
            htpp.get(`restaurantes/${parametros.id}/`)
                .then(respota => {
                    setNomeRestaurante(respota.data.nome)
                }).catch(resposta => {
                    if (resposta.response.status == 404) {
                        alert("O restaurante que você pesquisou não existe, Cadraste ele!");
                        navigate(-1);

                    }
                })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            htpp.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(resposta => {
                    alert(`O(a) ${resposta.data.nome} foi editado com sucesso: O ID do restaurante é: ${resposta.data.id}`);
                    navigate("/admin/restaurantes");
                }).catch(() => {
                    alert("OHHH NO! Não hora do envio deu algum erro ;-;")
                })


        } else {

            htpp.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then(resposta => {
                    alert(`O(a) ${resposta.data.nome} foi cadastrado com sucesso: O ID do restaurante é: ${resposta.data.id}`);
                    navigate("/admin/restaurantes");
                }).catch(() => {
                    alert("OHHH NO! Não hora do envio deu algum erro ;-;")
                })

        }


    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField id="standard-basic"
                    label="Nome do Restaurante" variant="standard" value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    fullWidth
                    required
                />
                <Button fullWidth
                    sx={{ marginTop: 1 }}
                    type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}


export default FormularioRestaurante;