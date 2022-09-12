import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import htpp from "../../http";

import { Link as RouterLink } from "react-router-dom"


const PaginaBaseAdmin = () => {

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
        <>

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: "white" }}> Restaurantes </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: "white" }}> Novo Restaurantes </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: "white" }}> Pratos </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: "white" }}> Novo Prato </Button>
                            </Link>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>

        </>
    )
}


export default PaginaBaseAdmin;