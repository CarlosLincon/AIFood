import { Button } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
const FormularioRestaurante = () => {

    const parametros = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(respota => {
                    setNomeRestaurante(respota.data.nome)
                }).catch(resposta => {
                    if (resposta.response.status == 404) {
                        alert("O restaurante que você pesquisou não existe, Cadraste ele!" );
                        navigate(-1);
                        
                    }
                })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

            if(parametros.id){
                axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                    nome: nomeRestaurante
                })
                    .then(resposta => {
                        alert(`O(a) ${resposta.data.nome} foi editado com sucesso: O ID do restaurante é: ${resposta.data.id}`);
                        navigate("/admin/restaurantes");
                    }).catch(() => {
                        alert("OHHH NO! Não hora do envio deu algum erro ;-;")
                    })
            

            }else{

                axios.post("http://localhost:8000/api/v2/restaurantes/", {
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
        <form onSubmit={aoSubmeterForm}>
            <TextField id="standard-basic" label="Nome do Restaurante" variant="standard" value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}


export default FormularioRestaurante;